import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import App from '../App';
import LoginProvider from '../context/LoginProvider';
import RecipesProvider from '../context/RecipesProvider';
import { categoryData, recipesMealsData, categoryMealsData } from '../helper/Data';
// import mockCypress from '../../cypress/mocks/fetch.js';

// describe('Verificando a funcionalidade da página Login', () => {
//   beforeEach(() => {
//     jest.spyOn(global, 'fetch').mockResolvedValue({
//       json: async () => (categoryData),
//     }).mockResolvedValueOnce({
//       json: async () => (recipesMealsData),
//     }).mockResolvedValueOnce({
//       json: async () => (categoryMealsData),
//     });
//   });
//   test('Verifica se é possível digitar nos campos email e senha, após isso, clicar no button "Enviar". Espera que a rota mude para "/meals".', async () => {
//     const history = createMemoryHistory();
//     render(
//       <Router history={ history }>
//         <LoginProvider>
//           <RecipesProvider>
//             <App />
//           </RecipesProvider>
//         </LoginProvider>
//       </Router>,
//     );
//     const emailElement = screen.getByTestId('email-input');
//     const passwordElement = screen.getByTestId('password-input');
//     const btnElement = screen.getByTestId('login-submit-btn');

//     userEvent.type(emailElement, 'teste@teste.com');
//     userEvent.type(passwordElement, '1234567');

//     userEvent.click(btnElement);
//     expect(history.location.pathname).toBe('/meals');

//     await waitFor(() => {
//       expect(screen.getByRole('button', { name: /beef/i })).toBeInTheDocument();
//     });

//     const btnsElements = screen.getAllByRole('button');
//     expect(btnsElements).toHaveLength(6);

//     userEvent.click(btnsElements[0]);

//     const textBeef = await screen.findByText(/beef and mustard pie/i);
//     expect(textBeef).toBeInTheDocument();
//   });
// });
describe('Verificando a funcionalidade da página Login', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (categoryData),
    }).mockResolvedValueOnce({
      json: async () => (recipesMealsData),
    }).mockResolvedValueOnce({
      json: async () => (categoryMealsData),
    });
  });
  // beforeEach(() => {
  //   fakeFetch = jest.spyOn(global, 'fetch').mockImplementation(mockCypress);
  // });
  test('Verifica se é possível digitar nos campos email e senha, após isso, clicar no button "Enviar". Espera que a rota mude para "/meals".', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <LoginProvider>
          <RecipesProvider>
            <App />
          </RecipesProvider>
        </LoginProvider>
      </Router>,
    );
    const emailElement = screen.getByTestId('email-input');
    const passwordElement = screen.getByTestId('password-input');
    const btnElement = screen.getByTestId('login-submit-btn');

    userEvent.type(emailElement, 'teste@teste.com');
    userEvent.type(passwordElement, '1234567');

    userEvent.click(btnElement);
    expect(history.location.pathname).toBe('/meals');

    expect(await screen.findByRole('button', { name: /beef/i })).toBeInTheDocument();

    const btnsElements = screen.getAllByRole('button');
    expect(btnsElements).toHaveLength(6);

    userEvent.click(btnsElements[0]);

    const textBeef = await screen.findByText(/beef and mustard pie/i);
    expect(textBeef).toBeInTheDocument();
  });
});
