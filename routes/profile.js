const router = require("express").Router();
const Bookings = require("../model/booking");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json()


const Check = function(req, res, next){
    if(!req.user){
        res.redirect('/auth/login');
    }else{
        next();
    }
};

router.get('/', Check , jsonParser , async function(req,res){
    let search ={}
    if(req.query.name != null && req.query.name !== ""){
        search.name = new RegExp(req.query.name, 'i')
    }
    try{
        const booking =  await Bookings.find({'user': req.user._id}, search).populate('User')
        res.render('profile', { booking:booking , user : req.user , search:req.query});

    }catch{
        res.redirect("/inde")
    }


});
module.exports = router;