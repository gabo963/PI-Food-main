const initialState = {
    recipes: [{id: 1, name: 'Helado de Vainilla'}],
};

const rootReducer = (state=initialState, action) => {
    switch( action.type ) {
        default: 
            return {...state};
    }
}; 

export default rootReducer;