const express = require('express');
const { body, validationResult } = require('express-validator');
const Fetchuser = require('../middleware/Fetchuser');
const Notes = require('../models/Notes');

const router = express.Router();

//Route1: Route to fetch all notes of the user using: GET '/api/notes/fetchallnotes'. Requires authentication.
router.get('/fetchallnotes', Fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    const userNotes = await Notes.find({ user: userID });
    res.json(userNotes);
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route 2: Route to add notes of the user using: POST '/api/notes/addnotes'. Requires authentication.
router.post('/addnotes', Fetchuser,[
  body('title', 'Title must be at least 3 characters long').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;

  try {
    const note = new Notes({
      user: req.user.id,
      title,
      description
    });

    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error('Error adding note:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//Route 3 Update an existing note using PUT:'/api/notes/updatenote' :Authorization required.
router.put('/updatenote/:id',Fetchuser,[
  body('title', 'Title must be at least 3 characters long').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters long').isLength({ min: 5 }),
],async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;
  try {
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};

    const userID = req.user.id;
    const note=await Notes.findById(req.params.id);

    if(!note)
    { 
      return res.status(404).json({ error: 'Note not found' });
    }

    if(note.user.toString()!==userID)
    {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json(updatedNote);
    


  }catch (error) {
    console.error('Error adding note:', error.message);
    res.status(500).json({ error: 'Server error' });
  }


});

// Route 4: Delete an existing note using DELETE '/api/notes/deletenote/:id'. Requires authentication.
router.delete('/deletenote/:id', Fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    if (note.user.toString() !== userID) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const deletedNote = await Notes.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully', deletedNote });

  } catch (error) {
    console.error('Error deleting note:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;
