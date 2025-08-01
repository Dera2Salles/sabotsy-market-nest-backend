export class UserNotFoundException extends Error {
  constructor(error: string) {
    super(error);
  }
}
