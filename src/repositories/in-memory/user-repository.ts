import { randomUUID } from "node:crypto";
import { CreateUserParams, User, UserRepository } from "../user-repository";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async create(data: CreateUserParams) {
    const user = {
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
      ...data,
    };

    this.items.push(user);

    return user;
  }

  async findByProviderId(providerId: string) {
    const user = this.items.find(
      (user) => user.user_provider_id === providerId
    );

    if (!user) return null;

    return user;
  }

  async findByUserId(userId: string) {
    const user = this.items.find((user) => user.id === userId);

    if (!user) return null;

    return user;
  }
}
