import React from 'react';
import styled from 'styled-components';

import { Input, MainButton } from '../components/styled';

const LoginForm = styled.form`
  flex-direction: column;

  h2 {
    font-size: 2rem;
    margin-bottom: 60px;
  }

  a {
    align-self: center;
    font-size: 0.9rem;
    margin: 10px 0 30px;
    width: fit-content;
  }

  input:last-of-type {
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
          <label>E-mail:</label>
          <Input type='email' placeholder='Digite seu e-mail...' />
          <label>Senha:</label>
          <Input type='password' placeholder='Digite sua senha...' />
          <MainButton type='submit'>Entrar</MainButton>
          <a href=''>Esqueci minha senha</a>
          <MainButton type='submit'>Registro</MainButton>
        </LoginForm>
      </section>
    </main>
  );
}

export default Login;
