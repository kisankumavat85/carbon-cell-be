import type { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookie from "cookie";

import HttpError from "../utils";
import prisma from "../libs/prisma";

export const verifyToken: RequestHandler = async (req, res, next) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies?.token;

    if (!token) {
      const error = new HttpError(401, "Unauthorized");
      return next(error);
    }

    const KEY = process.env.JWT_KEY as string;
    const payload = jwt.verify(token, KEY) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    req.user = user;
    next();
  } catch {
    const error = new HttpError(401, "Unauthorized");
    return next(error);
  }
};
