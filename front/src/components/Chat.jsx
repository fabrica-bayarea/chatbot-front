import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { Input, MainButton } from './styled';

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  height: 400px;
  overflow-y: scroll;
  padding: 20px;

  & > span {
    background-color: rgb(240 240 240);
    border-radius: 5px;
    margin: 4px 0;
    padding: 4px 10px;
    width: fit-content;

    &.user-message {
      align-self: flex-end;
      background-color: rgb(240 240 255);
    }
  }
`;

const MessageForm = styled.form`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

function Chat() {
  const inputRef = useRef();
  const [history, setHistory] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setHistory(history.concat(inputRef.current.value));
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  return (
    <section>
      <Messages>
        <span>Olá! 👋</span>
        <span>Como posso lhe ajudar hoje?</span>
        {history.map((text, index) => (
          <span className='user-message' key={index}>
            {text}
          </span>
        ))}
      </Messages>
      <MessageForm onSubmit={handleSubmit}>
        <Input type='text' ref={inputRef} placeholder='Digite uma mensagem...' />
        <MainButton type='submit'>Enviar</MainButton>
      </MessageForm>
    </section>
  );
}

export default Chat;
