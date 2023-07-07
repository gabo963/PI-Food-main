const {Router} = require("expres");

const createRecipe = require("../controllers/createRecipe");
const findRecipeById = require("../controllers/findRecipeById");
const findRecipeByName = require("../controllers/findRecipeByName");

const recipeRouter = Router();

recipeRouter.get("/", (req, res) => {
    // Envia la lista de recetas
    //TODO: conectar y crear el controller.
    res.send('Estoy en la ruta GET /recipes.');
});

recipeRouter.get("?", (req, res) => {
    // Envia la lista de recetas filtrada por nombre.
    //TODO: conectar a el controller.
    const { name } = req.query;
    res.send(`Estoy en la ruta GET /recipes?name=${name}`);
});

recipeRouter.get("/:id", (req, res) => {
    // Envia la receta buscada por id.
    //TODO: conectar a el controller.
    const {id} = req.params;
    res.send(`Estoy en la ruta GET /recipes/:id con el id ${id}`);
});

recipeRouter.post('/', (req,res) => {
    // Crea una nueva receta y la retorna.
    //TODO: conectar al controller.
    const {name} = req.body;
    res.send(`Estoy en la ruta POST /recipes con la receta ${name}`);
});

module.exports = recipeRouter;