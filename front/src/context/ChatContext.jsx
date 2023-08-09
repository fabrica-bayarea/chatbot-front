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
  const [history, setHistory] = useState([]);

  // Request functions
  const deleteConversation = useCallback(
    async (id) => {
      const successFn = () => {
        setHistory(history.filter((conversation) => conversation.id !== id));
      };

      return makeRequest(api.deleteConversation, { id }, statusCodes.OK, successFn);
    },
    [history, makeRequest]
  );

  const getHistory = useCallback(async () => {
    const successFn = (data) => {
      const sortedData = data.sort((a, b) => {
        const timeA = a.messages[a.messages.length - 1].time;
        const timeB = b.messages[b.messages.length - 1].time;
        return timeB - timeA;
      });
      setHistory(sortedData);
    };

    return makeRequest(api.fetchHistory, { userId: user.id }, statusCodes.OK, successFn);
  }, [makeRequest, user?.id]);

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

  // Other functions
  const changeConversation = (id = undefined, messages = []) => {
    setConversationId(id);
    setMessages(messages);
  };

  const shared = {
    messages,
    history,
    setHistory,
    changeConversation,
    deleteConversation,
    getHistory,
    getReply,
  };

  return <ChatContext.Provider value={{ ...shared }}>{children}</ChatContext.Provider>;
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChatContext;
