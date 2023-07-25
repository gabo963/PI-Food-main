const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");

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

const validadorReceta = async (name) => {
    let validador = true;
    
    let dbRecipes = await Recipe.findAll({
        where: { name: {[Op.iLike]: `${name}`} },
        attributes: ["ID", "name"],
    });

    for( let i = 0; i < dbRecipes.length; i++  ) {
        if( name.toLowerCase() === dbRecipes[i].name.toLowerCase() ) return [false, dbRecipes[i].ID];
    }

    return [validador, null];
};

const createRecipe = async ( {name, image, description, health_score, step_by_step, diets} ) => {
    // Crear una receta en la base de datos.
    // Debe estar relacionada a por lo menos una dieta.
    if( !diets || diets.length == 0 ) throw Error("No se han incluido tipos de dietas para esta receta.");
    if( !name || !image || !description || !health_score || !step_by_step ) throw Error("Faltan campos obligatorios para crear la receta, se esperan: name, image, description, health_score, step_by_step");
    
    //DONE: verificar que las dietas ingresadas por Param existan en el modelo Diet.
    const validadorDietaVar = await validadorDieta(diets);
    if( !validadorDietaVar[0] ) throw Error(`La dieta con id: ${validadorDietaVar[1]} no existen.`);

    //DONE: verificar que el nombre de la receta no exista en la base de datos.
    const validadorRecetaVar = await validadorReceta(name);
    if( !validadorRecetaVar[0] ) throw Error(`La receta no puede tener el nombre ${name}, la receta con id: ${validadorRecetaVar[1]}-true ya lo tiene.`)
    
    const newRecipe = await Recipe.create( {name, image, description, health_score, step_by_step} );
    newRecipe.addDiets(diets);
    return newRecipe;
};

module.exports = createRecipe;