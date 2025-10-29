import mongoose from "mongoose";


const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Poll title is required"],
    trim: true
  },
  options: [
    {
      text: { type: String, required: true },
      votes: { type: Number, default: 0 }
    }
  ],
  owner: {
    type: String,
    required: [true, "Owner is required"],
    trim: true
  },
},{timestamps:true});

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;
