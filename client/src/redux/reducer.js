import { GET_RECIPES, GET_RECIPE, GET_DIETS, POST_RECIPE, FILTER_RECIPES, RESET_FILTER_RECIPES } from "./actions";
import { GET_RECIPES_ERROR, GET_RECIPE_ERROR, GET_DIETS_ERROR, POST_RECIPE_ERROR } from "./actions";
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
            return {...state, filteredRecipes: state.recipes.filter( recipe => {
                if( Array.isArray(action.payload.value) ) {
                    if( Array.isArray(recipe[action.payload.name]) ) {
                        for( let i = 0; i < action.payload.value.length; i++ ) {
                            for( let j = 0; j < recipe[action.payload.name].length; j++ ) {
                                if(recipe[action.payload.name][j][action.payload.field] === action.payload.value[i]) {
                                    return true;
                                    break;
                                }
                            }
                        }
                    } else {
                        for( let i = 0; i < action.payload.value.length; i++ ) {
                            if(recipe[action.payload.name] === action.payload.value[i]) {
                                return true;
                                break;
                            }  
                        }
                    }
                } else {
                    return recipe[action.payload.name] === action.payload.value;
                }
            })};
        case RESET_FILTER_RECIPES:
            return {...state, filteredRecipes: []};
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