import { useEffect, useState } from 'react';

import { reduceInputs } from '../utils';

const validations = {
  email({ email }) {
    const REGEX = /\S+@\S+\.\S+/;

    if (!REGEX.test(email)) {
      return 'Formato de e-mail inválido.';
    }

    return true;
  },

  name({ name }) {
    if (name.length < 3) {
      return 'Nome deve conter no mínimo 3 caracteres.';
    }

    return true;
  },

  password({ password }) {
    if (password.length < 6) {
      return 'Senha deve conter no mínimo 6 caracteres.';
    }

    return true;
  },

  confirmation({ password, confirmation }) {
    if (password !== confirmation) {
      return 'Confirmação inválida.';
    }

    return true;
  },
};

function runValidations(inputValues) {
  for (let key in inputValues) {
    // If the input is not empty, do the validation.
    // If not valid, it returns false and an error message.
    if (inputValues[key][0]) {
      const validation = validations[key](inputValues);

      if (validation !== true) {
        return [false, validation];
      }
    }
  }

  // All non-empty entries are valid.
  // If any required input is empty, it will return false.
  const verification = ([value, isRequired]) => isRequired === 'required' && !value;

  if (Object.values(inputValues).some(verification)) {
    return [false, ''];
  }

  return [true, ''];
}

function useValidation(inputs) {
  const [validation, setValidation] = useState([false, '']);

  useEffect(() => {
    const inputValues = reduceInputs(inputs);
    setValidation(runValidations(inputValues));
  }, [inputs]);

  return validation;
}

export default useValidation;
