/* eslint-disable @typescript-eslint/no-explicit-any */
// Sanitize and validate inputs
function validation() {
  //validation
  const sanitize = (input) => {
    if (typeof input === "string") {
      return input.replace(/[<>]/g, ""); // Basic sanitization removing angle brackets
    }
    return input;
  };

  const validateString = (value, name) => {
    if (!value || typeof value !== "string") {
      throw new Error(`${name} is invalid!`);
    }
  };

  const validateNumber = (value, name) => {
    if (value === null || value === undefined || typeof value !== "number") {
      throw new Error(`${name} is invalid!`);
    }
  };

  const validateDate = (value, name) => {
    const date = new Date(value);
    if (!date.getTime() || isNaN(date.getTime())) {
      throw new Error(`${name} is invalid!`);
    }
    return date;
  };
  const validateArray = (input, fieldName) => {
    if (!Array.isArray(input)) {
      throw new Error(`Invalid ${fieldName} field! It must be an array.`);
    }
  };

  const validateObject = (input, fieldName) => {
    if (typeof input !== "object" || input === null || Array.isArray(input)) {
      throw new Error(`Invalid ${fieldName} field! It must be an object.`);
    }
  };

  const validateBoolean = (input, fieldName) => {
    if (typeof input !== "boolean" && input !== null) {
      throw new Error(`Invalid ${fieldName} field! It must be a boolean.`);
    }
  };

  return {
    sanitize,
    validateString,
    validateNumber,
    validateDate,
    validateObject,
    validateBoolean,
    validateArray,
  };
}

export default validation;
