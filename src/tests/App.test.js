import React from 'react';
import createMemoryHistory from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import App from '../App';
import LoginProvider from '../context/LoginProvider';
import RecipesProvider from '../context/RecipesProvider';

describe('Verificando a funcionalidade da página Login', () => {
  test('Farewell, front-end', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <LoginProvider>
          <RecipesProvider>
            <App />
          </RecipesProvider>
        </LoginProvider>
      </Router>,
    );
    // const emailElement = screen.getByTestId('email-input');
    // const passwordElement = screen.getByTestId('password-input');
    // const btnElement = screen.getByTestId('login-submit-btn');

    // userEvent.type(emailElement, 'teste@teste.com');
    // userEvent.type(passwordElement, '1234567');

    // userEvent.click(btnElement);
    const btnsElement = screen.getByRole('button');
    userEvent.type(btnsElement, 'teste@teste.com');
    userEvent.type(btnsElement, '1234567');
    userEvent.click(btnsElement);
  });
});
