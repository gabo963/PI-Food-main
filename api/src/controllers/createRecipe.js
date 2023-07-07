const { Recipe, Diet } = require("../db");

const createRecipe = async ( {name, image, description, health_score, step_by_step, diets} ) => {
    // Crear una receta en la base de datos.
    // Debe estar relacionada a por lo menos una dieta.
    if( !diets || diets.length == 0 ) throw Error("No se han incluido tipos de dietas para esta receta.");
    if( !name || !image || !description || !health_score || !step_by_step ) throw Error("Faltan campos obligatorios para crear la receta, se esperan: name, image, description, health_score, step_by_step");
    
    //TODO: verificar que las dietas ingresadas por Param existan en el modelo Diet.
    
    const newRecipe = await Recipe.create( {name, image, description, health_score, step_by_step} );
    newRecipe.addDiets(diets);
    return newRecipe;
};

module.exports = createRecipe;