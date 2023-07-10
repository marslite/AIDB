const userModel = require("../models/user")

module.exports = {index};


async function index(req,res){
    const aidb = await userModel.find({});
    console.log("GETTING INSIDE THE CONTROLLER");
    console.log(aidb);
    res.render("index",{aidb});
}