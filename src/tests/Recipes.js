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
  test('Verifica se é possível filtrar pelo button "Beef", remover o filtro, navegar para drinks e voltar para meals".', async () => {
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

    userEvent.type(emailElement, 'teste@teste.com');
    userEvent.type(passwordElement, '1234567');
    userEvent.click(btnElement);

    expect(history.location.pathname).toBe('/meals');
    expect(await screen.findByRole('button', { name: /beef/i })).toBeInTheDocument();
    const btnsElements = screen.getAllByRole('button');
    expect(btnsElements).toHaveLength(9);

    userEvent.click(btnsElements[0]);

    const textBeef = await screen.findByText(/beef and mustard pie/i);
    expect(textBeef).toBeInTheDocument();

    userEvent.click(btnsElements[5]);

    const textCorba = await screen.findByText(/corba/i);
    expect(textCorba).toBeInTheDocument();

    userEvent.click(btnsElements[8]);

    const textGg = await screen.findByText(/Gg/i);
    expect(textGg).toBeInTheDocument();

    userEvent.click(btnsElements[7]);

    const textG = await screen.findByText(/corba/i);
    expect(textG).toBeInTheDocument();
  });
});
