import { GET_RECIPES, GET_RECIPE, GET_DIETS, POST_RECIPE } from "./actions";

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
        default: 
            return {...state};
    }
}; 

export default rootReducer;