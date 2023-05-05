import React from 'react';
import { useHistory } from 'react-router-dom';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import profileIcon from '../images/profileIcon.svg';

export default function Profile() {
  const history = useHistory();
  return (
    <div>
      <h1>PROFILE</h1>
      <img src={ profileIcon } alt="search icon" />
      <label htmlFor="email">
        Email
        <input
          type="email"
          data-testid="profile-email"
        />
      </label>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        <img src={ whiteHeartIcon } alt="search icon" />
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
    </div>
  );
}
