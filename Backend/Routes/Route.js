const express = require('express');
const router = express.Router();
const Category = require('./Schema.js');


router.get('/', async (req, res) => {
    try {
        const cases = await Category.find();
        res.json(cases);
    } catch (err) {
        res.status(500).json({ error: "Error occurred while fetching data" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const caseFound = await Category.findById(req.params.id);
        if (!caseFound) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(caseFound);
    } catch (err) {
        res.status(500).json({ error: "Error occurred while fetching data" });
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
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(400).json({ error: "Error occurred while saving data" });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(updatedCategory);
    } catch (err) {
        res.status(500).json({ error: "Error occurred while updating category" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json("Category deleted");
    } catch (err) {
        res.status(500).json({ error: "Error occurred while deleting category" });
    }
});

module.exports = router;
