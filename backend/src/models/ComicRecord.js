import mongoose from "mongoose";

/* ---------- PANEL SCHEMA ---------- */
const panelSchema = new mongoose.Schema({
  panelOrder: {
    type: Number,
    required: true
  },
  dialogueText: {
    type: String,
    default: ""
  },
  captionText: {
    type: String,
    default: ""
  }
});

/* ---------- COMMENT SCHEMA ---------- */
const commentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true
  },
  commentedAt: {
    type: Date,
    default: Date.now
  }
});

/* ---------- MAIN COMIC SCHEMA ---------- */
const comicSchema = new mongoose.Schema(
  {
    recordId: {
      type: String,
      required: true,
      unique: true,
      default: () => Date.now().toString()
    },

    creatorName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      default: "creator@email.com"
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["Story", "Meme", "Superhero", "Horror", "Fantasy"],
      default: "Story"
    },

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft"
    },

    panels: {
      type: [panelSchema],
      default: []
    },

    comments: {
      type: [commentSchema],
      default: []
    }
  },
  { timestamps: true }
);

const ComicRecord = mongoose.model("ComicRecord", comicSchema);

export default ComicRecord;