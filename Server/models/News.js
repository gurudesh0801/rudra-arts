import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: "",
    },
    isHide: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("News", newsSchema);
