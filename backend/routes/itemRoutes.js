import express from "express";
import Item from "../models/Item.js";

const router=express.Router();

router.get("/",async(req,res)=>{
    try {
        const items=await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});
router.get("/:id",async(req,res)=>{
    try {
        const item=await Item.findById(req.params.id);
        res.json(item);
    
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

router.post("/", async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;