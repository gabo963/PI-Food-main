const { Recipe } = require("../db");

const findAllRecipes = async ( ) => {
    // Consulta todas las recetas en la base de datos.
    
    const dbRecipes = await Recipe.findAll();
    return dbRecipes;
};

module.exports = findAllRecipes;