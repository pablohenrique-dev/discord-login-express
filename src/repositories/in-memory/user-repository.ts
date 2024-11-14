import { User, UserRepository } from "../user-repository";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async create(data: User) {
    this.items.push(data);

    return data;
  }

  async findByProviderId(providerId: string) {
    const user = this.items.find(
      (user) => user.user_provider_id === providerId
    );

    if (!user) return null;

    return user;
  }
}
