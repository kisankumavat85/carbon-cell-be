import { RequestHandler } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../libs/prisma";
import HttpError from "../utils";
import { serialize } from "cookie";

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { body } = req;

    let existingUser = await prisma.user.findUnique({
      where: {
        email: body?.email,
      },
    });

    if (!!existingUser) {
      const error = new HttpError(409, "Email Id already exists");
      return next(error);
    }

    let hash = await bcryptjs.hash(body.password, 8);

    let user = await prisma.user.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: hash,
      },
    });

    user.password = "";

    res.status(201).json(user);
  } catch {
    const error = new HttpError(500, "Something went wrong");
    return next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { body } = req;

    let user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      const error = new HttpError(404, "User not found");
      return next(error);
    }

    let isMatch = await bcryptjs.compare(body.password, user.password);

    if (!isMatch) {
      const error = new HttpError(401, "Unauthorized");
      return next(error);
    }

    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const KEY = process.env.JWT_KEY as string;
    const expiresIn = 60 * 60 * 24 * 30;
    const token = jwt.sign(payload, KEY, { expiresIn });

    const serialized = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: expiresIn,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);

    res.status(200).json({
      success: true,
      user: {
        id: payload.id,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
      },
    });
  } catch {
    const error = new HttpError(500, "Something went wrong");
    return next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    const err = new HttpError(500, "Something went wrong");
    return next(err);
  }
};
