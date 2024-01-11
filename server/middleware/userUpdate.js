const User = require("../models/user");

exports.userUpdate = async (user) => {
  const currentDate = new Date();
  const borrowedData = user.borrow.items;
  const fineData = user.fine.items;
  let totalFineAmount = user.fine.totalAmount||0;
  //borrow and fine
  let updatedFine=[]
  if(fineData.length>0){

       updatedFine = fineData.map((item) => {
          const fineDate = new Date(item.fineDate);
          const daysPass = Math.floor(
              (currentDate - fineDate) / (1000 * 60 * 60 * 24)
              );
              totalFineAmount = totalFineAmount - item.fineAmount;
              item.fineAmount =  Math.floor((daysPass/7)+1)* 10;
              totalFineAmount += item.fineAmount;
              
              return item;
            });
        }
 
  
  borrowedData.forEach((data) => {
    const borrowedDate = new Date(data.returnDate);
    const daysPass = 
      (currentDate - borrowedDate) / (1000 * 60 * 60 * 24)
    ;
    if (daysPass>=0) {
      const formattedDay=Math.floor(daysPass)
      let fineModel = {}; // Initialize fineModel within the loop
      let index=-1
      if(fineData.length>0){
        index=updatedFine.findIndex(item=>item.bookId.toString()===data.bookId.toString())
      
    }
      if (index===-1) {
        fineModel.fineAmount = Math.floor((formattedDay/7)+1)*10;
        fineModel.fineDate = currentDate;
        fineModel.bookId = data.bookId;
        totalFineAmount += Math.floor((formattedDay/7)+1)*10;
        updatedFine.push(fineModel);
      }
    }
  });

  //subscription discount update and plan expiry update

  const subscription = user.subscription;
  const expireyDate = new Date(subscription.expireyDate);
  const credits=user.subscription.credits
  if (expireyDate !== null && currentDate > expireyDate) {
    subscription.plan = null;
    subscription.expireyDate = null;
    subscription.discount = 0;
    subscription.discountUpdate = null;
    subscription.coupon = [];
    subscription.credits=0
  }

  const discountUpdate = new Date(subscription.discountUpdate);
  if (discountUpdate !== null && currentDate > discountUpdate) {
    if (subscription.plan === "LITE") {
      subscription.discount = 1;
      subscription.discountUpdate = discountUpdate.setMonth(
        discountUpdate.getMonth() + 1
      );
      subscription.coupon = ["LITE20"];
      if(credits<=50 && credits>=0){
        subscription.credits=200
      }
    }
    if (subscription.plan === "MODERATE") {
      subscription.discount = 2;
      subscription.discountUpdate = discountUpdate.setMonth(
        discountUpdate.getMonth() + 1
      );
      subscription.coupon = ["MOD20", "MOD30"];
      if(credits<=50 && credits>=0){
        subscription.credits=300
      }
    }
    if (subscription.plan === "BOOKWORM") {
      subscription.discount = 3;
      subscription.discountUpdate = discountUpdate.setMonth(
        discountUpdate.getMonth() + 1
      );
      subscription.coupon = ["BOOK20", "BOOK30", "BOOK50"];
      if(credits<=50 && credits>=0){
        subscription.credits=500
      }
    }
  }
  user.fine.items = updatedFine;
  user.borrow.items = borrowedData;
  user.subscription = subscription;
  user.fine.totalAmount = totalFineAmount;

  try {
    // Save the updated user object to the database
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error updating user:", error);
    throw new Error("Could not update user.");
  }
};
