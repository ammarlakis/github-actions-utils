const core = require('@actions/core');

/**
 * 
 * @param {string} inputName The name of the input to fetch.
 * @returns {boolean} Parsed boolean if 'true'/'false', otherwise null.
 */
function parseBooleanInput(inputName) {
  const inputString = core.getInput(inputName);
  if (inputString === 'true') return true;
  if (inputString === 'false') return false;
  core.setFailed(`Failed to parse Boolean input for ${inputName}`)
  return null;
}

/**
 * 
 * @param {string} inputName The name of the input to fetch.
 * @returns {boolean | string} Parsed boolean if 'true'/'false', otherwise the input string.
 */
function parseBooleanOrStringInput(inputName) {
  const inputString = core.getInput(inputName);
  if (inputString === 'true') return true;
  if (inputString === 'false') return false;
  return inputString;
}

/**
 * 
 * @param {string} inputName The name of the input to fetch.
 * @returns {object} Parsed object if the input was valid, otherwise `null`.
 */
function parseJsonInput(inputName) {
  try {
    const inputString = core.getInput(inputName);
    return inputString ? JSON.parse(inputString) : {};
  } catch (error) {
    core.setFailed(`Failed to parse JSON input for ${inputName}: ${error.message}`);
    return null;
  }
}

/**
 * 
 * @param {string} inputName The name of the input to fetch.
 * @returns {boolean | object} Parsed boolean if 'true'/'false', if not then parsed object if the input was valid, otherwise `null`.
 */
function parseBooleanOrJsonInput(inputName) {
  try {
    const inputString = core.getInput(inputName);
    if (inputString === 'true') return true;
    if (inputString === 'false') return false;
    return inputString ? JSON.parse(inputString) : {};
  } catch (error) {
    core.setFailed(`Failed to parse JSON input for ${inputName}: ${error.message}`);
    return {};
  }
}

module.exports = {
  parseBooleanInput,
  parseBooleanOrStringInput,
  parseJsonInput,
  parseBooleanOrJsonInput
};
