const { Diet } = require("../db");

const findDietByName = async ( name ) => {
    let diet = null;
    
    diet = await Diet.findAll({
        where: {name: name},
        attributes: ['ID', 'name']
    })

    return diet;
};

module.exports = findDietByName;