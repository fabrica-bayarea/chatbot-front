import React, { useContext, useEffect, useRef } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';

import { IconButton, Form, MessageInput } from '../components/styled';
import { ChatContext } from '../context';

const Container = styled.div`
  padding: 0;
  position: relative;
  width: 100%;
`;

const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 30px;
  height: 400px;
  overflow-y: scroll;
  padding-right: 10px;
`;

const Message = styled.span`
  --r: 5px;

  font-size: 0.9rem;
  line-height: 20px;
  padding: 10px;
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
        bottom: 5px;
        color: var(--clr-light);
        display: flex;
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
`;

const SendButton = styled(IconButton)`
  bottom: 0;
  position: absolute;
  right: -65px;
`;

function Chat() {
  const { messages, getReply } = useContext(ChatContext);
  const inputRef = useRef();
  const loadingRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = inputRef.current.value;
    inputRef.current.value = '';
    await getReply(content);
  };

  useEffect(() => {
    loadingRef.current.scrollIntoView();
  }, [messages]);

  return (
    <Container>
      <Conversation>
        <Message $role='assistant'>Eu sou Eda, assistente virtual.</Message>
        <Message $role='assistant'>Como posso lhe ajudar hoje?</Message>
        {messages.map((message, index) => (
          <Message key={index} $role={message.role}>
            {message.content}
          </Message>
        ))}
        <span ref={loadingRef}></span>
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
