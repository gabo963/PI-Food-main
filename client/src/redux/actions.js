import axios from 'axios';
export const GET_RECIPES = "GET_RECIPES"; // TODO: puede venir con query
export const GET_RECIPE = "GET_RECIPE"; // DONE: Enviar el internal flag
export const GET_DIETS = "GET_DIETS"; // DONE: recibir las dietas.
export const POST_RECIPE = "POST_RECIPE"; // DONE: Postear la receta.

export const GET_RECIPES_ERROR = "GET_RECIPES_ERROR";
export const POST_RECIPE_ERROR = "POST_RECIPE_ERROR";
export const GET_DIETS_ERROR = "GET_DIETS_ERROR";
export const GET_RECIPE_ERROR = "GET_RECIPE_ERROR";

// export const DELETE_RECIPE = "DELETE_RECIPE"; // TODO: Agregar al api.
// export const PUT_RECIPE = "PUT_RECIPE"; // TODO: Agregar al api.

const URL = "http://localhost:3001";

export const getRecipes = (name) => {
    return function(dispatch){
        axios.get(`${URL}/recipes`)
        .then(data=>dispatch( {type: GET_RECIPES, payload: data.data} ))
        .catch( reason => {
            dispatch({type: GET_RECIPES_ERROR, payload: reason.response.data})
        });
    };
};

export const getRecipe = (id) => {
    return function(dispatch){
        axios.get(`${URL}/recipes/${id}`)
        .then(data=>dispatch( {type: GET_RECIPE, payload: data.data} ))
        .catch( reason => {
            dispatch({type: GET_RECIPE_ERROR, payload: reason.response.data})
        });
    };
};

export const getDiets = () => {
    return function(dispatch){
        axios.get(`${URL}/diets`)
        .then(data=>dispatch( {type: GET_DIETS, payload: data.data} ))
        .catch( reason => {
            dispatch({type: GET_DIETS_ERROR, payload: reason.response.data})
        });
    };
};

export const postRecipe = ( recipe ) => {
    return function(dispatch){
        axios.post(`${URL}/recipes`,{recipe})
        .then(data=>dispatch( {type: POST_RECIPE, payload: data.data} ))
        .catch( reason => {
            dispatch({type: POST_RECIPE_ERROR, payload: reason.response.data})
        });
    };
};