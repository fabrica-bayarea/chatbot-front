import users from './mock/usersMock.json';

function fakeRequest(callbackFn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() < 0.9;

      if (isSuccess) {
        const result = callbackFn();
        resolve(result);
      } else {
        reject({ message: 'Request failed' });
      }
    }, 3000);
  });
}

const fakeApi = {
  async login(body) {
    return fakeRequest(() => {
      const user = users.find((element) => element.email === body.email);

      if (!user) {
        return { message: 'Usuário não encontrado' };
      } else if (user.password !== body.password) {
        return { message: 'Senha inválida' };
      }

      return { ...user };
    });
  },
};

export default fakeApi;
