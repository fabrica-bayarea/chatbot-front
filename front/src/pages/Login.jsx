import React, { useContext, useEffect, useState } from 'react';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

import { InputGroup } from '../components';
import { MainButton } from '../components/styled';
import { MainContext } from '../context';
import { useValidation } from '../hooks';
import { reduceInputs } from '../utils';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > h2 {
    font-size: 2rem;
    margin-bottom: 60px;
  }

  & > div {
    color: red;
    font-size: 0.9rem;
    height: 50px;

    svg {
      margin-right: 10px;
    }
  }

  & > a {
    align-self: center;
    font-size: 0.9rem;
    margin-bottom: 20px;
    width: fit-content;
  }
`;

const initialInputs = {
  email: ['', 'required'],
  password: ['', 'required'],
};

function Login() {
  const { isLoading, login } = useContext(MainContext);
  const [inputs, setInputs] = useState(initialInputs);
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();
  const [isValid, validationMessage] = useValidation(inputs);

  // Input handler
  const handleChange = ({ target: { name, value } }) => {
    const newValues = { ...inputs };
    newValues[name][0] = value;
    setInputs(newValues);
  };

  // Log in
  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = reduceInputs(inputs);
    const [success, data] = await login(body);

    if (success) {
      navigate('/');
    } else {
      setStatusMessage(data.message);
    }
  };

  useEffect(() => {
    setStatusMessage(validationMessage);
  }, [validationMessage]);

  return (
    <main>
      <section>
        <LoginForm onSubmit={handleSubmit}>
          <h2>Login</h2>
          <InputGroup
            type='email'
            label='E-mail *'
            name='email'
            onChange={handleChange}
            placeholder='Digite seu e-mail...'
          />
          <InputGroup
            type='password'
            label='Senha *'
            name='password'
            onChange={handleChange}
            placeholder='Digite sua senha...'
          />
          <div>
            {statusMessage && (
              <span>
                <FontAwesomeIcon icon={faTriangleExclamation} />
                {statusMessage}
              </span>
            )}
          </div>
          <MainButton type='submit' disabled={isLoading || !isValid}>
            {isLoading ? <BeatLoader size={8} /> : 'Entrar'}
          </MainButton>
          <a href=''>Esqueci minha senha</a>
          <MainButton type='button' onClick={() => navigate('/registro')}>
            Registro
          </MainButton>
        </LoginForm>
      </section>
    </main>
  );
}

export default Login;
