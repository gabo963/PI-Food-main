const { Recipe, Diet } = require("../db");

const findRecipesByName = async ( name ) => {
    // Consulta las recetas que coincidan al nombre en la base de datos interna y hacer un query a spoonacular. 
    // Retornar los mismos campos en ambas consultas.
    // La consulta no debe ser una coincidencia exacta y debe ser independiente a las mayusculas y minusculas.

    //TODO: Acotar a los campos que se deben devolver.
    //TODO: Hacer la consulta a Spoonacular.
    //TODO: Verificar que la busqueda no sea caps-sensitive (ni en spoon ni en la BBDD).

    if( name == '' ) throw Error('El nombre esta vacio.');

    const dbRecipes = await Recipe.findAll({
            where: { name: name },
            attributes: ["ID", "name", "image", "description", "health_score", "step_by_step"],
            include: {
                model: Diet,
                attributes: ['ID','name'],
                through: {
                    attributes: [],
                },
            }
        });

    return dbRecipes;
};

module.exports = findRecipesByName;