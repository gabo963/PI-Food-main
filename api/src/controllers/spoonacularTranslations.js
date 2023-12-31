const { createDiets } = require("./findAllDiets");
const findDietByName = require("./findDietByName");

const validateDiets = async (diets) => {
    // Valida si las dietas ya existen, si ya existen les agrega el id, si no las crea y las responde con el id.
    let newDiets = [];
    let exiDiets = [];

    for( let i = 0; i < diets.length; i++ ) {
        const resultado = await findDietByName(diets[i]);
        if( resultado.length == 0 ) newDiets.push(diets[i]);
        else exiDiets.push(resultado[0]);
    }
    
    diets = await createDiets(newDiets);
    
    return [ ...exiDiets, ...diets ];
};

const createSteps = async (analyzedInstructions) => {
    // Recorre los pasos de spoonacular y los convierte en nuestro formato legible.
    let pasos = analyzedInstructions.length == 0 ? 'No hay Pasos': '';
    analyzedInstructions.forEach(element => {
        // recorre cada elemento
        pasos =+ element.name.length != 0 ? element.name + '\n': '';
        element.steps.forEach( step => {
            // recorre cada step del elemento
            pasos += `${step.number}. ${step.step}.\n`
        } );
    });
    return pasos;
};

module.exports = {validateDiets, createSteps};