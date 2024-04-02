import express from "express";
import { getBalance } from "../controllers/ethereum";

const ethereumRoute = express.Router();

/**
 * @openapi
 * /api/ethereum/{address}:
 *  get:
 *    tags:
 *    - Ethereum balance
 *    description: Get Ethereum balance
 *    parameters:
 *       - in: path
 *         name: address
 *         type: string
 *         description: Ethereum account
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  properties:
 *                    balance:
 *                      type: string
 *      400:
 *         description: Invalid address
 *      500:
 *         description: Something went wrong
 */

ethereumRoute.get("/:address", getBalance);

export default ethereumRoute;
