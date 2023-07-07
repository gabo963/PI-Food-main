const { Recipe, Diet } = require("../db");

const findRecipeById = async ( id, internalFlag ) => {

    let recipe = null;

    if( internalFlag ) {
        // Se busca en la BBDD interna
        // Debe traer los tipos de dieta.
        recipe = await Recipe.findByPk(id, {
            include: {
                model: Diet,
            }
        });
        if( !recipe ) throw Error(`El personaje interno con la id ${id} no existe.`);
    } else {
        // Se busca en spoonacular.
        //TODO: Hacer el query de spoonacular.
        //TODO: Acotar a los campos que se estan buscando
    }

    return recipe;
};

module.exports = findRecipeById;