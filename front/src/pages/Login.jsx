import React, { useContext, useEffect, useState } from 'react';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';

import { MainButton, Form, Main, Section } from '../components/styled';
import { InputGroup, Logo } from '../components';
import { MainContext } from '../context';
import { useValidation } from '../hooks';
import { reduceInputs } from '../utils';

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
    <Main>
      <Logo />
      <Section>
        <header>
          <h2>Login</h2>
        </header>
        <div>
          <Form onSubmit={handleSubmit}>
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
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  {statusMessage}
                </span>
              )}
            </div>
            <MainButton type='submit' disabled={isLoading || !isValid}>
              {isLoading ? <BeatLoader color='blue' size={8} /> : 'Entrar'}
            </MainButton>
          </Form>
          <a href='' style={{ textDecoration: 'line-through' }}>
            Esqueci minha senha
          </a>
          <MainButton type='button' onClick={() => navigate('/registro')}>
            Registro
          </MainButton>
        </div>
      </Section>
    </Main>
  );
}

export default Login;
