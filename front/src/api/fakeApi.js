import axios from 'axios';

import db from './db';

axios.defaults.baseURL = 'http://localhost:3001';

function fakeRequest(successFn) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(async () => {
      const isSuccess = Math.random() < 0.9;
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
  async login({ body: { email, password } }) {
    const successFn = async () => {
      const user = await db.users.get({ email });
      if (!user) {
        return { status: 404, data: { message: 'E-mail não cadastrado.' } };
      } else if (user.password !== password) {
        return { status: 409, data: { message: 'Senha inválida.' } };
      }
      delete user.password;
      return { status: 200, data: user };
    };

    return fakeRequest(successFn);
  },

  async createUser({ body: { email, name, password } }) {
    const successFn = async () => {
      const user = await db.users.get({ email });
      if (user) {
        return { status: 404, data: { message: 'E-mail já cadastrado.' } };
      }
      const userId = await db.users.add({ email, name, password });
      return { status: 201, data: userId };
    };

    return fakeRequest(successFn);
  },

  async fetchConversation({ id }) {
    const successFn = async () => {
      const conversation = await db.conversations.get(id);
      if (!conversation) {
        return { status: 404, data: { message: 'Histórico não encontrado.' } };
      }
      return { status: 200, data: conversation };
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
      return { status: 200, data: { conversationId, messages: messagesWithReply } };
    };

    return fakeRequest(successFn);
  },
};

export default fakeApi;
