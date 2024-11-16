import { InMemoryUserRepository } from "@/repositories/in-memory/user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";

describe("Register use case", () => {
  let userRepository: InMemoryUserRepository;
  let sut: RegisterUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(userRepository);
  });

  it("Should be able to return a user after sign up", async () => {
    const email = "johndoe@email.com";
    const global_name = "John Doe";
    const username = "johndoe123";

    const profile = {
      avatar: "https://avatar.iran.liara.run/public/10",
      email,
      global_name,
      username,
      user_provider_id: "01",
    };

    const { user } = await sut.execute(profile);

    expect(user).toEqual(
      expect.objectContaining({
        email,
        name: global_name,
        user_provider_id: "01",
      })
    );
  });
});
