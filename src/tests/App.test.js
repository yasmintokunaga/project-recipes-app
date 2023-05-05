import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import LoginProvider from '../context/LoginProvider';

describe('Verificando a funcionalidade da página Login', () => {
  test('Farewell, front-end', () => {
    render(
      <BrowserRouter>
        <LoginProvider>
          <App />
        </LoginProvider>
      </BrowserRouter>,
    );
    const emailElement = screen.getByTestId('email-input');
    const passwordElement = screen.getByTestId('password-input');
    const btnElement = screen.getByTestId('login-submit-btn');

    userEvent.type(emailElement, 'teste@teste.com');
    userEvent.type(passwordElement, '1234567');

    userEvent.click(btnElement);
  });
});
