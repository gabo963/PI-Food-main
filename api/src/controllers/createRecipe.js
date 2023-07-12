const { Recipe, Diet } = require("../db");

const validadorDieta = async (diets) => {
    let validador = true;
    let dieta = -1;
    for( let i = 0; i < diets.length; i++ ){
        let diet = await Diet.findByPk(diets[i]);
        if( !diet ) {
            validador = false;
            dieta = diets[i];
            break;
        };
    }
    return [validador, dieta];
};

const createRecipe = async ( {name, image, description, health_score, step_by_step, diets} ) => {
    // Crear una receta en la base de datos.
    // Debe estar relacionada a por lo menos una dieta.
    if( !diets || diets.length == 0 ) throw Error("No se han incluido tipos de dietas para esta receta.");
    if( !name || !image || !description || !health_score || !step_by_step ) throw Error("Faltan campos obligatorios para crear la receta, se esperan: name, image, description, health_score, step_by_step");
    
    //DONE: verificar que las dietas ingresadas por Param existan en el modelo Diet.
    const validador = await validadorDieta(diets);
    console.log(validador);
    if( !validador[0] ) throw Error(`La dieta con id: ${validador[1]} no existen.`);
    
    const newRecipe = await Recipe.create( {name, image, description, health_score, step_by_step} );
    newRecipe.addDiets(diets);
    return newRecipe;
};

module.exports = createRecipe;