export async function fetchRecepiesByCategoryMeals(category) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.meals;
}

export async function fetchRecepiesByCategoryDrinks(category) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.drinks;
}

// type diz respeito ao tipo de filtragem, se é pelo ingrediente, nome ou primeira letra
// par é o que está efetivamente sendo filtrado, o parametro passado na barra de busca
// pointer é uma checagem que tem relação com um dos endereços que usa filter em um ponto e todos os outros são search
export async function fetchRecipeByType(type, par, pointer, consu) {
  const api = consu === 'drinks' ? `https://www.thecocktaildb.com/api/json/v1/1/${pointer}.php?${type}=${par}` : `https://www.themealdb.com/api/json/v1/1/${pointer}.php?${type}=${par}`;
  const response = await fetch(api);
  const data = await response.json();
  console.log(consu);
  return consu === 'drinks' ? data.drinks : data.meals;
}
