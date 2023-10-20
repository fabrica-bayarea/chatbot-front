import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import api from '../api';
import { statusCodes } from '../utils';

const MainContext = createContext();

export function MainProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  // Generic function that prepares a request.
  // If successful, execute the passed function, otherwise show an error message.
  const makeRequest = useCallback(async (apiRequest, payload, successCode, successFn) => {
    setIsLoading(true);

    try {
      const { status, data } = await apiRequest({ ...payload });
      if (status === successCode) {
        await successFn(data);
        return [true, data];
      }
      return [false, data];
    } catch (error) {
      return [false, error];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Request functions
  const login = useCallback(
    async (body) => {
      const successFn = (data) => {
        const expirationTime = new Date().getTime() + 60 * 60 * 1000;
        const dataWithExpiration = { ...data, expirationTime };
        localStorage.setItem('user', JSON.stringify(dataWithExpiration));
        setUser(data);
      };

      return makeRequest(api.login, { body }, statusCodes.OK, successFn);
    },
    [makeRequest]
  );

  const register = useCallback(
    async (body) => {
      const successFn = async () => login(body);
      return makeRequest(api.createUser, { body }, statusCodes.CREATED, successFn);
    },
    [login, makeRequest]
  );

  // Other functions
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const shared = { isLoading, user, login, logout, makeRequest, register };

  // If the last login has expired, log out
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const currentTime = new Date().getTime();

    if (localUser && currentTime > localUser.expirationTime) {
      logout();
    }
  }, []);

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContext;
