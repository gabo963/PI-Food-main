const { Recipe } = require("../db");

const createRecipe = async ( {name, image, description, health_score, step_by_step, diets} ) => {
    // Crear una receta en la base de datos.
    // Debe estar relacionada a por lo menos una dieta.
    if( diets.length == 0 ) throw Error("No se han incluido tipos de dietas para esta receta.");
    const newRecipe = await Recipe.createRecipe( {name, image, description, health_score, step_by_step} );
    newRecipe.addDiets(diets);
    return newRecipe;
};