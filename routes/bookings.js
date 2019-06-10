const express = require("express");
const router = express.Router();
const Bookings = require("../model/booking");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json()

const Check = function(req, res, next){
    if(!req.user){
        res.redirect('/auth/login');

    }

    else{
        next();
    }
};

router.get('/', Check , jsonParser ,  async function(req,res){
    let search ={}
    if(req.query.name != null && req.query.name !== ""){
        search.name = new RegExp(req.query.name, 'i')
    }

    try{
        const booking =  await Bookings.find(search ).populate('User').exec()
        res.render('../views/bookings/index',{booking : booking, search:req.query, user:req.user});
   }catch{
        res.redirect("/")
    }

});

router.get('/new', Check , function(req,res){
    res.render("bookings/new", { booking: new Bookings()})
});

router.post("/", Check , async function(req,res){
    const booking = new Bookings({
        name: req.body.name,
        user : req.user
    })
    try {
        const newBooking = await booking.save()
        res.redirect(`bookings/${newBooking.id}`)
    } catch {
        res.render('bookings/new', {
            booking: booking,
            errorMsg: 'Error ' + error
        })
    }

});
router.get("/:id", Check , async function(req,res,err){
    try {
        const booking = await Bookings.findById(req.params.id).populate('User').exec()
        res.render('bookings/show', {
            booking: booking,
            user: req.user
        })
    } catch {
        res.redirect('/')
    }
})
router.get("/:id/edit", Check ,  async function(req,res){
    try{
        const booking = await Bookings.findById(req.params.id).populate('User')
        res.render('bookings/edit', { booking: booking, user: req.user});
    }catch{
        res.redirect('/edit')
    }


})
router.put('/:id', Check , async function(req,res){
    let booking
    try{
        booking = await Bookings.findById(req.params.id).populate('User')
        booking.name = req.body.name
        await booking.save()
        res.redirect(`/bookings/${booking.id}`)
   }catch{
       if (booking == null ){
            res.redirect("/")
      }
      else {
            res.render("bookings/edit", {
                booking: booking,
                errorMsg: "Error Message"
            })
       }
      res.send("Broken")
    }
})
router.delete("/:id", Check , async function(req,res){
    let booking
    try{
        booking = await Bookings.findById(req.params.id).populate('User')
        await booking.remove()
        res.redirect('/bookings')
    }catch{
        if (booking == null ){
            res.redirect("/")
        }
        else {
            res.redirect(`/bookings/${booking.id}`)

        }
        res.send("Broken")
    }
})

module.exports = router;