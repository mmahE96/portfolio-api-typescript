import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler')

const userRoute = asyncHandler(async(req:Request, res:Response, next: NextFunction)  => {
  
  try {
    let token = req.header("access-token");

    if (!token) {
      return res.status(401).json({
        error: {
          code: 401,
          message: "Access denied, you don't have an access-token",
        },
      });
    }

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as {
      email: string;
      role: string;
    };
    if (!decode) {
      return res.status(401).json({
        error: {
          code: 401,
          message: "Access denied, invalid access-token",
        },
      });
    }
  } catch (err: any) {
    return res.status(401).json({
      error: {
        code: 401,
        message: err.message,
      },
    });
  }

  next();
});

const adminRoute = asyncHandler(async(req:Request, res:Response, next: NextFunction) => {
  
  let token;

  try {
    // Get token from header
    token = req.headers["access-token"] as string;

    if (!token) {
      res.status(401).json({
        error: {
          code: 401,
          message: "Not authorized, no token",
        },
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as { role: string };

    if (!decoded) {
      res.status(401).json({
        error: {
          code: 401,
          message: "Not authorized, token invalid",
        },
      });
    }

    const decodedToken = jwt.decode(token) as { role: string };

    if (decodedToken.role !== "admin") {
      res.status(401).json({
        error: {
          code: 401,
          message: "Not authorized, not an admin",
        },
      });
    }

    next();
  } catch (err: any) {
    res.status(401).json({
      error: {
        code: 401,
        message: err.message,
      },
    });
  }
});

export { userRoute, adminRoute };
