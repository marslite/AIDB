const UserModel = require("../models/user")
const ToolModel = require("../models/tool");


module.exports = {index,newTool,create,show, createReview, deleteReview};




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

async function createReview(req,res){
    console.log(req.body);
    try {
        const toolFromTheDatabase = await ToolModel.findById(req.params.id);

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

async function deleteReview(req,res,next){
    // console.log(req.body)
    console.log('Inside the deleteReview function')
    console.log(req.params.id, "<--- REQ.PARAMS.ID ")
    console.log(req.user.id, "<--- REQ_USER_ID ")


    try {
        const toolPage = await ToolModel.findOne({'reviews._id': req.params.id, 'reviews.user': req.user.id});
        //if the user is not logged in it and tries to perform a delete operation will be redirecred to /aidb
        console.log(toolPage, "<-----This is toolPage ")
        if(!toolPage) return res.redirect('/aidb')
        //Now here we delete the specified reviews from the databse
        toolPage.reviews.remove(req.params.id);
        //Since we have mutated toolPage we have to update MongoDB about this change
        await toolPage.save();

        //After updating MongoDB and performing the deletion on the review
        //The user gets redirected to the Tool page where review was deleted
        res.redirect(`/aidb/${toolPage._id}`)

        console.log('DELETED REVIEW SUCESSFULLY!')
        
    } catch (err) {
        next(err);
        
    }
}


async function update(req,res){

}