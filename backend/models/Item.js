import { Schema, model } from "mongoose";

const itemSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter item title"],
        },
        price: {
            type: Number,
            required: [true, "Please enter item price"],
        },
        location: {
            type: String,
            required: [true, "Please enter item location"],
        },
        type: {
            type: String,
            required: [true, "Please enter item type (property/vehicle)"],
            enum: ["property", "vehicle"],
        },
        rating: {
            type: Number,
            default: 0,
        },
        reviews: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            required: [true, "Please provide an image URL"],
        },
        description: String,
    },
    { timestamps: true }
);

export default model("Item", itemSchema);