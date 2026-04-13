const Note = require("../models/Note.js");

// GET NOTES
  const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE NOTE
 const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = new Note({
      title,
      content,
      user: req.user,
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE NOTE
 const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE NOTE
 const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { 
  getNotes,
  createNote,
  deleteNote,
  updateNote
}