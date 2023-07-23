const db = require("../db");
const { Recipe, Diet } = require("../db");

const findAllRecipes = async ( ) => {
    // Consulta todas las recetas en la base de datos.
    // DONE: Acotar a los campos que se estan buscando
    let dbRecipes = await Recipe.findAll({
        attributes: ['ID', 'name', 'image', 'health_score'],
        include: {
                model: Diet,
                attributes: ['ID','name'],
                through: {
                    attributes: [],
                },
            }
    });

    dbRecipes = dbRecipes.map( recipe => {
        return {...recipe.dataValues, internalFlag: true};
    } );

    return dbRecipes;
};

module.exports = findAllRecipes;