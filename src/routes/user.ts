import express from "express";

import { getUser } from "../controllers/user";
import { verifyToken } from "../middlewares/verify-token";

const userRoute = express.Router();

/**
 * @openapi
 * /api/user:
 *  get:
 *    tags:
 *    - Get logged user (JWT verification)
 *    description: Get logged user (JWT verification)
 *    responses:
 *      200:
 *        description: App is up and running
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserLoginResponse'
 *      401:
 *         description: Unauthorized
 */

userRoute.get("/", verifyToken, getUser);

export default userRoute;
