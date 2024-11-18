import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/config/auth";

export const ROLES = ["USER", "ADMIN"] as const;

export type Role = (typeof ROLES)[number];

export function verifyRole(requiredRole: Role) {
  return (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies["accessToken"];

    if (!accessToken) {
      return res.status(401).json({ error: "Token JWT não informado" });
    }

    try {
      const { role, sub: userId } = verify(accessToken, authConfig.secret) as {
        sub: string;
        role: string;
      };

      if (role !== requiredRole) {
        return res
          .status(403)
          .json({ error: "Acesso negado: Permissão insuficiente" });
      }

      req.user = {
        id: userId,
        role: role,
      };

      next();
    } catch (error) {
      return res.status(403).json({ error: "JWT inválido" });
    }
  };
}
