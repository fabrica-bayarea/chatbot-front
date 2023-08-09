import axios from 'axios';

import db from './db';
import { statusCodes } from '../utils';

axios.defaults.baseURL = 'http://localhost:3001';

function fakeRequest(successFn) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(async () => {
      const isSuccess = Math.random() < 0.99;
      if (isSuccess) {
        const result = await successFn();
        resolve(result);
      } else {
        reject({ message: 'Request failed.' });
      }
    }, 3000);
  });

  return promise;
}

const fakeApi = {
  async createUser({ body: { email, name, password } }) {
    const successFn = async () => {
      const user = await db.users.get({ email });
      if (user) {
        return {
          status: statusCodes.NOT_FOUND,
          data: { message: 'E-mail já cadastrado.' },
        };
      }
      const userId = await db.users.add({ email, name, password });
      return { status: 201, data: userId };
    };

    return fakeRequest(successFn);
  },

  async deleteConversation({ id }) {
    const successFn = async () => {
      await db.conversations.delete(id);
      return { status: statusCodes.OK, data: true };
    };

    return fakeRequest(successFn);
  },

  async fetchHistory({ userId }) {
    const successFn = async () => {
      const history = await db.conversations.where({ user_id: userId }).toArray();
      if (!history) {
        return { status: statusCodes.NOT_FOUND, data: { message: 'Sem registros.' } };
      }
      return { status: statusCodes.OK, data: history };
    };

    return fakeRequest(successFn);
  },

  async fetchReply({ body }) {
    let { conversationId } = body;
    const { data } = await axios.post('/chatbot', { messages: body.messages });
    const time = new Date().getTime();
    const messagesWithReply = [...body.messages, { ...data.message, time }];

    const newConversation = {
      user_id: body.userId,
      messages: messagesWithReply,
    };

    const successFn = async () => {
      if (!conversationId) {
        conversationId = await db.conversations.add(newConversation);
      } else {
        await db.conversations.update(conversationId, newConversation);
      }
      return {
        status: statusCodes.OK,
        data: { conversationId, messages: messagesWithReply },
      };
    };

    return fakeRequest(successFn);
  },

  async login({ body: { email, password } }) {
    const successFn = async () => {
      const user = await db.users.get({ email });
      if (!user) {
        return {
          status: statusCodes.NOT_FOUND,
          data: { message: 'E-mail não cadastrado.' },
        };
      } else if (user.password !== password) {
        return { status: statusCodes.CONFLICT, data: { message: 'Senha inválida.' } };
      }
      delete user.password;
      return { status: statusCodes.OK, data: user };
    };

    return fakeRequest(successFn);
  },
};

export default fakeApi;
