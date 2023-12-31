const express = require('express');
const router = express.Router();
const aidbCtrl = require('../controllers/aidb');




// GET /aidb
router.get('/', aidbCtrl.index)
// GET /aidb/new
router.get('/new', aidbCtrl.newTool)

//POST /aidb
router.post('/',aidbCtrl.create)

// GET /aidb/:id SHOW the single Tool
router.get('/:id',aidbCtrl.show )

//GET UPDATE Upvote
router.put('/:id', aidbCtrl.update);






// router.get('/', )

// GET /aidb/new
// router.get('/new', aidbCtrl.new);
// GET /aidb/:id (display sinlge AI Tool)
// router.get('/:id', aidbCtrl.show);
// POST /aidb
// router.post('/', aidbCtrl.create);

module.exports = router;
