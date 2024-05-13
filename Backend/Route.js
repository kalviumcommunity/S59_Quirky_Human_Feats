const express = require('express');
const router = express.Router();
const Category = require('./Schema.js');

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const cases = await Category.find();
        res.json(cases);
    } catch (err) {
        res.json({ error: "Error occurred while fetching data" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const caseFound = await Category.findById(req.params.id);
        res.json(caseFound);
    } catch (err) {
        res.json({ error: "Error occurred while fetching data" });
    }
});

router.post('/add-Category', async (req, res) => {
   
    const newCategory = new Category({
        Category: req.body.Category,
        Quirk: req.body.Quirk,
        Name: req.body.Name,
        Level: req.body.Level
    });
    try {
        const savedCategory = await newCategory.save();
        res.json(savedCategory);
    } catch (err) {
        res.json({ error: "Error occurred while saving data" });
    }
});
router.patch('/:id' , async (req,res)=>{
    try{
        const Cat = await Category.findByIdAndUpdate(req.params.id, req.body , {new : true});
        if(!Cat){
            return res.status(404).json({error : "Category not found "})
        }
        res.json(Cat);
    }catch (err){
        res.status(500).send('Error: '+ err)
    }
})
router.put('/:id', async (req, res) => {
    try {
        const UpdatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!UpdatedCategory) {
            return res.status(404).json({ error: "Category not found " });
        }
        res.json(UpdatedCategory);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});


router.delete('/:id' , async (req , res)=>{
    try{
        const Cat = await Category.findByIdAndDelete(req.params.id);
        if(!Cat){
            return res.status(404).json({error : "Category not found "})
        }
        res.json("Category deleted");
    }catch (err){
        res.status(500).send('Error:')
    }
})
module.exports = router;

