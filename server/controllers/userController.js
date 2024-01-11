const User = require("../models/user");
const Book = require("../models/book");
const Order=require('../models/order')
const bcrypt = require("bcrypt");
const ErrorResponse = require("../utils/errorResponse");
require("dotenv").config;
const jwt = require("jsonwebtoken");
const { userUpdate } = require("../middleware/userUpdate");

exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if(email===process.env.CLIENT_ADMIN_EMAIL){
    return res.status(400).json({success:false,message:"Can't create admin credentials"})
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
    role: "user",
    subscription: {
      plan: null,
      expireyDate: null,
      discount: 0,
      discountUpdate: null,
      credits:0,
      discountSession:0
    },
    fine: { items: [] },
    borrow: { items: [] },
    cartSession:"",
    subSession:""
  });
  try {
    const existingUser=await User.find({email:email})
    
    if(existingUser.length!==0){
      return res.status(400).json({success:false,message:"User already exist"})
    }
    const user = await User.create(newUser);
    res.status(201).json({ success: true, message: "User created" });
  } catch (error) {
    next(new ErrorResponse("Cannot log in, check your credentials", 400));
  }
};

exports.login = async (req, res, next) => {
  const { email, password, role } = req.body;
  if (role === "admin") {
    try {
      if (
        email === process.env.CLIENT_ADMIN_EMAIL &&
        password === process.env.CLIENT_ADMIN_PASSWORD
      ) {
        const accessToken = jwt.sign(
          { id: "admin", role: "admin", email: process.env.CLIENT_ADMIN_EMAIL },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "25m" }
        );
        const roleToken = jwt.sign(
          { role: "admin" },
          process.env.ROLE_SECRET_KEY,
          { expiresIn: "2h" }
        );
        const refreshToken = jwt.sign(
          { id: "admin" ,role:"admin"},
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "2h" }
        );
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 25 * 60 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 2 * 60 * 60 * 1000,
        });
        return res.status(200).json({
          success: true,
          role: "admin",
          name: "Admin",
          roleToken: roleToken,
        });
      } else {
        return next(new ErrorResponse("Invalid email or password", 400));
      }
    } catch (error) {
      next(new ErrorResponse("Cannot log in, check your credentials", 400));
    }
  } else {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return next(new ErrorResponse("Invalid credentials", 400));
      }
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return next(new ErrorResponse("Invalid credentials", 400));
      }
      const accessToken = jwt.sign(
        { id: user._id, role: "user", email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "25m" }
      );
      const refreshToken = jwt.sign(
        { id: user._id,role:"user" },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "2h" }
      );
      const roleToken = jwt.sign(
        { role: "user" },
        process.env.ROLE_SECRET_KEY,
        { expiresIn: "2h" }
      );
      userUpdate(user);
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 25 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 2 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        role: "user",
        name: user.name,
        roleToken: roleToken,
      });
    } catch (err) {
      next(new ErrorResponse("Cannot log in, check your credentials", 400));
    }
  }
};

exports.borrowBook = async (req, res, next) => {
  const id = req.user.id;
  const bookId = req.body.bookId;

  let currentDate = new Date();
  let returnDate;
  const borrowedBooks = req.user.borrow.items;

  const isBorrowed = borrowedBooks.findIndex(
    (books) => books.bookId.toString() === bookId.toString()
  );

  try {
    if (req.user.subscription.plan === null) {
      return res.status(402).json({
        success: false,
        message: "You should subscribe to borrow books",
      });
    }
    if (isBorrowed !== -1) {
      return res
        .status(400)
        .json({ success: false, message: "Book is already borrowed" });
    }
    if (req.user.subscription.plan === "LITE") {
      currentDate.setMonth(currentDate.getMonth() + 1);
      currentDate.setUTCHours(23, 0, 0,0);
      returnDate = currentDate;
    }
    if (req.user.subscription.plan === "MODERATE") {
      currentDate.setMonth(currentDate.getMonth() + 2);
      currentDate.setUTCHours(23, 0, 0,0);
      returnDate = currentDate;
    }
    if (req.user.subscription.plan === "BOOKWORM") {
      currentDate.setMonth(currentDate.getMonth() + 3);
      currentDate.setUTCHours(23, 0, 0,0);  
      returnDate = currentDate;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { "borrow.items": { bookId, returnDate } } },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Books Borrowed successfully" });
  } catch (error) {
    next(new ErrorResponse("Cannot log in, check your credentials", 400));
  }
};

exports.bookBorrowed = async (req, res, next) => {
  const borrow = req.user.borrow.items;
  try {
    if (borrow.length == 0) {
      return res.status(200).json({
        success: true,
        message: "You didn't borrowed any books",
        data: [],
      });
    }
    const data = await Promise.all(
      borrow.map(async (book) => {
        const bookData = await Book.findById(book.bookId);
        return {
          id: bookData._id,
          title: bookData.title,
          author: bookData.author,
          returnDate: book.returnDate,
        };
      })
    );
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    next(new ErrorResponse("Cannot log in, check your credentials", 400));
  }
};

