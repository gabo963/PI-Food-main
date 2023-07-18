const { Recipe } = require("../db");

const findAllRecipes = async ( ) => {
    // Consulta todas las recetas en la base de datos.
    // DONE: Acotar a los campos que se estan buscando
    const dbRecipes = await Recipe.findAll({attributes: ['ID', 'name', 'image']});
    return dbRecipes;
};

module.exports = findAllRecipes;