const {Router} = require("express");

const createRecipe = require("../controllers/createRecipe");
const findRecipeById = require("../controllers/findRecipeById");
const findAllRecipes = require("../controllers/findAllRecipes");
const findRecipesByName = require("../controllers/findRecipesByName");

const recipeRouter = Router();

recipeRouter.get("/", async (req, res) => {
    
    // Envia la lista de recetas filtrada por nombre.
    // O Envia la lista completa de recetas de la BBDD.
    try {        
        const { name } = req.query;
        const recipes = name !== undefined ? await findRecipesByName(name) : await findAllRecipes();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

recipeRouter.get("/:id", async (req, res) => {
    // Envia la receta buscada por id. Se debe incluir un flag en el body del request.
    // Este flag especifica si se debe buscar en la DDBB o en spoon.
    try {
        let {id} = req.params;
        let internalFlag = id.split("-")[1];
        id = id.split("-")[0];
        if( internalFlag === undefined || !( internalFlag === "true" || internalFlag === "false" ) ) throw Error("Se debe incluir un internalFlag en la id de la solicitud para indicar si se busca una receta propia o de la pagina web spoonacular. Este puede tomar los valores de true o false y la ID se debe ver recipes/{NUM}-{true/false}.")
        internalFlag = internalFlag === "true" ? true : false;
        const recipe = await findRecipeById( id, internalFlag );
        res.status(200).json(recipe);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

recipeRouter.post('/', async (req,res) => {
    // Crea una nueva receta y la retorna.
    try {
        const recipeData = req.body;
        const newRecipe = await createRecipe( recipeData );
        res.status(201).json(newRecipe);
    } catch (error) {
        if ( error.message == "Validation error") res.status(400).json({error: `La Receta con nombre: "${req.body.name}" ya existe.`});
        else res.status(400).json({error: error.message});
    }
});

module.exports = recipeRouter;