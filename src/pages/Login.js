import PropTypes from 'prop-types';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginProvider';

function Login({ history }) {
  const { login, setLogin } = useContext(LoginContext);

  const isValid = login.email.includes('@')
    && login.email.includes('.com') && login.password.length > login.magicNumber;

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    history.push('/meals');
  };

  return (
    <div>
      <form>
        <label>
          <input
            type="text"
            data-testid="email-input"
            onChange={ (e) => setLogin({ ...login, email: e.target.value }) }
          />
        </label>
        <label>
          <input
            type="password"
            data-testid="password-input"
            onChange={ (e) => setLogin({ ...login, password: e.target.value }) }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !isValid }
          onClick={ handleClick }
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
