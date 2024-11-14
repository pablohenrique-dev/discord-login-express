import { CreateUserParams, User, UserRepository } from "../user-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements UserRepository {
  async create(data: CreateUserParams) {
    const user = await prisma.user.create({ data });
    return user;
  }

  async findByProviderId(providerId: string) {
    const user = await prisma.user.findUnique({
      where: {
        user_provider_id: providerId,
      },
    });

    if (!user) return null;

    return user;
  }

  async findByUserId(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return null;

    return user;
  }
}
