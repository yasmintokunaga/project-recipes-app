import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';

export const LoginContext = createContext();

function LoginProvider({ children }) {
  const obj = { email: '', password: '', magicNumber: 6 };
  const [login, setLogin] = useState(obj);

  const values = useMemo(() => ({
    login,
    setLogin,
  }), [login, setLogin]);

  return (
    <LoginContext.Provider value={ values }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
