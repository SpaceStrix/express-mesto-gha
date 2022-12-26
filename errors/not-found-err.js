class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.message = '404 Not Found';
  }
}

module.exports = NotFoundError;
