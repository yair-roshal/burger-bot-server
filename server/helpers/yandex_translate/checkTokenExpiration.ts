import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  exp: number;
}

export default function checkTokenExpiration(token: string, req: Request, res: Response, next: NextFunction): Response | void {
  try {
    // Verify the token and get the payload
    const payload = jwt.verify(
      token,
      process.env.PRIVATE_KEY?.replace(/\\n/g, "\n") || ''
    ) as JwtPayload;

    // Check if the token has expired
    if (payload.exp < Date.now() / 1000) {
      return res
        .status(401)
        .json({ message: "Authentication token has expired" });
    }

    // Call the next middleware function
    next();
  } catch (err) {
    console.log("err_checkTokenExpiration :>> ", err);
    return res
      .status(401)
      .json({ message: "Invalid authentication token" });
  }
}