// apiRoutes.js

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Route to retrieve existing notes
router.get("/api/notes", (req, res) => {
  // Read the db.json file to get existing notes
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Error reading notes" });
    }

    let notes = [];
    if (data) {
      try {
        // Parse the JSON data if it's not empty
        notes = JSON.parse(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return res.status(500).json({ error: "Error parsing JSON data" });
      }
    }

    // Send the notes as response
    res.json(notes);
  });
});

// Route to save a new note
router.post("/api/notes", (req, res) => {
  // Get the new note from the request body
  const newNote = req.body;
  // Read the db.json file to get existing notes
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Error reading notes" });
    }
    // Parse the JSON data
    const notes = JSON.parse(data);
    // Assign a unique ID to the new note
    newNote.id = Date.now();
    // Add the new note to the array of notes
    notes.push(newNote);
    // Write the updated notes back to the db.json file
    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes),
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).json({ error: "Error saving note" });
        }
        // Send the new note as response
        res.json(newNote);
      }
    );
  });
});

// Route to delete a note by ID
router.delete("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  // Read the db.json file to get existing notes
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Error reading notes" });
    }
    // Parse the JSON data
    let notes = JSON.parse(data);
    // Find the index of the note with the given ID
    const index = notes.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      // Remove the note from the array
      notes.splice(index, 1);
      // Write the updated notes back to the db.json file
      fs.writeFile(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(notes),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).json({ error: "Error deleting note" });
          }
          // Send success response
          res.status(200).json({ message: "Note deleted successfully" });
        }
      );
    } else {
      // If note with given ID is not found, send 404 error
      res.status(404).json({ error: "Note not found" });
    }
  });
});

module.exports = router;
