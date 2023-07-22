import { GET_RECIPES, GET_RECIPE, GET_DIETS, POST_RECIPE } from "./actions";
// import { DELETE_RECIPE, PUT_RECIPE} from "./actions";

const initialState = {
    recipes: [],
    diets: [],
    recipe: null,
};

const rootReducer = (state=initialState, action) => {
    switch( action.type ) {
        case GET_RECIPES:
            return {...state, recipes: action.payload };
        case GET_RECIPE:
            return {...state, recipe: action.payload };
        case GET_DIETS:
            return {...state, diets: action.payload};
        case POST_RECIPE:
            return {...state, recipes: [...state.recipes, action.payload] };
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