import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import copy from 'clipboard-copy';
import App from '../App';
import LoginProvider from '../context/LoginProvider';
import RecipesProvider from '../context/RecipesProvider';
import mockCypress from '../../cypress/mocks/fetch';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';
jest.mock('clipboard-copy');
describe('Verificando a funcionalidade da página Profile', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockCypress);
    copy.mockImplementation(() => {});
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

    const linkCorba = await screen.findByText(/corba/i);

    userEvent.click(linkCorba);
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
    const btnFavorite = await screen.findByRole('button', { name: /favoritar/i });
    const btnStart = await screen.findByRole('button', { name: /start recipe/i });
    const btnShare = await screen.findByTestId('share-btn');
    expect(btnFavorite).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();

    userEvent.click(btnShare);

    expect(copy).toBeCalled();

    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
    userEvent.click(btnStart);

    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
    const checkbox = screen.getAllByRole('checkbox');
    userEvent.click(checkbox[0]);
    expect(screen.getByTestId('0-ingredient-step')).toHaveStyle('textDecoration: line-through solid rgb(0, 0, 0)');
    userEvent.click(checkbox[0]);
    expect(screen.getByTestId('0-ingredient-step')).not.toHaveStyle('textDecoration: line-through solid rgb(0, 0, 0)');
    const btnFinish = screen.getByRole('button', { name: /finish recipe/i });
    userEvent.click(btnFinish);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
