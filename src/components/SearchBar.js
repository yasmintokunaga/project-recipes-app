import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import searchIcon from '../images/searchIcon.svg';
import { RecipesContext } from '../context/RecipesProvider';
import { fetchRecipeByType } from '../services/fetchRecipiesByCategory';

function SearchBar() {
  const [open, setOpen] = useState(false);
  const [radioV, setRadioV] = useState('');
  const [parameter, setParameter] = useState('');
  const { path, setListRecipes } = useContext(RecipesContext);
  const history = useHistory();

  const check = (arr) => {
    if (arr) {
      if (arr.length === 1) {
        const id = path === '/meals'
          ? `${path}/${arr[0].idMeal}` : `${path}/${arr[0].idDrink}`;
        history.push(`${id}`);
      }
      const finalNUmber = 12;
      return setListRecipes(arr.slice(0, finalNUmber));
    }
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  async function handleClickExec(radio, param) {
    if (radio === 'fl') {
      if (param.length === 1) {
        await fetchRecipeByType('f', param, 'search', path.slice(1)).then((ite) => {
          check(ite);
        });
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
      return;
    }
    switch (radio) {
    case 'ing':
      await fetchRecipeByType('i', param, 'filter', path.slice(1)).then((item) => {
        check(item);
      });
      break;
    default:
      await fetchRecipeByType('s', param, 'search', path.slice(1)).then((item) => {
        check(item);
      });
      break;
    }
  }

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
                handleClickExec(radioV, parameter);
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
