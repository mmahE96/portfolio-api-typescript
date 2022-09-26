import { RequestHandler } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import validator from "email-validator";
import {
  passwordAndEmailNotSent,
  emailNotValid,
  userAlreadyExists,
  userDoesNotExist,
  invalidCredentials,
  passwordNotValid,
} from "../validation/index";
import { create, findUnique } from "../services/user.service";

import PasswordValidator from "password-validator";

import { User } from "../types/user.type";
import { prisma } from "@prisma/client";
require("dotenv").config();

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

const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(passwordAndEmailNotSent);
    }

    const user = (await findUnique(email)) as User;

    if (!user) {
      return res.status(400).json(userDoesNotExist);
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const refreshToken = jwt.sign(
        { email: user.email, role: user.role },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_LIFE }
      );
      const accessToken = jwt.sign(
        { email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_LIFE }
      );

      const response = {
        status: "Logged in",
        token: accessToken,
        refreshToken: refreshToken,
      };

      return res.status(200).json(response);
    } else {
      return res.status(400).json(invalidCredentials);
    }
  } catch (err: any) {
    return res.json({
      error: {
        code: 400,
        message: err.message,
      },
    });
  }
};

const register: RequestHandler = async (req, res) => {

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

    if (checkUser) {
      return res.status(400).json(userAlreadyExists);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = (await create(email, hashedPassword, "user")) as User;

    return res
      .status(201)
      .json({ message: "User registered successfully", user: user });
  } catch (err: any) {
    return res.json({
      error: {
        code: 400,
        message: err.message,
      },
    });
  }
};

export { login, register };
