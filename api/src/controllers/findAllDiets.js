const { Diet } = require("../db");

const findAllDiets = async () => {
    // Retorna el arreglo de todas la dietas
    // Si no existen dietas estas se deben precargar.
    let diets = await Diet.findAll();
    diets = diets.length == 0 ? createDiets : diets; 
    return diets;
};

const createDiets = async () => {
    // hace una consulta a las recetas de spoonacular y extrae todas las dietas unicas.
    // Estas dietas se crean en la BBDD.
    //TODO: Hacer el query a spoonacular & encontrar los tipos de dietas unicos.
    //TODO: Crear los tipos de dietas encontrados en spoonacular en la BBDD.
    const newDiets = [];
    return newDiets;
};

module.exports = findAllDiets;