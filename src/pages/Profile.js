import React from 'react';
import { useHistory } from 'react-router-dom';

import doneIcon from '../images/doneIcon.svg';
import logoutIcon from '../images/logoutIcon.svg';
import yellowHearthIcon from '../images/yellowHearthIcon.svg';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();

  const getLS = JSON.parse(localStorage.getItem('user'));

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" searchBool={ false } />
      <p data-testid="profile-email">{getLS.email}</p>
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
      <Footer />
    </div>
  );
}
