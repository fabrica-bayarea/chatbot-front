import React, { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import MainContext from './MainContext';
import api from '../api';
import { statusCodes } from '../utils';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const { makeRequest, user } = useContext(MainContext);
  const [conversationId, setConversationId] = useState(undefined);
  const [messages, setMessages] = useState([]);

  // Request functions
  const getReply = useCallback(
    async (content) => {
      const newMessages = messages.concat({
        role: 'user',
        content,
        time: new Date().getTime(),
      });

      setMessages(newMessages);
      const body = { conversationId, userId: user.id, messages: newMessages };

      const successFn = (data) => {
        if (!conversationId) {
          setConversationId(data.conversationId);
        }
        setMessages(data.messages);
      };

      return makeRequest(api.fetchReply, { body }, statusCodes.OK, successFn);
    },
    [conversationId, makeRequest, messages, user?.id]
  );

  const shared = { messages, getReply };

  return <ChatContext.Provider value={{ ...shared }}>{children}</ChatContext.Provider>;
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChatContext;
