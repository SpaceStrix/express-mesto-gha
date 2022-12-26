class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.message = '401 Unauthorized';
  }
}

module.exports = BadRequest;
