import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import copy from 'clipboard-copy';
import App from '../App';
import LoginProvider from '../context/LoginProvider';
import RecipesProvider from '../context/RecipesProvider';
import mockCypress from '../../cypress/mocks/fetch';

const array = [
  {
    alcoholicOrNot: 'Optional alcohol',
    category: 'Ordinary Drink',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    nationality: '',
    type: 'drink',
  },
  {
    alcoholicOrNot: '',
    category: 'Side',
    id: '522977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    name: 'Corba',
    nationality: 'Turkish',
    type: 'meal',
  },
];
jest.mock('clipboard-copy');
describe('Verificando a funcionalidade da página Favorites', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockCypress);
    copy.mockImplementation(() => {});
  });
  test('Verifica a funcionalidade da rota "/favorite-recipes".', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(array));
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
    act(() => {
      history.push('/favorite-recipes');
    });
    await waitFor(() => {
      expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    await waitFor(() => {
      expect(screen.getAllByRole('button')).toHaveLength(6);
      expect(screen.queryByText(/corba/i)).not.toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    await waitFor(() => {
      expect(screen.getAllByRole('button')).toHaveLength(6);
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId('filter-by-all-btn'));
    await waitFor(() => {
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
      expect(screen.getByText(/gg/i)).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    await waitFor(() => {
      expect(screen.getAllByText(/link copied!/i)).toHaveLength(2);
    });
    userEvent.click(screen.getByTestId('1-horizontal-favorite-btn'));
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(1);
  });
});
