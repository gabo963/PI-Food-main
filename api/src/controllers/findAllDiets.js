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
        diets = await createDiets(null);
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
    newDiets = await Diet.bulkCreate(newDiets);

    newDiets = newDiets.map( diet => {
        const {ID, name} = diet;
        return {ID, name};
    } );

    return newDiets;
};

const findDietByName = async ( name ) => {
    let diet = null;
    
    diet = await Diet.findAll({
        where: {name: name},
        attributes: ['ID', 'name']
    })

    return diet;
};

module.exports = {findAllDiets, createDiets, findDietByName};