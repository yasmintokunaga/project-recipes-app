import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import searchIcon from '../images/searchIcon.svg';
import { fetchRecipeByType } from '../services/fetchRecipiesByCategory';

function SearchBar() {
  const [open, setOpen] = useState(false);
  const [radioV, setRadioV] = useState('');
  const [parameter, setParameter] = useState('');
  const [items, setItems] = useState([]);
  const history = useHistory();

  const path = window.location.pathname;

  async function handleClickExec() {
    if (radioV === 'ing') {
      await fetchRecipeByType('i', parameter, 'filter', path.slice(1)).then((item) => {
        setItems(item);
      });
    } else if (radioV === 'name') {
      await fetchRecipeByType('s', parameter, 'search', path.slice(1)).then((item) => {
        setItems(item);
      });
    } else if (radioV === 'fl') {
      if (parameter.length === 1) {
        await fetchRecipeByType('f', parameter, 'search', path.slice(1)).then((item) => {
          setItems(item);
        });
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  }

  useEffect(() => {
    if (items.length === 1) {
      const id = path === '/meals'
        ? `${path}/${items[0].idMeal}` : `${path}/${items[0].idDrink}`;

      history.push(`${id}`);
    }
  }, [items, history, path]);

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
          <input
            type="text"
            data-testid="search-input"
            onChange={ (e) => {
              setParameter(e.target.value);
            } }
          />
          <div>
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              id="ingredient-radio"
              onClick={ () => {
                setRadioV('ing');
              } }
            />
            <label htmlFor="ingredient-radio">ingredient</label>

            <input
              type="radio"
              data-testid="name-search-radio"
              id="name-radio"
              onClick={ () => {
                setRadioV('name');
              } }
            />
            <label htmlFor="name-radio">name</label>

            <input
              type="radio"
              data-testid="first-letter-search-radio"
              id="first-leter-radio"
              onClick={ () => {
                setRadioV('fl');
              } }
            />
            <label htmlFor="first-leter-radio">first-letter</label>

            <button
              data-testid="exec-search-btn"
              onClick={ () => {
                handleClickExec();
              } }
            >
              Search
            </button>
          </div>
        </div>
      ) }
    </div>
  );
}

export default SearchBar;
