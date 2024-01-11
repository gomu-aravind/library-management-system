const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");
exports.getSubscribedUser = async (req, res, next) => {
  try {
    if (req.id !== "admin") {
      return res.status(403).json({ success: false, message: "Not an Admin" });
    }
    const subscribedUser = await User.find(
      {},
      "name subscription.plan subscription.expireyDate"
    );
    if (!subscribedUser) {
      return res
        .status(404)
        .json({ success: false, message: "No user is registered" });
    }
    return res.status(200).json({ success: true, users: subscribedUser });
  } catch (error) {
    next(new ErrorResponse("Cannot log in, check your credentials", 400));
  }
};

exports.getUserFines = async (req, res, next) => {
  try {
    if (req.id !== "admin") {
      return res.status(403).json({ success: false, message: "Not an Admin" });
    }
    const fineUser = await User.find({}, "name fine.items fine.totalAmount");
    if (!fineUser) {
      return res
        .status(404)
        .json({ success: false, message: "No user is registered" });
    }
    return res.status(200).json({ success: true, users: fineUser });
  } catch (error) {
    next(new ErrorResponse("Cannot log in, check your credentials", 400));
  }
};
