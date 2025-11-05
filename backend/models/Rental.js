import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  itemName: { type: String, required: true },
  category: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalCost: { type: Number, required: true },
  status: { type: String, default: "Active" } // Active | Returned | Expired
});

export default mongoose.model("Rental", rentalSchema);
