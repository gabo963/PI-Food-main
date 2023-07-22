import axios from 'axios';
export const GET_RECIPES = "GET_RECIPES"; // TODO: puede venir con query
export const GET_RECIPE = "GET_RECIPE"; // TODO: Enviar el internal flag
export const GET_DIETS = "GET_DIETS"; // TODO: recibir las dietas.
export const POST_RECIPE = "POST_RECIPE"; // TODOL: Postear la receta.

export const getRecipes = () => {
    return function(dispatch){
        axios("http://localhost:3001/recipes")
        .then(data=>dispatch( {type: GET_RECIPES, payload: data.data} ))
    };
};