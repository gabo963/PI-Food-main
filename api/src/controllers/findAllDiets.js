const { Diet } = require("../db");

const { API_KEY, RECETAS_PARA_DIETAS } = process.env;
const axios = require('axios');
const URL = "https://api.spoonacular.com/recipes"

const findAllDiets = async () => {
    // Retorna el arreglo de todas la dietas
    // Si no existen dietas estas se deben precargar.
    const filter = { attributes: ['ID', 'name'] };
    let diets = await Diet.findAll(filter);
    if( diets.length == 0 ) {
        await createDiets(null);
        diets = await Diet.findAll(filter);
    }
    return diets;
};

const createDiets = async ( newDiets ) => {
    // hace una consulta a las recetas de spoonacular y extrae todas las dietas unicas.
    // Estas dietas se crean en la BBDD.
    if( !newDiets ) {
        newDiets = ["vegetarian","vegan","glutenFree"];
        const recetas = await axios.get(`${URL}/random?number=${RECETAS_PARA_DIETAS}&apiKey=${API_KEY}`)
        .then((response)=>{
            response.data.recipes.forEach(receta => {
                newDiets = newDiets.concat(receta.diets);
            });
        },(reason)=>{
            throw Error(`There was an error when extracting the recipes from spoonacular: "${reason}".`);
        });
    }
    newDiets = [...new Set(newDiets)];
    newDiets = newDiets.map( nombre => { return {name: nombre}; });
    await Diet.bulkCreate(newDiets);
};

module.exports = {findAllDiets, createDiets};