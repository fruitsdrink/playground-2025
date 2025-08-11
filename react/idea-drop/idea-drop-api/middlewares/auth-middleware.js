import { jwtVerify } from "jose";
import User from "../models/user.js";
import { JWT_SECRET } from "../utils/token.js";

export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    console.log({ authHeader });

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    const token = authHeader.split(" ")[1];
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // const user = await User.findById(payload.userId).select("-password");
    const user = await User.findById(payload.userId).select("_id name email");
    if (!user) {
      res.status(401);
      throw new Error("Not authorized, user not found");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401);
    next(new Error("Not authorized, token tailed"));
  }
}
