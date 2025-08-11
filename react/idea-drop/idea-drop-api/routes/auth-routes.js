import express from "express";
import { jwtVerify } from "jose";
import User from "../models/user.js";
import { generateToken, JWT_SECRET } from "../utils/token.js";
import { protect } from "../middlewares/auth-middleware.js";

const router = express.Router();

// @route           POST api/auth/register
// @description     Register new user
// @access          Public
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const payload = { userId: user._id.toString() };
    const accessToken = await generateToken(payload, "1m");
    const refreshToken = await generateToken(payload, "30d");

    // set refresh token in HTTP-Only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      // sameSite: 'strict', // Prevent CSRF attacks
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// @route           POST api/auth/login
// @description     Authenticate a user
// @access          Public
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const payload = { userId: user._id.toString() };
    const accessToken = await generateToken(payload, "1m");
    const refreshToken = await generateToken(payload, "30d");

    // set refresh token in HTTP-Only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      // sameSite: 'strict', // Prevent CSRF attacks
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// @route           POST api/auth/refresh
// @description     Refresh access token using refresh token
// @access          Public (Needs valid refresh token in cookie)
router.post("/refresh", async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const { payload } = await jwtVerify(refreshToken, JWT_SECRET);

    const user = await User.findById(payload.userId);
    if (!user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const accessToken = await generateToken({ userId: payload.userId }, "1m");

    res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// @access          Public

// @route           POST api/auth/logout
// @description     Logout user and clear refresh token
// @access          Private
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
