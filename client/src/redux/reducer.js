import { GET_RECIPES } from "./actions";

const initialState = {
    recipes: [{id: 1, name: 'Helado de Vainilla'}],
};

const rootReducer = (state=initialState, action) => {
    switch( action.type ) {
        case GET_RECIPES:
            return {...state, recipes: action.payload }
        default: 
            return {...state};
    }
}; 

export default rootReducer;