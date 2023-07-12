const UserModel = require("../models/user")
const ToolModel = require("../models/tool");


module.exports = {index,newTool,create,show, update};




async function index(req,res){
    const aidb = await UserModel.find({});
    const tools = await ToolModel.find({});
    res.render("aidb/index",{aidb, tools});
}



async function show(req,res){
    console.log(req.user);
    const tools = await ToolModel.find({});
    const tool = await ToolModel.findById(req.params.id);
    res.render('aidb/show', {tool, tools});
}




function newTool(req,res){
    res.render("aidb/new", {title: "Add AI Tool name", errorMsg: ""})
}


async function create(req,res){
    for(let key in req.body){
        if(req.body[key] === "") delete req.body[key];
    }
    try {
        const toolFromTheDatabase = await ToolModel.create(req.body);
        console.log(toolFromTheDatabase);
        res.redirect(`/aidb/${toolFromTheDatabase._id}`);
        
    } catch (err) {
        console.log(err);
        res.render("aidb/new", {errorMsg: err.message});
        
    }
}



async function update(req,res){
    console.log('Inside update function!')
    console.log(req.user._id, "<--- Pushing thisß")
    console.log(req.params.id, "<-- REQ.PARAMS.ID")

    try {
        const toolFromTheDatabase = await ToolModel.findById(req.params.id);
        if(!toolFromTheDatabase) return res.redirect('/aidb')
        console.log(toolFromTheDatabase, "Check here tftd");

        

        toolFromTheDatabase.upvote.push(req.user._id);
        await toolFromTheDatabase.save()
        res.redirect(`/aidb/${toolFromTheDatabase._id}`)
        
    } catch (err) {
        res.send(err);
    }
    


}