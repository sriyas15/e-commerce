import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password, localCart } = req.body;

  let user = await User.findOne({ email }).populate("cart.productId");

  if (user && (await user.matchPassword(password))) {
    // Merge local cart into server cart
    if (localCart && localCart.length > 0) {
      user.cart = mergeCarts(user.cart, localCart);
      await user.save();
    }

    // 🔥 Re-fetch user with populated cart after merging & saving
    user = await User.findById(user._id).populate("cart.productId");

   const cartWithFullProduct = user.cart.map(item => {
  const product = item.productId || item; // support both populated and plain items
  return {
    _id: product._id,
    name: product.name,
    price: product.price,
    qty: item.qty,
    countInStock: product.countInStock,
    image: product.image,
    rating: product.rating,
    numReviews: product.numReviews,
  };
});


    // Generate JWT token
    const token = jwt.sign(
      { user_id: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "30d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      cart: cartWithFullProduct, // ✅ always returns full product info
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

function mergeCarts(existingCart, localCart) {
  const map = new Map();

  [...existingCart, ...localCart].forEach(item => {
    const id = item.productId?._id || item._id;
    if (map.has(id)) {
      map.set(id, {
        ...map.get(id),
        qty: map.get(id).qty + item.qty,
      });
    } else {
      map.set(id, { ...item, productId: item.productId || id });
    }
  });

  const merged = Array.from(map.values());
  console.log("MERGED CART BEFORE SAVE:", merged);
  return merged;
}


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    const token = jwt.sign(
      { user_id: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "30d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      cart: [],
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("getUserProfile");
});

// @desc    Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Update user Profile");
});

// Admin routes placeholders
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get Users");
});
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete User");
});
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update User");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
