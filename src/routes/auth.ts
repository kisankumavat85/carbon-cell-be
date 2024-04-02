import express from "express";

import { login, logout, registerUser } from "../controllers/auth";
import { loginSchema, registerUserSchema } from "../schemas/auth";
import validate from "../libs/ajv";

const authRoutes = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *  post:
 *     tags:
 *      - User registration
 *     summary: Registers the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserInput'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterUserResponse'
 *       409:
 *         description: Conflict
 *       500:
 *         description: Something went wrong
 */

authRoutes.post(
  "/register",
  validate({ body: registerUserSchema }),
  registerUser
);

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *     tags:
 *      - User login
 *     summary: Login the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Something went wrong
 */

authRoutes.post("/login", validate({ body: loginSchema }), login);

/**
 * @openapi
 * /api/auth/logout:
 *  get:
 *    tags:
 *    - User logout
 *    description: Logout the user
 *    responses:
 *      200:
 *        description: App is up and running
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  success:
 *                    type: string
 *                  message:
 *                    type: string
 */

authRoutes.get("/logout", logout);

export default authRoutes;
