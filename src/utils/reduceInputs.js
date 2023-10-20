// Receives an object with a predefined structure and returns another 
// object in the format key: value

function reduceInputs(inputs) {
  const keys = Object.keys(inputs);
  return keys.reduce((inputValues, key) => {
    inputValues[key] = inputs[key][0];
    return inputValues;
  }, {});
}

export default reduceInputs;
