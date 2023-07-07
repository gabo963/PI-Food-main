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
        const recipes = name ? findRecipesByName(name) : findAllRecipes();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({error: error.message});
    }

    if( name ) {
        //TODO: conectar a el controller.
        
        res.send(`Estoy en la ruta GET /recipes?name=${name}`);
    } else {
        //TODO: conectar y crear el controller.
        res.send('Estoy en la ruta GET /recipes.');
    }
});

recipeRouter.get("/:id", async (req, res) => {
    // Envia la receta buscada por id.
    //TODO: conectar a el controller.
    const {id} = req.params;
    res.send(`Estoy en la ruta GET /recipes/:id con el id ${id}`);
});

recipeRouter.post('/', async (req,res) => {
    // Crea una nueva receta y la retorna.
    //TODO: conectar al controller.
    const {name} = req.body;
    res.send(`Estoy en la ruta POST /recipes con la receta ${name}`);
});

module.exports = recipeRouter;

// try {
//     const diets = await findAllDiets();
//     res.status(200).json(diets);
// } catch (error) {
//     res.status(500).json({error: error.message});
// }