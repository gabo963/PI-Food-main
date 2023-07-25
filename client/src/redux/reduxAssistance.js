const filtering = (action, state) => {
    return state.recipes.filter( recipe => {
        if( Array.isArray(action.payload.value) ) {
            if( Array.isArray(recipe[action.payload.name]) ) {
                for( let i = 0; i < action.payload.value.length; i++ ) {
                    for( let j = 0; j < recipe[action.payload.name].length; j++ ) {
                        if(recipe[action.payload.name][j][action.payload.field] === action.payload.value[i]) return true;
                    }
                }
            } else {
                for( let i = 0; i < action.payload.value.length; i++ ) {
                    if(recipe[action.payload.name] === action.payload.value[i]) return true;
                }
            }
        } else {
            return recipe[action.payload.name] == action.payload.value;
        }
    });
};

const sorting = (a,b) => {

}; 

export { filtering, sorting };