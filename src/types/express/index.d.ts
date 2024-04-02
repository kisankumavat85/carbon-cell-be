import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    } | null;
  }
}

export type PublicAPIsEntry = {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: true;
  Cors: string;
  Link: string;
  Category: string;
};

export type PublicAPIsData = {
  count: number;
  entries: PublicAPIsEntry[] | null;
};
