class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = '400 Bad Request';
  }
}

module.exports = BadRequest;
