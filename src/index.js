const core = require('@actions/core');

/**
 * 
 * @param {string} inputName The name of the input to fetch.
 * @param {type} types The type to test the input against.
 * @returns {any} An array of two values, the input value parsed and the type it matches, otherwise null for both.
 */
function parseInput(inputName, ...types) {
  const input = core.getInput(inputName);
  for (const type of types) {
    const _type = type.toLowerCase()
    switch (_type) {
      case 'number':
        const number = parseFloat(input);
        if (!isNaN(number)) return [number, _type];
        break;
      case 'boolean':
        const lowerInput = input.toLowerCase();
        if (lowerInput === 'true') return [true, _type];
        if (lowerInput === 'false') return [false, _type];
        break;
      case 'date':
        const date = new Date(input);
        if (!isNaN(date.getTime())) return [date, _type];
        break;
      case 'json':
        try {
          return [JSON.parse(input), _type];
        } catch {
          return [null, null]
        }
        break;
      case 'string':
          return [input, _type];
        break;
      default:
        core.warning(`Unsupported type: ${type}`);
    }
  }
  return [null, null];
}

module.exports = {
  parseInput
};
