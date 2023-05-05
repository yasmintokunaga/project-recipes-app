import React from 'react';
import { useHistory } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import doneIcon from '../images/doneIcon.svg';
import logoutIcon from '../images/logoutIcon.svg';
import yellowHearthIcon from '../images/yellowHearthIcon.svg';

export default function Profile() {
  const history = useHistory();

  const getLS = localStorage.getItem('user');

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <img src={ profileIcon } alt="profile icon" />
      <h1>PROFILE</h1>
      <p data-testid="profile-email">{getLS}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        <img src={ doneIcon } alt="done icon" />
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        <img src={ yellowHearthIcon } alt="heart icon" />
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClick }
      >
        <img src={ logoutIcon } alt="logout icon" />
        Logout
      </button>
    </div>
  );
}
