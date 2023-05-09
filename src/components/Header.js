import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import profileLogo from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, searchBool }) {
  const history = useHistory();

  return (
    <header>
      <button
        onClick={ () => history.push('/profile') }
        data-testid="profile-top-btn"
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
