import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import copy from 'clipboard-copy';
import App from '../App';
import LoginProvider from '../context/LoginProvider';
import RecipesProvider from '../context/RecipesProvider';
import mockCypress from '../../cypress/mocks/fetch';

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH_BTN = 'exec-search-btn';
jest.mock('clipboard-copy');
describe('Verificando a funcionalidade da página Profile', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockCypress);
    copy.mockImplementation(() => {});
    jest.spyOn(global, 'alert').mockImplementation(() => {});
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

    const emailElement = screen.getByTestId('email-input');
    const passwordElement = screen.getByTestId('password-input');
    const btnElement = screen.getByTestId('login-submit-btn');

    userEvent.type(emailElement, 'trybe@teste.com');
    userEvent.type(passwordElement, '1234567');
    userEvent.click(btnElement);
    await waitFor(() => {
      expect(screen.getByTestId(SEARCH_TOP_BTN)).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));

    await waitFor(() => {
      expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'a');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));

    await waitFor(() => {
      expect(screen.getByText(/apple frangipan tart/i)).toBeInTheDocument();
    });
    userEvent.clear(screen.getByTestId(SEARCH_INPUT));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'chicken');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
    await waitFor(() => {
      expect(screen.getByText(/brown stew chicken/i)).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    await waitFor(() => {
      expect(screen.queryByTestId(SEARCH_INPUT)).not.toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.clear(screen.getByTestId(SEARCH_INPUT));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'chicken');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
    expect(global.alert).toBeCalled();
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

    const emailElement = screen.getByTestId('email-input');
    const passwordElement = screen.getByTestId('password-input');
    const btnElement = screen.getByTestId('login-submit-btn');

    userEvent.type(emailElement, 'trybe@teste.com');
    userEvent.type(passwordElement, '1234567');
    userEvent.click(btnElement);
    await waitFor(() => {
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
    });

    userEvent.click(screen.getByText(/corba/i));

    await waitFor(() => {
      expect(screen.getByText(/start recipe/i)).toBeInTheDocument();
    });
    // /meals/52977/in-progress
    userEvent.click(screen.getByText(/start recipe/i));
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: { 52977: ['Lentils'] } }));
    await waitFor(() => {
      expect(screen.getByText(/ingredientes/i)).toBeInTheDocument();
    });
    const checkboxs = await screen.findAllByRole('checkbox');
    userEvent.click(checkboxs[0]);
    history.push('/meals');
    userEvent.click(await screen.findByText(/corba/i));
    userEvent.click(await screen.findByText(/continue recipe/i));
    expect(await screen.findByText(/finish recipe/i)).toBeDisabled();
  });
});
