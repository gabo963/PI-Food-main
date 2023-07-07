const { Recipe } = require("../db");

const findAllRecipes = async ( ) => {
    // Consulta todas las recetas en la base de datos.
    //TODO: Acotar a los campos que se estan buscando
    const dbRecipes = await Recipe.findAll();
    return dbRecipes;
};

module.exports = findAllRecipes;