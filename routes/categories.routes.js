const express = require('express')
const router = express.Router()
const Category = require("../models/Category")

//create categoria
router.post('/', async (req, res) => {
    const newCat = new Category(req.body);
    try{
        const saveCat = await newCat.save();
        res.status(200).json(saveCat)
    }catch(err){
        res.json({error: true, message: err.message});
    }
})

//get categoria
router.get('/', async (req, res) => {
    try{
        const Cat = await Category.find();
        res.status(200).json(Cat)
    }catch(err){
        res.json({error: true, message: err.message});
    }
})

module.exports = router;