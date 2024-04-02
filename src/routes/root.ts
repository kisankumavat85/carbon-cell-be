import express from "express";

const rootRoute = express.Router();

/**
 * @openapi
 * /:
 *  get:
 *    tags:
 *    - Health check
 *    description: Responds if the app is up and running
 *    responses:
 *      200:
 *        description: App is up and running
 */

rootRoute.get("/", (req, res) => {
  res.sendStatus(200);
});

export default rootRoute;
