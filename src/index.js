/**
 * 
 * @param {string} inputName The name of the input to fetch.
 * @param {type} types The type to test the input against.
 * @returns {any} Parsed value it passes the types list, otherwise null.
 */
function tryParse(inputName, ...types) {
  for (const type of types) {
      switch (type.toLowerCase()) {
          case 'number':
              const number = parseFloat(input);
              if (!isNaN(number)) return number;
              break;
          case 'boolean':
              const lowerInput = input.toLowerCase();
              if (lowerInput === 'true') return true;
              if (lowerInput === 'false') return false;
              break;
          case 'date':
              const date = new Date(input);
              if (!isNaN(date.getTime())) return date;
              break;
          case 'json':
              try {
                  return JSON.parse(input);
              } catch {
                  // Invalid JSON
              }
              break;
          default:
              console.warn(`Unsupported type: ${type}`);
      }
  }
  return null;
}

module.exports = {
  tryParse
};
