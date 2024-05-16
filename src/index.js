const core = require("@actions/core");

/**
 * @typedef {Object} Input
 * @property {*} type The type of the input.
 * @property {*} value The parsed value of the input.
 */

/**
 *
 * @param {*} type The type of the input.
 * @param {*} value The parsed value of the input.
 * @returns {Input} The created object.
 */
function Input(type, value) {
  return { type, value };
}

/**
 *
 * @param {string} inputName The name of the input to fetch.
 * @param {...string} types The type to test the input against.
 * @returns {Input} The Input object.
 */
function parseInput(inputName, ...types) {
  const input = core.getInput(inputName);
  for (const type of types) {
    const _type = type.toLowerCase();
    switch (_type) {
      case "number":
        const number = parseFloat(input);
        if (!isNaN(number)) return Input(_type, number);
        break;
      case "boolean":
        const lowerInput = input.toLowerCase();
        if (lowerInput === "true") return Input(_type, true);
        if (lowerInput === "false") return Input(_type, false);
        break;
      case "date":
        const date = new Date(input);
        if (!isNaN(date.getTime())) return Input(_type, date);
        break;
      case "json":
        try {
          return Input(_type, JSON.parse(input));
        } catch {}
        break;
      case "string":
        return Input(_type, input);
        break;
      default:
        core.warning(`Unsupported type: ${type}`);
    }
  }
  return null;
}

module.exports = {
  parseInput,
};
