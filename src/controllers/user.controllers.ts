import { RequestHandler } from "express";
import checkrefreshtoken from "../util/checkrefreshtoken";
import sendEmail from "../util/sendemail";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  findMany,
  findUnique,
  pagination,
  updatePassword,
  findById,
} from "../services/user.service";

import validator from "email-validator";

import PasswordValidator from "password-validator";

import {
  passwordAndEmailNotSent,
  emailNotSent,
  passwordNotSent,
  emailNotValid,
  passwordNotValid,
  userDoesNotExist,
  emailFailedToSend,
  tokenNotFound,
  tokenIsNotValid,
  refreshTokenNotFound,
  refreshTokenIsNotValid,
} from "../validation";

import { User } from "../types/user.type";

const schema = new PasswordValidator();
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

require("dotenv").config();

const changePassword: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      return res.status(400).json(passwordAndEmailNotSent);
    }

    if (!validator.validate(email)) {
      return res.status(400).json(emailNotValid);
    }

    if (!schema.validate(password)) {
      return res.status(400).json(passwordNotValid);
    }

    const checkUser = (await findUnique(email)) as User;

    if (!checkUser) {
      return res.status(400).json(userDoesNotExist);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = (await updatePassword(email, hashedPassword)) as User;
    if (user) {
      return res.json({ message: "Password changed successfully" });
    }
  } catch (error: any) {
    return res.status(400).json(error);
  }
};

const forgotPassword: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body as { email: string };

    if (!email) {
      return res.status(400).json(emailNotSent);
    }

    if (!validator.validate(email)) {
      return res.status(400).json(emailNotValid);
    }

    const checkUser = (await findUnique(email)) as User;

    if (!checkUser) {
      return res.status(400).json(userDoesNotExist);
    }

    const TOKEN = jwt.sign(
      { email: checkUser.email, id: checkUser.id },
      process.env.ACCESS_TOKEN_SECRET
    );

    const link = `${process.env.BASE_URL}/resetpassword/${checkUser.id}/${TOKEN}`;

    const emailResponse = await sendEmail(email, "Password Reset", link);

    if (emailResponse) {
      return res.status(200).json({ message: "Email sent successfully" });
    } else {
      return res.status(400).json(emailFailedToSend);
    }
  } catch (err: any) {
    res.json({
      error: {
        code: 400,
        message: err.message,
      },
    });
  }
};

const resetPassword: RequestHandler = async (req, res) => {
  try {
    const { password } = req.body as { password: string };

    if (!password) {
      return res.status(400).json(passwordNotSent);
    }

    if (!schema.validate(password)) {
      return res.status(400).json(passwordNotValid);
    }

    const { token } = req.params;

    if (!token) {
      return res.status(400).json(tokenNotFound);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as {
      id: string;
      email: string;
    };

    if (!decoded) {
      return res.status(400).json(tokenIsNotValid);
    }

    if (decoded) {
      const user = (await updatePassword(
        decoded.email,
        hashedPassword
      )) as User;

      if (user) {
        return res
          .status(200)
          .json({ message: "Password changed successfully" });
      }
    }
  } catch (err: any) {
    return res.status(400).json({
      error: {
        code: 400,
        message: err.message,
      },
    });
  }
};

const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = (await findMany()) as User[];
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

const refresh_token: RequestHandler = async (req, res) => {
  const refreshToken = req.headers["refresh-token"] as string;
  if (!refreshToken) {
    return res.status(400).json(refreshTokenNotFound);
  }

  try {
    const refreshTokenPayload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    ) as { email: string; id: string };

    if (!refreshTokenPayload) {
      return res.status(400).json(refreshTokenIsNotValid);
    }

    const user = (await findUnique(refreshTokenPayload.email)) as User;

    if (!user) {
      return res.status(400).json(userDoesNotExist);
    }

    if (user) {
      const accessToken = jwt.sign(
        { email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_LIFE }
      );

      const response = {
        status: "Logged in, new token generated",
        "access-token": accessToken,
      };

      return res.status(201).json(response);
    }
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

const dashboard: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const params = req.params.id;
    const refreshToken = req.headers["refresh-token"];

    if (!refreshToken) {
      return res.status(400).json(tokenNotFound);
    }

    const newAccessToken = checkrefreshtoken(refreshToken) as string;

    if (!newAccessToken) {
      return res.status(400).json(tokenIsNotValid);
    }

    return res.status(201).json({
      message: "New access-token generated",
      token: newAccessToken,
      params: params,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

const getUserById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;

    const user = (await findById(id)) as User;

    if (!user) {
      return res.status(400).json(userDoesNotExist);
    }

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

const paginationResults: RequestHandler<{
  page: string;
  limit: string;
}> = async (req, res) => {
  try {
    const { page, limit } = req.params;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const users = (await pagination(pageNumber, limitNumber)) as User[];
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export {
  changePassword,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getUserById,
  refresh_token,
  dashboard,
  paginationResults,
};
