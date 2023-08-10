import React, { useContext, useEffect, useState } from 'react';
import { faChevronLeft, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';

import { IconButton, MainButton, Form, Main, Section } from '../components/styled';
import { InputGroup, Logo } from '../components';
import { MainContext } from '../context';
import { useValidation } from '../hooks';
import { reduceInputs } from '../utils';

const initialInputs = {
  email: ['', 'required'],
  name: ['', 'required'],
  password: ['', 'required'],
  confirmation: ['', 'required'],
};

function Register() {
  const { isLoading, register } = useContext(MainContext);
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

  // Register
  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = reduceInputs(inputs);
    const [success, data] = await register(body);

    if (success) {
      navigate('/login');
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
          <h2>Registro</h2>
          <IconButton type='button' onClick={() => navigate('/login')} $bg={'white'}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </IconButton>
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
              type='text'
              label='Primeiro nome *'
              name='name'
              onChange={handleChange}
              placeholder='Digite seu nome...'
            />
            <InputGroup
              type='password'
              label='Senha *'
              name='password'
              onChange={handleChange}
              placeholder='Digite uma senha...'
            />
            <InputGroup
              type='password'
              label='Confirmação de senha *'
              name='confirmation'
              onChange={handleChange}
              placeholder='Confirme sua senha...'
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
              {isLoading ? <BeatLoader color='blue' size={8} /> : 'Registrar'}
            </MainButton>
          </Form>
        </div>
      </Section>
    </Main>
  );
}

export default Register;
