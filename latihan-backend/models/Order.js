import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, default: "Adventure" },
    status: { type: String, default: "Menunggu" },
    progress: { type: String, default: "0%" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
