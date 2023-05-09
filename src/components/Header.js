import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import profileLogo from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, searchBool }) {
  // const history = useHistory();

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
      {searchBool && <img
        src={ searchIcon }
        alt="icone para realizar pesquisa"
        data-testid="search-top-btn"
      />}
      {title !== '' && <h1 data-testid="page-title">{title}</h1>}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchBool: PropTypes.bool.isRequired,
};

export default Header;
