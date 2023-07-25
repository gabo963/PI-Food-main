import { GET_RECIPES, GET_RECIPE, GET_DIETS, POST_RECIPE, FILTER_RECIPES, ORDER_RECIPES, RESET_RECIPES } from "./actions";
import { GET_RECIPES_ERROR, GET_RECIPE_ERROR, GET_DIETS_ERROR, POST_RECIPE_ERROR } from "./actions";

import { filtering, sorting } from './reduxAssistance'
// import { DELETE_RECIPE, PUT_RECIPE} from "./actions";

const initialState = {
    recipes: [],
    filteredRecipes: [],
    diets: [],
    recipe: null,
    match: false,
    errors: {
        getRecipesErrors: '',
        getRecipeErrors: '',
        postRecipeErrors: '',
        getDietsErrors: ''
    },
    pgIndex: 1,
    
};

const rootReducer = (state=initialState, action) => {
    switch( action.type ) {
        case GET_RECIPES:
            return {...state, recipes: action.payload.recipes, match: action.payload.exactMatch, errors: {...state.errors, getRecipesErrors: ''} };
        case GET_RECIPE:
            return {...state, recipe: action.payload, errors: {...state.errors, getRecipeErrors: ''} };
        case GET_DIETS:
            return {...state, diets: action.payload, errors: {...state.errors, getDietsErrors: ''}};
        case POST_RECIPE:
            return {...state, recipe: action.payload, errors: {...state.errors, postRecipeErrors: ''}};
        case GET_RECIPES_ERROR:
            return {...state, errors: {...state.errors, getRecipesErrors: action.payload.error}};
        case GET_RECIPE_ERROR:
            return {...state, errors: {...state.errors, getRecipeErrors: action.payload.error}};
        case GET_DIETS_ERROR:
            return {...state, errors: {...state.errors, getDietsErrors: action.payload.error}};
        case POST_RECIPE_ERROR:
            return {...state, errors: {...state.errors, postRecipeErrors: action.payload.error}};
        case FILTER_RECIPES:
            return {...state, filteredRecipes: filtering( action, state )};
        case RESET_RECIPES:
            return {...state, filteredRecipes: []};
        case ORDER_RECIPES:
            return {...state, filteredRecipes: sorting( action, state ) };
        // case DELETE_RECIPE:
        //     return {...state, recipes: state.recipes.filter(recipe => recipe.id !== action.payload.id)};
        // case PUT_RECIPE: 
        //     return {...state, recipes: state.recipes.map( recipe => {
        //         if ( recipe.id === payload.recipe.id ) return payload.recipe;
        //         else return recipe;
        //     } )};
        default: 
            return {...state};
    }
};

export default rootReducer;