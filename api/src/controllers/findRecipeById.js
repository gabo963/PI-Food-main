const { Recipe } = require("../db");

const findRecipeById = async ( id, internalFlag ) => {

    let recipe = null;

    if( internalFlag ) {
        // Hago la busqueda en la BBDD interna
        recipe = await Recipe.findByPk(id);
        if( !recipe ) throw Error(`El personaje interno con la id ${id} no existe.`);
    } else {
        // Hago una llamada a spoontacular.
    }

    return recipe;
};