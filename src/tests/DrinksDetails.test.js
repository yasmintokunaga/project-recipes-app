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
    await waitFor(() => {
      expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    });
    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    
    userEvent.click(btnDrinks);
    const linkGG = await screen.findByText(/gg/i)
    expect(linkGG).toBeInTheDocument();
    userEvent.click(linkGG);
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
    expect(screen.getByTestId('0-ingredient-step')).toHaveStyle('textDecoration: line-through solid rgb(0, 0, 0)')
    userEvent.click(checkbox[0]);
    expect(screen.getByTestId('0-ingredient-step')).not.toHaveStyle('textDecoration: line-through solid rgb(0, 0, 0)')
    const btnFinish = screen.getByRole('button', { name: /finish recipe/i });
    userEvent.click(btnFinish);
    const xablau = [{
      id: '5120',
      type: 'drink',
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
    const btns = screen.getAllByRole('button');
    expect(btns).toHaveLength(4)
    const allBtn = screen.getByTestId('filter-by-all-btn')
    const mealBtn = screen.getByTestId('filter-by-meal-btn')
    const drinkBtn = screen.getByTestId('filter-by-drink-btn')
    userEvent.click(allBtn)
    userEvent.click(mealBtn)
    userEvent.click(drinkBtn)
    const shareBtn = screen.getByTestId('0-horizontal-share-btn')
    userEvent.click(shareBtn);
    await waitFor(() => {
      expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
    });
  });
});
