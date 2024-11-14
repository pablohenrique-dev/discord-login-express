import { User, UserRepository } from "@/repositories/user-repository";

interface GetProfileUseCaseRequest {
  userId: string;
}

interface GetProfileUseCaseResponse {
  user: User;
}

export class GetProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const user = await this.userRepository.findByUserId(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return { user };
  }
}
