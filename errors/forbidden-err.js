class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.message = '403 Forbidden';
  }
}

module.exports = ForbiddenError;
