const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
const { validateDiets, createSteps } = require("./spoonacularTranslations");
const axios = require('axios');
const URL = "https://api.spoonacular.com/recipes"

const findRecipeById = async ( id, internalFlag ) => {

    let recipe = null;

    if( internalFlag ) {
        // Se busca en la BBDD interna
        // Debe traer los tipos de dieta.
        recipe = await Recipe.findByPk(id, {
            attributes: ["ID", "name", "image", "description", "health_score", "step_by_step"],
            include: {
                model: Diet,
                attributes: ['ID','name'],
                through: {
                    attributes: [],
                },
            }
        });
        if( !recipe ) throw Error(`La receta propia con la id ${id} no existe.`);
    } else {
        // Se busca en spoonacular.
        //DONE: Hacer el query de spoonacular.
        //DONE: Acotar a los campos que se estan buscando
        //DONE: Transformar los campos.
        const receta = await axios.get(`${URL}/${id}/information?apiKey=${API_KEY}`)
        .then((response)=>{
            // Acota los campos
            const { title, image, summary, healthScore, analyzedInstructions, diets, vegetarian, vegan, glutenFree } = response.data;
            return { title, image, summary, healthScore, analyzedInstructions, diets, vegetarian, vegan, glutenFree };
        },(reason)=>{
            throw Error(`There was an error when getting the recipe with id: ${id} from spoonacular.`);
        });

        // Transforma los campos
        let { title, image, summary, healthScore, analyzedInstructions, diets, vegetarian, vegan, glutenFree } = receta;
        
        if( vegetarian ) diets.push("vegetarian");
        if( vegan ) diets.push("vegan");
        if( glutenFree ) diets.push("glutenFree");

        diets = await validateDiets(diets);
        const steps = await createSteps( analyzedInstructions ); 
        
        recipe = {ID: id, name: title, image, description: summary, health_score: healthScore,step_by_step: steps, Diets: diets};
    }
    return recipe;
};

module.exports = findRecipeById;