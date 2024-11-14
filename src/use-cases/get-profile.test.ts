import { InMemoryUserRepository } from "@/repositories/in-memory/user-repository";
import { describe, it, beforeEach, expect } from "vitest";
import { GetProfileUseCase } from "./get-profile";
import { User } from "@prisma/client";
import { randomUUID } from "node:crypto";

describe("get-profile use case", () => {
  let userRepository: InMemoryUserRepository;
  let sut: GetProfileUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new GetProfileUseCase(userRepository);
  });

  it("Should not be able to get a user if id passed does not exits", async () => {
    
    await expect(() => sut.execute({ userId: "01" })).rejects.toBeInstanceOf(
      Error
    );
  });

  it("Should be able to get a user if id passed exits", async () => {
    const newUser: User = {
      id: "01",
      name: "John Doe",
      email: "johndoe@email.com",
      avatar: null,
      created_at: new Date(),
      updated_at: new Date(),
      provider: "discord",
      user_provider_id: randomUUID(),
    };

    userRepository.items.push(newUser);

    const { user } = await sut.execute({ userId: "01" });

    expect(user).toEqual(
      expect.objectContaining({
        name: "John Doe",
        email: "johndoe@email.com",
      })
    );
  });
});
