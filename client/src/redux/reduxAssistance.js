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

function compareAlphabetFunction(a,b) {
    
}

const sorting = (action, state) => {

    //state.recipes
    const filteredArray = [...state.recipes];
    console.log(action.payload.orderMethod);
    
    if( action.payload.orderMethod === 'Health Score' ) {
        if( action.payload.order === 'ascending' )  {
            filteredArray.sort((a,b) => a.health_score - b.health_score);
        } else {
            filteredArray.sort((a,b) => -1*(a.health_score - b.health_score));
        }
        return filteredArray;
    }

    if( action.payload.orderMethod === 'Alphabetical' ) {
        console.log(action.payload.order);
        return [];
    }

    return [];
};

export { filtering, sorting };