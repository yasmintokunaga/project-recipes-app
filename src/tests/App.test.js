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
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockCypress);
  });
  xtest('Verifica se é possível digitar nos campos email e senha, após isso, clicar no button "Enviar". Espera que a rota mude para "/meals".', async () => {
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
    expect(history.location.pathname).toBe('/meals');
  });
  xtest('Verifica a funcionalidade da rota "/meals".', async () => {
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
    expect(btnsElements).toHaveLength(8);
    userEvent.click(btnsElements[0]);
    const textBeef = await screen.findByText(/beef and mustard pie/i);
    expect(textBeef).toBeInTheDocument();

    userEvent.click(btnsElements[5]);
    const textCorba = await screen.findByText(/corba/i);
    expect(textCorba).toBeInTheDocument();

    userEvent.click(btnsElements[7]);
    const textGg = await screen.findByText(/Gg/i);
    expect(textGg).toBeInTheDocument();

    userEvent.click(btnsElements[6]);
    const textG = await screen.findByText(/corba/i);
    expect(textG).toBeInTheDocument();
  });
  xtest('Verifica a funcionalidade da rota "/meals".', async () => {
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
    expect(btnsElements).toHaveLength(8);

    userEvent.click(btnsElements[7]);
    const btnOrdinaryDrink = await screen.findByRole('button', { name: /ordinary drink/i });
    expect(btnOrdinaryDrink).toBeInTheDocument();

    userEvent.click(btnOrdinaryDrink);

    const textGone = await screen.findByText(/410 gone/i);
    expect(textGone).toBeInTheDocument();
    userEvent.click(btnsElements[5]);
    userEvent.click(btnsElements[6]);
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
  test('Verifica a funcionalidade da rota "/profile".', async () => {
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

    userEvent.type(emailElement, 'trybe@teste.com');
    userEvent.type(passwordElement, '1234567');

    userEvent.click(btnElement);

    expect(await screen.findByRole('button', { name: /beef/i })).toBeInTheDocument();

    const email = await screen.findByText('trybe@teste.com');
    expect(email).toBeInTheDocument();
  });
});
