class ValidationError extends Error {
  constructor(message, type) {
    super(message);
    this.name = "ValidationError";
    this.type = type;
  }
}

module.exports.ValidationError = ValidationError;
