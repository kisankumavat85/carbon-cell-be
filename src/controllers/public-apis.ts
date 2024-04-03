import { RequestHandler } from "express";
import fetch from "node-fetch";

import HttpError from "../utils";
import { PublicAPIsData } from "../types";

const BASE_URL = "https://api.publicapis.org/entries";

export const getPublicAPIs: RequestHandler = async (req, res, next) => {
  try {
    let { category, limit } = req.query;

    const url = new URL(BASE_URL);

    if (category) {
      url.searchParams.append("category", category as string);
    }

    const response = await fetch(url, {
      method: "GET",
    });
    let data = (await response.json()) as PublicAPIsData;

    if (data.entries && data.count > 0 && Number(limit)) {
      data = {
        count: Number(limit),
        entries: data.entries.slice(0, Number(limit)),
      };
    }

    res.status(200).send(
      JSON.stringify({
        success: true,
        data,
      })
    );
  } catch {
    const error = new HttpError(500, "Something went wrong");
    return next(error);
  }
};
