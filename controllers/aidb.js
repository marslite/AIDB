const userModel = require("../models/user")
const toolModel = require("../models/tool");

module.exports = {index,newTool,create};


// async function landing(req,res){
//     const aidb = await userModel.find({});
//     console.log("GETTING INSIDE THE CONTROLLER");
//     console.log(aidb);
//     res.render("aidb/index");
// }

async function index(req,res){
    const aidb = await userModel.find({});
    console.log("GETTING INSIDE THE CONTROLLER");
    console.log(aidb);
    res.render("aidb/index",{aidb});
}



function newTool(req,res){
    res.render("aidb/new", {title: "Add AI Tool name", errorMsg: ""})
}


async function create(req,res){
    for(let key in req.body){
        if(req.body[key] === "") delete req.body[key];
    }
    try {
        const toolFromTheDatabase = await toolModel.create(req.body);
        console.log(toolFromTheDatabase);
        res.redirect(`/aidb/${toolFromTheDatabase._id}`);
        
    } catch (err) {
        console.log(err);
        res.render("aidb/new", {errorMsg: err.message});
        
    }
}