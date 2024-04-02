import { RequestHandler } from "express";
import { isAddress } from "web3-validator";

import web3 from "../libs/web3";
import HttpError from "../utils";

export const getBalance: RequestHandler = async (req, res, next) => {
  try {
    const address = req.params.address;

    if (!isAddress(address)) {
      const error = new HttpError(400, "Invalid address");
      return next(error);
    }

    const balance = await web3.eth.getBalance(address);
    const etherBalance = web3.utils.fromWei(balance, "ether");

    res.status(200).json({
      success: true,
      data: {
        balance: etherBalance,
      },
    });
  } catch {
    const error = new HttpError(500, "Something went wrong");
    return next(error);
  }
};
