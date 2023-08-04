import React, { useContext, useEffect, useRef, useState } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BeatLoader from 'react-spinners/BeatLoader';
import styled, { css } from 'styled-components';

import { IconButton, Form, MessageInput } from './styled';
import { ChatContext, MainContext } from '../context';

const Container = styled.div`
  padding: 0;
  position: relative;
  width: 100%;
`;

const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 400px;
  overflow-y: scroll;
  padding: 40px 10px 0 20px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-c);
  }

  & > div {
    margin: 0 20px 40px;
  }
`;

const Message = styled.span`
  --r: 4px;

  line-height: 20px;
  padding: 8px 16px;
  width: fit-content;

  ${(props) =>
    props.$role === 'assistant' &&
    css`
      background-color: var(--clr-light);
      border-radius: var(--r) var(--r) var(--r) 0;
      margin-left: 40px;
      position: relative;

      &::before {
        content: 'E';
        align-items: center;
        aspect-ratio: 1 / 1;
        background-color: var(--clr-a);
        border-radius: 50%;
        bottom: 0;
        color: var(--clr-light);
        display: flex;
        font-size: 0.8rem;
        font-weight: bold;
        height: 30px;
        justify-content: center;
        left: -40px;
        position: absolute;
      }
    `}

  ${(props) =>
    props.$role === 'user' &&
    css`
      align-self: flex-end;
      background-color: var(--clr-lighter-gray);
      border-radius: var(--r) var(--r) 0 var(--r);
    `}

    ${(props) =>
    props.$role === 'error' &&
    css`
      align-self: center;
      background-color: var(--clr-light-red);
      border-radius: var(--r);
      padding: 8px;
    `}
`;

const SendButton = styled(IconButton)`
  bottom: 20px;
  position: absolute;
  right: -30px;
`;

function Chat() {
  const { isLoading } = useContext(MainContext);
  const { messages, getReply } = useContext(ChatContext);
  const inputRef = useRef();
  const loadingRef = useRef();
  const [error, setError] = useState(false);

  // Requests a reply to update the conversation.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = inputRef.current.value;

    if (!content || isLoading) {
      return;
    }

    inputRef.current.value = '';
    const [success] = await getReply(content);

    if (success) {
      setError(false);
    } else {
      setError(true);
    }
  };

  // Keeps the last message always visible
  useEffect(() => {
    loadingRef.current.scrollIntoView();
  }, [messages]);

  return (
    <Container>
      <Conversation>
        <Message $role='assistant'>
          Eu sou Eda, assistente virtual.
          <br />
          Como posso lhe ajudar hoje?
        </Message>
        {messages.map((message, index) => (
          <Message key={index} $role={message.role}>
            {message.content}
          </Message>
        ))}
        {error && <Message $role='error'>Ooops... algo deu errado.</Message>}
        <div ref={loadingRef}>
          {isLoading && <BeatLoader color='lightgray' size={8} />}
        </div>
      </Conversation>
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
