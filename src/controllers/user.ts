import { RequestHandler } from "express";

import HttpError from "../utils";

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch {
    const error = new HttpError(500, "Something went wrong");
    return next(error);
  }
};
