import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const MainContext = createContext();

export function MainProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = (data) => {
    const expirationTime = new Date().getTime() + 60 * 60 * 1000;
    const dataWithExpiration = { ...data, expirationTime };
    localStorage.setItem('user', JSON.stringify(dataWithExpiration));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const shared = { login, logout, user, setUser };

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
