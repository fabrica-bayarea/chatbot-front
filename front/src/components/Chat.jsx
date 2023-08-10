import React, { useContext, useEffect, useRef, useState } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

import { IconButton, Form, ChatInput, ChatMessage } from './styled';
import { ChatContext, MainContext } from '../context';
import { devices } from '../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  position: relative;
  width: 100%;
`;

const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 30px;
  overflow-y: scroll;
  padding: 40px 20px 0 40px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-c);
  }

  @media ${devices.mobileL} {
    padding: 40px 10px 0;
  }
`;

const Suggestions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Loading = styled.div`
  margin: 0 0 40px 40px;
`;

const SendButton = styled(IconButton)`
  bottom: 20px;
  height: 60px;
  position: absolute;
  right: -30px;

  @media ${devices.mobileL} {
    right: 10px;
  }
`;

function Chat() {
  const { messages, getReply } = useContext(ChatContext);
  const { isLoading } = useContext(MainContext);
  const inputRef = useRef();
  const loadingRef = useRef();
  const [error, setError] = useState(false);

  // Requests a reply to update the conversation
  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = inputRef.current.value;

    if (!content || isLoading) {
      return;
    }

    inputRef.current.value = '';
    setError(false);
    const [success] = await getReply(content);

    if (!success) {
      setError(true);
    }
  };

  // Render functions
  const renderMessages = () => {
    return messages.map((message, index) => (
      <ChatMessage key={index} $role={message.role}>
        {message.content}
      </ChatMessage>
    ));
  };

  const renderSuggestions = () => {
    const suggestions = [
      'Quais as cores da bandeira do Brasil?',
      'Como eu troco uma lampâda?',
      'Conte uma história emocionante!',
    ];

    return (
      <Suggestions>
        {suggestions.map((suggestion, index) => (
          <ChatMessage
            key={index}
            onClick={() => getReply(suggestion)}
            role='button'
            tabIndex='0'
            $role='suggestion'
          >
            {suggestion}
          </ChatMessage>
        ))}
      </Suggestions>
    );
  };

  // Keeps the last message always visible
  useEffect(() => {
    if (messages.length !== 0) {
      loadingRef.current.scrollIntoView();
    }
  }, [messages]);

  // Main render
  return (
    <Container>
      <Conversation>
        <ChatMessage $role='assistant'>
          Eu sou <strong>Eda</strong>, assistente virtual.
          <br />
          Selecione uma das perguntas frequentes abaixo ou faça uma você mesmo! Estou aqui
          para ajudar da melhor forma possível!
        </ChatMessage>
        {renderMessages()}
        {messages.length === 0 && renderSuggestions()}
        {error && <ChatMessage $role='error'>Ooops... algo deu errado.</ChatMessage>}
        <Loading ref={loadingRef}>
          {isLoading && <BeatLoader color='lightgray' size={8} />}
        </Loading>
      </Conversation>
      <Form onSubmit={handleSubmit}>
        <ChatInput type='text' ref={inputRef} placeholder='Digite uma mensagem...' />
        <SendButton type='submit' $bg='color'>
          <FontAwesomeIcon icon={faPaperPlane} />
        </SendButton>
      </Form>
    </Container>
  );
}

export default Chat;
