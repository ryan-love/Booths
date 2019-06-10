const express = require("express");
const router = express.Router();

router.get('/', function(req,res){
res.render('index', {user: req.user});
});
router.get('/store', function(req,res){
    res.render('store', {user : req.user});
});



module.exports = router;