import db from './db';

function fakeRequest(callbackFn) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const isSuccess = Math.random() < 0.9;

      if (isSuccess) {
        const result = await callbackFn();
        resolve(result);
      } else {
        reject({ message: 'Request failed.' });
      }
    }, 3000);
  });
}

const fakeApi = {
  async login({ body }) {
    return fakeRequest(async () => {
      const user = await db.users.get({ email: body.email });

      if (!user) {
        return { status: 404, data: { message: 'E-mail não cadastrado.' } };
      } else if (user.password !== body.password) {
        return { status: 409, data: { message: 'Senha inválida.' } };
      }

      delete user.password;
      return { status: 200, data: user };
    });
  },

  async createUser({ body }) {
    return fakeRequest(async () => {
      const user = await db.users.get({ email: body.email });

      if (user) {
        return { status: 404, data: { message: 'E-mail já cadastrado.' } };
      }

      const newUser = {
        email: body.email,
        name: body.name,
        password: body.password,
      };

      await db.users.add(newUser);

      return { status: 201, data: newUser };
    });
  },
};

export default fakeApi;
