class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 201;
    this.message = '201 Created';
  }
}

module.exports = BadRequest;
