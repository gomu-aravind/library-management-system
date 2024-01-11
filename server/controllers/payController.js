require("dotenv").config();

const User = require("../models/user");
const Order = require("../models/order");
const ErrorResponse = require("../utils/errorResponse");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const prices = {
  lite: "price_1OWMTHSD0Vd6kcFrzALXlDeE",
  moderate: "price_1OWMTfSD0Vd6kcFr7AVnmL3U",
  bookworm: "price_1OWMU3SD0Vd6kcFrsInA4IUK",
};
const currentDate=new Date()

exports.checkoutToSubscribe = async (req, res, next) => {
  const plan = req.body.plan;

  try{
    const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: prices[plan],
        quantity: 1,
      },
    ],
    success_url: process.env.CLIENT_SERVER_URL + "/user/success-subscribe",
    cancel_url: process.env.CLIENT_SERVER_URL + "/user/cancel",
  });
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { subSession: session.id } },
    { new: true }
  );
  res.status(200).json(session);
}catch(err){
  next(new ErrorResponse("Cannot log in, check your credentials", 400));
}
};

exports.subscribeSuccess = async (req, res, next) => {
  const sessionId = req.user.subSession;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const subscriptionId = session.subscription;
      const subscriptionData = req.user.subscription;
      try {
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );
        const planId = subscription.plan.id;
        const [planType] = Object.keys(prices).filter(
          (key) => prices[key] === planId
        );
        const planEndDate=new Date(subscription.current_period_end*1000)
        const updateDate=currentDate
        updateDate.setMonth(currentDate.getMonth()+1)
        updateDate.setDate(1)
        updateDate.setUTCHours(0,0,0,0)
        
        if (planType === "lite") {
          subscriptionData.plan = "LITE";
          subscriptionData.expireyDate = planEndDate;
          subscriptionData.discount = 1;
          subscriptionData.coupon = ["LITE20"];
          subscriptionData.discountUpdate = updateDate;
          subscriptionData.credits = 200;
        }
        if (planType === "moderate") {
          subscriptionData.plan = "MODERATE";
          subscriptionData.expireyDate = planEndDate;
          subscriptionData.discount = 1;
          subscriptionData.coupon = ["MOD20","MOD30"];
          subscriptionData.discountUpdate = updateDate;
          subscriptionData.credits = 300;
        }
        if (planType === "bookworm") {
          subscriptionData.plan = "BOOKWORM";
          subscriptionData.expireyDate = planEndDate;
          subscriptionData.discount = 1;
          subscriptionData.coupon = ["BOOK20", "BOOK30", "BOOK50"];
          subscriptionData.discountUpdate = updateDate;
          subscriptionData.credits = 500;
        }
        req.user.subscription=subscriptionData
        req.user.subSession=""
        const updatedUser=await req.user.save()
        return res
          .status(201)
          .json({ success: true, message: "Payment successful" });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Something went wrong" });
      }
    } else {
      return res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    next(new ErrorResponse("Cannot log in, check your credentials", 400));
  }
};

exports.checkoutToCart = async (req, res, next) => {
  const discountAmount=+req.user.subscription.discountSession
  
 try{
   let options
  if(req.user.subscription.plan==='BOOKWORM'){
    options= {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: 0,
          currency: 'inr',
        },
        display_name: 'Free Delivery',
      },
    }
  }else{
    options= {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: 50*100,
          currency: 'inr',
        },
        display_name: 'Delivery Charges',
      },
    }
  }
  const line_items = req.body.items.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          images: [item.image],
          metadata: {
            id: item.id,
          },
        },
        unit_amount: (item.price-(item.price*discountAmount)) * 100,
      },
      quantity: item.quantity,
    };
  });
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items,
    shipping_options: [
     options      
    ],
    success_url: process.env.CLIENT_SERVER_URL + "/user/success-cart",
    cancel_url: process.env.CLIENT_SERVER_URL + "/user/cancel",
  });
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { cartSession: session.id } },
    { new: true }
  );
  res.status(200).json(session);
}catch(err){
  next(new ErrorResponse("Cannot log in, check your credentials", 400));
}
};

exports.cartSuccess = async (req, res, next) => {
  
  const items = req.body.items;
  const updatedItems = items.map((item) => {
    return {
      book: {
        name: item.title,
        price: item.price,
      },
      quantity: item.quantity,
    };
  });
  const totalAmount = req.body.totalAmount;
  const session = await stripe.checkout.sessions.retrieve(req.user.cartSession);
  if (session.payment_status === "paid") {
    try {
      const order = await Order.create({
        orders: {
          items: updatedItems,
          totalAmount: totalAmount,
        },
        user: {
          userId: req.user._id,
        },
      });
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { cartSession: "" ,'subscription.discountSession':0} },
        { new: true }
      );
      // If the order was created successfully, you can send a response or perform other actions

      res
        .status(201)
        .json({ message: "Order placed successfully", success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  } else {
    // Handle errors if the order creation fails
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
};
