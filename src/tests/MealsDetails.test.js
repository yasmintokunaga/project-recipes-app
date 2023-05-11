import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import App from '../App';
import LoginProvider from '../context/LoginProvider';
import RecipesProvider from '../context/RecipesProvider';
import mockCypress from '../../cypress/mocks/fetch';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';
// const PROFILE_TOP_BTN = 'profile-top-btn';
describe('Verificando a funcionalidade da página Profile', () => {
  beforeEach(() => {
    fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockCypress);
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
    await waitFor(() => {
      userEvent.type(emailElement, 'trybe@teste.com');
      userEvent.type(passwordElement, '1234567');
      userEvent.click(btnElement);
    });

    const linkCorba = await screen.findByText(/corba/i);
    await waitFor(() => {
      userEvent.click(linkCorba);
    });
    const btnFavorite = await screen.findByRole('button', { name: /favoritar/i });
    const btnShare = await screen.findByTestId('share-btn');
    expect(btnFavorite).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();
    // await waitFor(() => {
    //   userEvent.click(btnShare);
    // });
    // expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
  });
});
