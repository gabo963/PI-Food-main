import { GET_RECIPES, GET_RECIPE, GET_DIETS, POST_RECIPE } from "./actions";
import { GET_RECIPES_ERROR, GET_RECIPE_ERROR, GET_DIETS_ERROR, POST_RECIPE_ERROR } from "./actions";
// import { DELETE_RECIPE, PUT_RECIPE} from "./actions";

const initialState = {
    recipes: [],
    diets: [],
    recipe: null,
    match: false,
    errors: {
        getRecipesErrors: '',
        getRecipeErrors: '',
        postRecipeErrors: '',
        getDietsErrors: ''
    },
};

const rootReducer = (state=initialState, action) => {
    switch( action.type ) {
        case GET_RECIPES:
            return {...state, recipes: action.payload.recipes, match: action.payload.exactMatch, errors: {...state.errors, getRecipesErrors: ''} };
        case GET_RECIPE:
            return {...state, recipe: action.payload, errors: {...state.errors, getRecipeErrors: ''} };
        case GET_DIETS:
            return {...state, diets: action.payload};
        case POST_RECIPE:
            return {...state, recipe: action.payload};
        case GET_RECIPES_ERROR:
            return {...state, errors: {...state.errors, getRecipesErrors: action.payload.error}};
        case GET_RECIPE_ERROR:
            return {...state, errors: {...state.errors, getRecipeErrors: action.payload.error}};
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

// TODO: https://stackoverflow.com/questions/58266418/correct-way-of-error-handling-in-react-redux

export default rootReducer;