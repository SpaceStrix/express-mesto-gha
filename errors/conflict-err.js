class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = '409 Conflict';
  }
}

module.exports = Conflict;
