import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileLogo from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, searchBool }) {
  const history = useHistory();
  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileLogo }
        onClick={ () => history.push('/profile') }
      >
        <img
          src={ profileLogo }
          alt="clique para ir ao perfil"
        />
      </button>
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
