import { PrismaUserRepository } from "@/repositories/prisma/user-repository";
import { GetProfileUseCase } from "../get-profile";

export function makeGetProfileUseCase() {
  const prismaUserRepository = new PrismaUserRepository();
  const getProfileUseCase = new GetProfileUseCase(prismaUserRepository);

  return getProfileUseCase;
}
