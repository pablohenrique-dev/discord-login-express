import { PrismaUserRepository } from "@/repositories/prisma/user-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
  const userRepository = new PrismaUserRepository();
  const registerUseCase = new RegisterUseCase(userRepository);

  return registerUseCase;
}
