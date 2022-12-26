class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 200;
    this.message = '200 OK';
  }
}

module.exports = BadRequest;
