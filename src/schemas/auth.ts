import { AllowedSchema } from "express-json-validator-middleware";

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterUserInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *        email:
 *          type: string
 *          default: test@mail.com
 *        password:
 *          type: string
 *          default: test123
 *        firstName:
 *          type: string
 *          default: Kisan
 *        lastName:
 *          type: string
 *          default: Kumavat
 *     RegisterUserResponse:
 *       type: object
 *       properties:
 *        id:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *          default: ""
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const registerUserSchema: AllowedSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      minLength: 7,
      format: "email",
    },
    password: {
      type: "string",
      minLength: 6,
    },
    firstName: {
      type: "string",
      minLength: 1,
    },
    lastName: {
      type: "string",
      minLength: 1,
    },
  },
  required: ["email", "password", "firstName", "lastName"],
  errorMessage: {
    properties: {
      email: "Please enter a valid Email Id",
      password: "Please enter a valid Password",
      firstName: "Please enter a valid First Name",
      lastName: "Please enter a valid Last Name",
    },
  },
};

/**
 * @openapi
 * components:
 *   schemas:
 *     UserLoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *        email:
 *          type: string
 *          default: test@mail.com
 *        password:
 *          type: string
 *          default: test123
 *     UserLoginResponse:
 *       type: object
 *       properties:
 *        success:
 *          type: boolean
 *        user:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *            email:
 *              type: string
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 */

export const loginSchema: AllowedSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      minLength: 7,
      pattern: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
    },
    password: {
      type: "string",
      minLength: 6,
    },
  },
  required: ["email", "password"],
  errorMessage: {
    properties: {
      email: "Please enter a valid Email Id",
      password: "Please enter a valid Password",
    },
  },
};
