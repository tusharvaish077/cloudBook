const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Notes');

// Route 1: create a notes using : Get "api/notes/getuser" Login requierd;
router.get('/fetchallnotes', fetchUser, async(req, res)=>{
    try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2: Adding a new Note using : Post "api/notes/addnote" Login requierd;
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 2 }),
    body('description', 'description must have a minimum of 5 characters').isLength({ min: 5 }),
    ], async(req, res)=>
    {
    try {
        const {title, description, tag}= req.body;
        // If error occurs the return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user : req.user.id
        });
        // this new note will return a promise
        const savednote = await note.save()
        res.json(savednote);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})


// Route 3: Update an existing note using : PUT "api/notes/updatenote" Login requierd;
router.put('/updatenote/:id', fetchUser, async(req, res)=>{
    const {title, description, tag} = req.body;
    try {
    
        //create a new note object
        const newNote ={};
        if(title) {newNote.title = title};
        if(description) {newNote.description = description};
        if(tag) {newNote.tag = tag};
    
        //find the note to be updated and update
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")} //agar user present hi nahi hai to
    
        if(note.user.toString() !== req.user.id){ // agar dusari ki id se acces karna chah raha hai 
            return res.status(401).send("Not Allowed");
        }
        //yaha tak aa gaya matlab sab kuch shi chal raha hai
        note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
        res.json({note});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})

// Route 4: Delete an existing note using : DELETE "api/notes/deletenote" Login required;
router.delete('/deletenote/:id', fetchUser, async(req, res)=>{
    const {title, description, tag} = req.body;
    try {
    
        //find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")} //agar user present hi nahi hai to
    
        if(note.user.toString() !== req.user.id){ // agar dusari ki id se acces karna chah raha hai 
            return res.status(401).send("Not Allowed");
        }
        //yaha tak aa gaya matlab sab kuch shi chal raha hai
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success" : "Note has been deleted successfully", note:note});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }


})

module.exports = router
