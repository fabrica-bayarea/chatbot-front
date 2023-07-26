import React from 'react';
import styled from 'styled-components';

import { InputGroup } from '../components';
import { MainButton } from '../components/styled';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    font-size: 2rem;
    margin-bottom: 60px;
  }

  a {
    align-self: center;
    font-size: 0.9rem;
    margin-bottom: 20px;
    width: fit-content;
  }

  label:last-of-type {
    margin-bottom: 40px;
  }
`;

function Login() {
  const handleSubmit = () => {};

  return (
    <main>
      <section>
        <LoginForm onSubmit={handleSubmit}>
          <h2>Login</h2>
          <InputGroup
            type='email'
            label='E-mail'
            name='email'
            placeholder='Digite seu e-mail...'
          />
          <InputGroup
            type='password'
            label='Senha'
            name='password'
            placeholder='Digite sua senha...'
          />
          <MainButton type='submit'>Entrar</MainButton>
          <a href=''>Esqueci minha senha</a>
          <MainButton type='submit'>Registro</MainButton>
        </LoginForm>
      </section>
    </main>
  );
}

export default Login;
