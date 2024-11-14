import { User, UserRepository } from "../user-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements UserRepository {
  async create(data: User) {
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
}
