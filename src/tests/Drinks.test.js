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
describe('Verificando a funcionalidade da página Drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockCypress);
  });
  test('Verifica se é possível filtrar bebidas na página de drinks e retornar na página meals.', async () => {
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

    userEvent.type(emailElement, 'user@teste.com');
    userEvent.type(passwordElement, '1234567');
    userEvent.click(btnElement);

    expect(await screen.findByRole('button', { name: /beef/i })).toBeInTheDocument();
    const btnsElements = screen.getAllByRole('button');
    expect(btnsElements).toHaveLength(9);

    userEvent.click(btnsElements[8]);

    const btnOrdinaryDrink = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(btnOrdinaryDrink).toBeInTheDocument();

    userEvent.click(btnOrdinaryDrink);

    const textGone = await screen.findByText(/410 gone/i);
    expect(textGone).toBeInTheDocument();

    userEvent.click(btnsElements[5]);
    userEvent.click(btnsElements[7]);

    const textSushi = await screen.findByText(/kumpir/i);
    expect(textSushi).toBeInTheDocument();
    const btnBeef = await screen.findByRole('button', { name: /beef/i });

    userEvent.click(btnBeef);

    const textBeefPie = await screen.findByText(/beef and mustard pie/i);
    expect(textBeefPie).toBeInTheDocument();

    userEvent.click(btnBeef);

    const textTamiya = await screen.findByText(/dal fry/i);
    expect(textTamiya).toBeInTheDocument();
  });
});
