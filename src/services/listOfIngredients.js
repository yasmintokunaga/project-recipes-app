function getListOfIngredients(recipe) {
  const orderedIngredients = [];
  let i = 1;

  while (recipe[`strIngredient${i}`]) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    orderedIngredients.push({ ingredient, measure });
    i += 1;
  }

  return orderedIngredients;
}

export default getListOfIngredients;
