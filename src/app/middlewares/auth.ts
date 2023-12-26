import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/CatchAsync";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../modules/user/user.interface";
import JWTError from "../errors/JWTError";

const auth = (...userRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //get token from authorization header
    const token = req.headers.authorization;

    if (!token) {
      throw new JWTError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }

    // check token valid or not
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role } = decoded;

    //check user role valid or not
    if (userRoles && !userRoles.includes(role)) {
      throw new JWTError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }

    //get user info by jwt token
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
