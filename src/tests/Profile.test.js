import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import LoginProvider from '../context/LoginProvider';
import renderWithRouter from '../helper/renderWithRouter';
import Profile from '../pages/Profile';

describe('Testa tela de Perfil', () => {
  it('Profile', () => {
    const { history } = renderWithRouter(
      <LoginProvider>
        <Profile />
      </LoginProvider>,
    );
    act(() => {
      history.push('/profile');
    });

    const getTextProfile = screen.getByRole('heading', { name: /profile/i });
    expect(getTextProfile).toBeDefined();

    const getBtns = screen.getAllByRole('button');
    expect(getBtns).toHaveLength(3);

    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(btnDoneRecipes).toBeDefined();

    userEvent.click(btnDoneRecipes);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');

    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    expect(btnFavoriteRecipes).toBeDefined();

    userEvent.click(btnFavoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');

    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(btnLogout).toBeDefined();

    userEvent.click(btnLogout);
    expect(history.location.pathname).toBe('/');
  });
});
