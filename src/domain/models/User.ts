import type { UserEntity } from '../Entities/User';

export class UserModel {
  private user: UserEntity;

  constructor(user: UserEntity) {
    this.user = user;
  }

  snapshot(): UserEntity {
    return {
      ...this.user,
    };
  }
}
