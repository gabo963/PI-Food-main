const db = require("../db");
const { Recipe, Diet } = require("../db");

const { API_KEY, RECETAS_PARA_DIETAS } = process.env;
const axios = require('axios');
const URL = "https://api.spoonacular.com/recipes"

const { validateDiets } = require("./spoonacularTranslations");

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

    let spoonRecipes = await axios.get(`${URL}/random?number=${RECETAS_PARA_DIETAS}&apiKey=${API_KEY}`)
    .then((response)=>{
        return response.data.recipes;
    },(reason)=>{
        throw Error(`There was an error when extracting the recipes from spoonacular: "${reason}".`);
    });

    spoonRecipes = await Promise.all(spoonRecipes.map( async recipe => {
        let { id, title, image, healthScore, diets, vegetarian, vegan, glutenFree } = recipe;

        if( vegetarian ) diets.push("vegetarian");
        if( vegan ) diets.push("vegan");
        if( glutenFree ) diets.push("glutenFree");

        diets = await validateDiets(diets);

        return {ID: id, name: title, image, health_score: healthScore, Diets: diets, internalFlag: false};
    }));

    return {recipes: [...dbRecipes, ...spoonRecipes]};
};

module.exports = findAllRecipes;