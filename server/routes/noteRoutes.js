const express = require('express');
const {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteController.js");
const { protect} = require("../middleware/authMiddleware.js");

const router = express.Router();

console.log({
  getNotes,
  createNote,
  deleteNote,
  updateNote
});

router.get("/", protect, getNotes);
router.post("/", protect, createNote);
router.delete("/:id", protect, deleteNote);
router.put("/:id", protect, updateNote);

module.exports = router;