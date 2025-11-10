import express from "express";
import Rental from "../models/Rental.js";

const router = express.Router();

// 📦 Get user's rentals
router.get("/my-rentals", async (req, res) => {
  try {
    const { userId } = req.query;
    const rentals = await Rental.find({ userId });
    res.json(rentals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching rentals" });
  }
});

// 🔁 Return a rental
router.post("/rentals/return/:id", async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({ message: "Rental not found" });

    rental.status = "Returned";
    await rental.save();
    res.json({ message: "Rental returned successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error returning rental" });
  }
});

// 📆 Extend a rental
router.post("/rentals/extend/:id", async (req, res) => {
  try {
    const { extraDays } = req.body;
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).json({ message: "Rental not found" });

    rental.endDate = new Date(rental.endDate.getTime() + extraDays * 24 * 60 * 60 * 1000);
    await rental.save();
    res.json({ message: `Rental extended by ${extraDays} days!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error extending rental" });
  }
});

export default router;
