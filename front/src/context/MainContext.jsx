import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const MainContext = createContext();

export function MainProvider({ children }) {
  const shared = {};

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContext;
