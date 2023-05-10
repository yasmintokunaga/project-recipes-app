function StartRecipeButton() {
  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      style={ { position: 'fixed', bottom: 0 } }
    >
      Start Recipe
    </button>
  );
}

export default StartRecipeButton;
