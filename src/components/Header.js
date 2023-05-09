import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import profileLogo from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, searchBool }) {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <Link
        to="/profile"
      >
        <img
          src={ profileLogo }
          alt="clique para ir ao perfil"
          data-testid="profile-top-btn"
          // data-testid="profile-top-btn"
        />
      </Link>
      {searchBool && (
        <div>
          <button onClick={ () => (!open ? setOpen(true) : setOpen(false)) }>
            <img
              src={ searchIcon }
              alt="icone para realizar pesquisa"
              data-testid="search-top-btn"
            />
          </button>
          { open && <input type="text" data-testid="search-input" /> }
        </div>
      )}
      {title !== '' && <h1 data-testid="page-title">{title}</h1>}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchBool: PropTypes.bool.isRequired,
};

export default Header;