exports.getCoupons = async (req, res, next) => {
  try {
    const coupons = req.user.subscription.coupon;
    if (req.user.subscription.plan === null) {
      return res
        .status(402)
        .json({ success: false, message: "Please subscribe to get coupons" });
    }
    if (coupons.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Coupons are used for your plan" ,plan:req.user.subscription.plan});
    }
    return res.status(200).json({ success: true, coupons: coupons ,plan:req.user.subscription.plan});
  } catch (err) {
    next(new ErrorResponse("Cannot log in, check your credentials", 400));
  }
};

exports.useCoupons = async (req, res, next) => {
  try{
    const user=req.user
    const appliedCoupons=req.body.appliedCoupon
  const coupons = user.subscription.coupon;
  const count=user.subscription.discount
  const isExist=coupons.findIndex(coupon=>coupon===appliedCoupons)
  if(isExist===-1){
    return res.status(404).json({success:false,message:"No Coupons exist"})
  }
  const updatedCoupons=coupons.filter(coupon=>coupon!==appliedCoupons)
  user.subscription.coupon=updatedCoupons
  user.subscription.discount=count-1
  user.subscription.discountSession+=+((appliedCoupons.slice(-2))/100)

  const updatedUser=await User.findByIdAndUpdate(user._id, user, {
    new: true,
  });
  if(!updatedUser){
    return res.status(500).json({success:false,message:"Something went wrong"})
  }
  return res.status(200).json({success:true,message:"Coupon is used successfully",discount:req.user.subscription.discountSession})
  
}catch(err) {
  next(new ErrorResponse("Cannot log in, check your credentials", 400));
}
};

exports.returnBook = async (req, res, next) => {
  const borrowId = req.params.bookId;
  const borrowedItems = req.user.borrow.items;
  const fineItems = req.user.fine.items;
  try {
    const isFine = fineItems.findIndex(
      (item) => item.bookId.toString() === borrowId.toString()
    );
    if (isFine > -1) {
      return res.status(400).json({
        success: false,
        message: "Return Date is expired.Pay the Fine",
      });
    }
    const updatedBorrow = borrowedItems.filter(
      (item) => item.bookId.toString() !== borrowId.toString()
    );

    req.user.borrow.items = updatedBorrow;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { "borrow.items": updatedBorrow } }, // Use $push to add new borrow data to the items array
      { new: true }
    );
    if (!updated) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
    return res.status(200).json({ success: true, message: "Book returned" });
  } catch (err) {
    next(new ErrorResponse("Cannot log in, check your credentials", 400));
  }
};

exports.getFine = async (req, res, next) => {
  const fine = req.user.fine;
  if (fine.items.length === 0) {
    return res
      .status(200)
      .json({ success: true, mesage: "No Fine is available", fineData: [] });
  }
  const fineData = await Promise.all(
    fine.items.map(async (book) => {
      const bookData = await Book.findById(book.bookId);
      return {
        id: bookData._id,
        title: bookData.title,
        fineAmount: book.fineAmount,
        fineDate: book.fineDate,
        totalAmount:fine.totalAmount,
      };
    })
  );
  return res
    .status(200)
    .json({ success: true, fineData: fineData, fineTotal: fine.totalAmount ,credits:req.user.subscription.credits});
};

exports.payFine=async(req,res,next)=>{
  const fines=req.user.fine.items
  const borrow=req.user.borrow.items
  const toBePay=+req.body.totalAmount
  const credits=req.user.subscription.credits

  try{
    const fineIds = fines.map(item => item.bookId.toString());
  const result = borrow.filter(item => !fineIds.includes(item.bookId.toString()));
  if(credits-toBePay<0){
    return res.status(400).json({success:false,message:"You don't have sufficient credits"})
  }
  req.user.fine.items=[]
  req.user.fine.totalAmount=0
  req.user.borrow.items=result
  req.user.subscription.credits=req.user.subscription.credits-toBePay
  const updatedUser=await req.user.save()
  if(!updatedUser){
    return res.status(500).json({success:false,message:"Spmething went wrong"})
  }
  return res.status(200).json({success:true,message:"Fine Paid"})
}catch(err){
    next(new ErrorResponse("Cannot log in, check your credentials", 400));
}

}

exports.getPlan=async(req,res,next)=>{
  const plan=req.user.subscription.plan
  if(plan===null){
    return res.status(402).json({success:false,message:"Not subscribed",subscription:null,name:req.user.name})
  }
  return res.status(200).json({success:true,subscription:req.user.subscription,name:req.user.name})
}


exports.getOrder=async (req,res,next)=>{
  const id=req.user._id
  try{
    const userOrders=await Order.find({'user.userId':id})
    if(!userOrders){
      return res.status(500).json({success:false,message:"Something went wrong"})
    }

    return res.status(200).json({success:true,orders:userOrders})
  }catch(err){
    next(new ErrorResponse("Cannot log in, check your credentials", 400));
  }

}

//LOG OUT USER
exports.logout = async (req, res, next) => {

  if(req.id!=='admin'){
    const user=req.user
    user.subscription.discountSession=0
    await user.save()
  }
  res.clearCookie("accessToken",{
    httpOnly:true,
    secure:true
  });
  res.clearCookie("refreshToken",{
    httpOnly:true,
    secure:true
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};
