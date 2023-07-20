const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const axios = require('axios');
const URL = "https://api.spoonacular.com/recipes"

const findRecipesByName = async ( name ) => {
    // Consulta las recetas que coincidan al nombre en la base de datos interna y hacer un query a spoonacular. 
    // Retornar los mismos campos en ambas consultas.
    // La consulta no debe ser una coincidencia exacta y debe ser independiente a las mayusculas y minusculas.

    //DONE: Acotar a los campos que se deben devolver.
    //DONE: Hacer la consulta a Spoonacular.
    //DONE: Verificar que la busqueda no sea caps-sensitive (ni en spoon ni en la BBDD).

    let exactMatch = false;

    if( name == '' ) throw Error('El nombre esta vacio.');

    let dbRecipes = await Recipe.findAll({
        where: { name: {[Op.iLike]: `%${name}%`} },
        attributes: ["ID", "name", "image"],
    });

    dbRecipes = dbRecipes.map( recipe => {
        if( recipe.dataValues.name.toUpperCase() == name.toUpperCase() ) {
            exactMatch = true;
            return {...recipe.dataValues, internalFlag: true, exactMatch: true};
        }
        else {
            return {...recipe.dataValues, internalFlag: true, exactMatch: false};
        }
    });

    let spoonRecipes = await axios.get(`${URL}/complexSearch?query=${name}&apiKey=${API_KEY}`)
    .then((response)=>{
        // Acota los campos
        return response.data.results;
    },(reason)=>{
        throw Error(`There was an error when getting the recipe with id: ${id} from spoonacular.`);
    });

    spoonRecipes = spoonRecipes.map( recipe => {
        const { id, title, image } = recipe;
        if( title.toUpperCase() == name.toUpperCase() ) {
            exactMatch = true;
            return {ID: id, name: title, image, internalFlag: false, exactMatch: true};
        } else {
            return {ID: id, name: title, image, internalFlag: false, exactMatch: false};
        }
    });

    return {exactMatch, recipes: [...dbRecipes, ...spoonRecipes]};
};

module.exports = findRecipesByName;