import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../model/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    req.user = await User.findById(decoded.userId).select("-password");
    console.log("Decoded token payload:", decoded);

    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, user not found");
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token invalid");
  }
});

const admin = (req, res, next) => {

    if(req.user && req.user.isAdmin){
        next()
    }else {
        res.status(401);
        throw new Error("Not auth as admin");
    }
}


export { protect,admin };
