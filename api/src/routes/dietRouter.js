const {Router} = require("express");

const findAllDiets = require("../controllers/findAllDiets");

const dietRouter = Router();

dietRouter.get("/", (req,res) => {
    // Envia la lista de dietas.
    //TODO: conectar al controller.
    res.send('Estoy en la ruta GET /diets.')
});

module.exports = dietRouter;