import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import App from '../App';
import LoginProvider from '../context/LoginProvider';
import RecipesProvider from '../context/RecipesProvider';
import mockCypress from '../../cypress/mocks/fetch';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';
describe('Verificando a funcionalidade da página Login', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockCypress);
  });
  test('Verifica se é possível digitar nos campos email e senha, após isso, clicar no button "Enviar". Espera que a rota mude para "/meals".', async () => {
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
    const emailElement = screen.getByTestId(EMAIL_INPUT);
    const passwordElement = screen.getByTestId(PASSWORD_INPUT);
    const btnElement = screen.getByTestId(LOGIN_SUBMIT_BTN);

    userEvent.type(emailElement, 'email@email.com');
    userEvent.type(passwordElement, '1234567');
    userEvent.click(btnElement);
    expect(await screen.findByRole('button', { name: /beef/i })).toBeInTheDocument();
    expect(history.location.pathname).toBe('/meals');
  });
});
