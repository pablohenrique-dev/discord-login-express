import { User, UserRepository } from "@/repositories/user-repository";

interface RegisterUseCaseRequest {
  avatar: string | null;
  email?: string;
  global_name: string | null;
  username: string;
  user_provider_id: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    avatar,
    email,
    global_name,
    username,
    user_provider_id,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userAlreadyExists = await this.userRepository.findByProviderId(
      user_provider_id
    );

    if (!userAlreadyExists) {
      const avatarUrl = avatar
        ? `https://cdn.discordapp.com/avatars/${user_provider_id}/${avatar}.png`
        : null;

      const user = await this.userRepository.create({
        email: email ? email : null,
        avatar: avatarUrl,
        user_provider_id: user_provider_id,
        provider: "discord",
        name: global_name ?? username,
      });

      return { user };
    }

    return { user: userAlreadyExists };
  }
}
