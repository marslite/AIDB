const userModel = require("../models/user")
const toolModel = require("../models/tool");

module.exports = {index,newTool,create,show, createReview};


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



async function show(req,res){
    console.log(req.user);

    const tool = await toolModel.findById(req.params.id);
    res.render('aidb/show', {tool});
    console.log("Show Tool rendered :D")
    console.log(tool, "<--- ID ")




    
        
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

async function createReview(req,res){
    console.log(req.body);
    try {
        const toolFromTheDatabase = await toolModel.findById(req.params.id);

        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        toolFromTheDatabase.reviews.push(req.body);
        await toolFromTheDatabase.save();
        console.log(toolFromTheDatabase, "Succesfully inserted into reviews");
        res.redirect(`/aidb/${req.params.id}`)
        
    } catch (err) {
        res.send(err);
        
    }
}