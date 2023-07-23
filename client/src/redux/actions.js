import axios from 'axios';
export const GET_RECIPES = "GET_RECIPES"; // TODO: puede venir con query
export const GET_RECIPE = "GET_RECIPE"; // TODO: Enviar el internal flag
export const GET_DIETS = "GET_DIETS"; // TODO: recibir las dietas.
export const POST_RECIPE = "POST_RECIPE"; // TODO: Postear la receta.

// export const DELETE_RECIPE = "DELETE_RECIPE"; // TODO: Agregar al api.
// export const PUT_RECIPE = "PUT_RECIPE"; // TODO: Agregar al api.

const URL = "http://localhost:3001";

export const getRecipes = () => {
    return function(dispatch){
        axios.get(`${URL}/recipes`)
        .then(data=>dispatch( {type: GET_RECIPES, payload: data.data} ))
        .catch( reason => {
            console.log(reason);
            dispatch({type: GET_RECIPES, payload: []})
        });
    };
};

export const getRecipe = (id) => {
    return function(dispatch){
        axios.get(`${URL}/recipes/${id}`)
        .then(data=>dispatch( {type: GET_RECIPE, payload: data.data} ))
        .catch( reason => {
            console.log(reason);
            dispatch({type: GET_RECIPE, payload: []});
        });
    };
};