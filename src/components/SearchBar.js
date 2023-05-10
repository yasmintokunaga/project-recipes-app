import { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={ () => (!open ? setOpen(true) : setOpen(false)) }>
        <img
          src={ searchIcon }
          alt="icone para realizar pesquisa"
          data-testid="search-top-btn"
        />
      </button>
      { open && (
        <div>
          <input type="text" data-testid="search-input" />
          <div>
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              id="ingredient-radio"
            />
            <label htmlFor="ingredient-radio">ingredient</label>

            <input
              type="radio"
              data-testid="name-search-radio"
              id="name-radio"
            />
            <label htmlFor="name-radio">name</label>

            <input
              type="radio"
              data-testid="first-letter-search-radio"
              id="first-leter-radio"
            />
            <label htmlFor="first-leter-radio">first-letter</label>

            <button data-testid="exec-search-btn">Search</button>
          </div>
        </div>
      ) }
    </div>
  );
}

export default SearchBar;
