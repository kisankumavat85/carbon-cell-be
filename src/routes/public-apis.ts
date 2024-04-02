import express from "express";

import { getPublicAPIs } from "../controllers/public-apis";

const publicAPIsRoute = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *  get:
 *     tags:
 *      - Get Public APIs
 *     summary: Get public APIs
 *     parameters:
 *       - in: query
 *         name: limit
 *         type: integer
 *         description: Limit the number of records
 *       - in: query
 *         name: category
 *         type: string
 *         description: Filter by category
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: string
 *                data:
 *                  type: object
 *                  properties:
 *                    count:
 *                      type: number
 *                    entries:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           API:
 *                             type: string
 *                           Description:
 *                             type: string
 *                           Auth:
 *                             type: string
 *                           HTTPS:
 *                             type: boolean
 *                           Cors:
 *                             type: string
 *                           Link:
 *                             type: string
 *                           Category:
 *                             type: string
 *       500:
 *         description: Something went wrong
 */

publicAPIsRoute.get("/", getPublicAPIs);

export default publicAPIsRoute;
