import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import profileLogo from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, searchBool }) {
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
        <SearchBar />
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
