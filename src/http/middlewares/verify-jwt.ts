import { authConfig } from "@/config/auth";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function verifyJwt(req: Request, res: Response, next: NextFunction) {
  const accessToken: string | undefined = req.cookies["accessToken"];

  if (!accessToken) {
    throw new Error("Token JWT não informado");
  }

  try {
    const { sub: userId, role } = verify(accessToken, authConfig.secret) as {
      sub: string;
      role: string;
    };

    req.user = {
      id: userId,
      role,
    };

    return next();
  } catch (error) {
    throw new Error("JWT inválido");
  }
}
