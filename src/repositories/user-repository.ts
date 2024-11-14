import { User as PrismaUser } from "@prisma/client";

export type User = PrismaUser;

export interface CreateUserParams {
  name: string;
  email: string | null;
  avatar: string | null;
  provider: string;
  user_provider_id: string;
}

export interface UserRepository {
  create: (data: CreateUserParams) => Promise<User>;
  findByProviderId: (providerId: string) => Promise<User | null>;
  findByUserId: (userId: string) => Promise<User | null>;
}
