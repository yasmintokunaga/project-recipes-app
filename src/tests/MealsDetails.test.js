import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
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
    const INGREDIENT = '0-ingredient-step';
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
    await waitFor(() => {
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
    });

    userEvent.click(screen.getByText(/corba/i));

    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
    const btnFavorite = await screen.findByTestId('favorite-btn');
    const btnShare = await screen.findByTestId('share-btn');
    expect(btnFavorite).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();

    userEvent.click(btnShare);

    expect(copy).toBeCalled();

    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();

    const btnStart = await screen.findByTestId('start-recipe-btn');

    userEvent.click(btnStart);
    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
    const checkbox = await screen.findAllByRole('checkbox');
    userEvent.click(checkbox[0]);
    expect(screen.getByTestId(INGREDIENT)).toHaveStyle('textDecoration: line-through solid rgb(0, 0, 0)');
    userEvent.click(checkbox[0]);
    expect(screen.getByTestId(INGREDIENT)).not.toHaveStyle('textDecoration: line-through solid rgb(0, 0, 0)');
    userEvent.click(checkbox[0]);
    userEvent.click(checkbox[1]);
    userEvent.click(checkbox[2]);
    userEvent.click(checkbox[3]);
    userEvent.click(checkbox[4]);
    userEvent.click(checkbox[5]);
    userEvent.click(checkbox[6]);
    userEvent.click(checkbox[7]);
    userEvent.click(await screen.findByTestId('favorite-btn'));
    userEvent.click(await screen.findByTestId('share-btn'));

    const btnFinish = screen.getByRole('button', { name: /finish recipe/i });
    userEvent.click(btnFinish);
    const xablau = [{
      id: '5120',
      type: 'meals',
      nationality: 'nacionalidade-da-receita-ou-texto-vazio',
      category: 'categoria-da-receita-ou-texto-vazio',
      alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
      name: 'nome-da-receita',
      image: 'imagem-da-receita',
      doneDate: 'quando-a-receita-foi-concluida',
      tags: ['array-de-tags-da-receita-ou-array-vazio'],
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(xablau));
    expect(history.location.pathname).toBe('/done-recipes');
    const btns1 = screen.getAllByRole('button');
    expect(btns1).toHaveLength(5);
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(allBtn);
    userEvent.click(mealBtn);
    userEvent.click(drinkBtn);
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn);
    await waitFor(() => {
      expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
    });
  });
});
