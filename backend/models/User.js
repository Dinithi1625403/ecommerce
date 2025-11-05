import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: 6,
    },
    phone: String,
    address: String,
    profilePic: String, // store filename or URL
    role: { type: String, enum: ["Renter", "Owner"], default: "Renter" },
  },
  { timestamps: true }
);

export default model("User", userSchema);
