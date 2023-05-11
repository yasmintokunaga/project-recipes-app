import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function StartRecipeButton() {
  const [InProgress, setInProgress] = useState(false);
  const [DoneRecipes, setDoneRecipes] = useState(false);
  const idPath = window.location.pathname.split('/')[2];
  const typePath = window.location.pathname.split('/')[1];
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
      console.log(Object.keys(inProgressRecipe[idPath]));
      const isInProgress = Object.keys(inProgressRecipe[idPath])
        .some((id) => id === idPath);
      setInProgress(isInProgress);
    }
  }, [idPath]);

  useEffect(() => {
    const wasDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const MadeRecipes = wasDoneRecipes
      .some((done) => done.id === idPath);
    setDoneRecipes(MadeRecipes);
  }, [idPath]);

  if (!DoneRecipes) {
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: 0 } }
        onClick={ () => history.push(`/${typePath}/${idPath}/in-progress`) }
        src={ InProgress ? 'Continue Recipe' : 'Start Recipe' }
      >
        {InProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    );
  } return null;
}
export default StartRecipeButton;
