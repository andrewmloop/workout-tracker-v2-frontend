export class UnauthorizedError extends Error {
  constructor() {
    super("User is unauthorized");

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
