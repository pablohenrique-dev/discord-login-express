import { User as PrismaUser } from "@prisma/client";

export type User = Omit<PrismaUser, "id" | "created_at" | "updated_at">;

export interface UserRepository {
  create: (data: User) => Promise<User>;
  findByProviderId: (providerId: string) => Promise<User | null>;
}
