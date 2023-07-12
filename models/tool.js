const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min: 0,
        max: 5,
        default: 2
    },
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    userName: String,
    userAvatar: String,

},{
    timestamps: true
})


// const upvoteSchema = new mongoose.Schema({
//     upvote:{
//         type: Number,
//         default: 4
//     }
// },{
//     timestamps : true
// })

// One Tool has many Upvotes

const toolSchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    developers: {type: String, required: true},
    license : {type: String, required: true},
    reviews: [reviewSchema],
    upvote: Array
},{
    timestamps: true
})



module.exports = mongoose.model('AIDB', toolSchema);