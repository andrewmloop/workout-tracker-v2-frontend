export class UnauthorizedError extends Error {
  constructor() {
    super("User is unauthorized");
  }
}
