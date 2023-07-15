const { Diet } = require("../db");

const { API_KEY } = process.env;
const axios = require('axios');
const URL = "https://api.spoonacular.com/recipes"

const findAllDiets = async () => {
    // Retorna el arreglo de todas la dietas
    // Si no existen dietas estas se deben precargar.
    let diets = await Diet.findAll();
    diets = diets.length == 0 ? createDiets(null) : diets; 
    return diets;
};

const createDiets = async ( newDiets ) => {
    // hace una consulta a las recetas de spoonacular y extrae todas las dietas unicas.
    // Estas dietas se crean en la BBDD.
    if( !newDiets ) {
        newDiets = ["vegetarian","vegan","glutenFree"];
        const recetas = await axios.get(`${URL}/random?number=10&apiKey=${API_KEY}`)
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
    const respuesta = await Diet.bulkCreate(newDiets);
    return respuesta;
};

module.exports = {findAllDiets, createDiets};