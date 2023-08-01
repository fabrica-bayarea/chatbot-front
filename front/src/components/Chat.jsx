import React, { useRef, useState } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { IconButton, Form, MessageInput } from '../components/styled';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  height: 400px;
  overflow-y: scroll;
  padding-right: 10px;

  & > span {
    background-color: rgb(240 240 240);
    border-radius: 10px;
    margin: 4px 0;
    padding: 8px 10px;
    width: fit-content;

    &.user-message {
      align-self: flex-end;
      background-color: rgb(240 240 255);
    }
  }
`;

const SendButton = styled(IconButton)`
  bottom: 0;
  position: absolute;
  right: -65px;
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
    <Container>
      <Messages>
        <span>Eu sou o Chatbot.</span>
        <span>Como posso lhe ajudar hoje?</span>
        {history.map((text, index) => (
          <span className='user-message' key={index}>
            {text}
          </span>
        ))}
      </Messages>
      <Form onSubmit={handleSubmit}>
        <MessageInput type='text' ref={inputRef} placeholder='Digite uma mensagem...' />
        <SendButton type='submit' $height='60px' $mode='color'>
          <FontAwesomeIcon icon={faPaperPlane} />
        </SendButton>
      </Form>
    </Container>
  );
}

export default Chat;
