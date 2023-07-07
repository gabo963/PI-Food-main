const {Router} = require("expres");

const createRecipe = require("../controllers/createRecipe");
const findRecipeById = require("../controllers/findRecipeById");
const findRecipeByName = require("../controllers/findRecipeByName");

const recipeRouter = Router();

module.exports = recipeRouter;