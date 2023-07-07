const {Router} = require("express");

const findAllDiets = require("../controllers/findAllDiets");

const dietRouter = Router();

dietRouter.get("/", async (req,res) => {
    // Envia la lista de dietas.
    try {
        const diets = await findAllDiets();
        res.status(200).json(diets);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = dietRouter;