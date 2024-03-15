// notes.js

// Function to create a new note input field
function createNoteInput() {
  // Create input elements for note title and text
  const noteTitleInput = document.createElement("input");
  noteTitleInput.type = "text";
  noteTitleInput.placeholder = "Note Title";

  const noteTextInput = document.createElement("textarea");
  noteTextInput.placeholder = "Note Text";

  // Create save button
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", function () {
    saveNote(noteTitleInput.value, noteTextInput.value);
  });

  // Append input elements and save button to note details section
  const noteDetails = document.getElementById("noteDetails");
  noteDetails.innerHTML = ""; // Clear previous note details
  noteDetails.appendChild(noteTitleInput);
  noteDetails.appendChild(noteTextInput);
  noteDetails.appendChild(saveButton);
}

// Function to save a new note
function saveNote(title, text) {
  // Send a POST request to the server to save the new note
  fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, text }),
  })
    .then((response) => response.json())
    .then((newNote) => {
      // Display the new note in the existing notes list
      const listItem = document.createElement("li");
      listItem.textContent = newNote.title;
      document.getElementById("notesList").appendChild(listItem);
      // Clear the note details section
      document.getElementById("noteDetails").innerHTML = "";
    })
    .catch((error) => console.error("Error saving note:", error));
}

// Event listener for the "New Note" button
document
  .getElementById("newNoteButton")
  .addEventListener("click", createNoteInput);
