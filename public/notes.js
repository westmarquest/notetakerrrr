// Function to show the new note form
function showNewNoteForm() {
  console.log("new note button clicked");
  document.getElementById("newNoteForm").style.display = "block";
  document
    .getElementById("noteDetails")
    .appendChild(document.getElementById("newNoteForm"));
}

// Event listener to trigger the showNewNoteForm function when the "New Note" button is clicked
document
  .getElementById("showNewNoteForm")
  .addEventListener("click", showNewNoteForm);

// Get the values from the form fields
const noteTitle = document.getElementById("noteTitle").value;
const noteText = document.getElementById("noteText").value;

// Function to clear the form fields
function clearForm() {
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteText").value = "";
}

// Function to fetch and display existing notes
function displayExistingNotes() {
  fetch("/api/notes")
    .then((response) => response.json())
    .then((notes) => {
      const notesList = document.getElementById("notesList");
      notes.forEach((note) => {
        const listItem = document.createElement("li");
        listItem.classList.add("note-item");
        listItem.textContent = note.title;
        listItem.dataset.id = note.id; // Store note ID as a data attribute

        // Add event listener to note title to display note details
        listItem.addEventListener("click", () => displayNoteDetails(note));

        const deleteButton = document.createElement("span");
        deleteButton.textContent = "🗑️";
        deleteButton.classList.add("delete-button");

        // Add event listener to delete button to delete the note
        deleteButton.addEventListener("click", (event) =>
          deleteNote(event, note.id)
        );

        listItem.appendChild(deleteButton);
        notesList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching notes:", error.message));
}

// Call the function to display existing notes when the page loads
window.addEventListener("load", displayExistingNotes);

// Function to handle form submission and save new note
document
  .getElementById("noteForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // const noteTitleText = document.createTextNode(newNote.title);
    // noteContent.appendChild(noteTitleText);

    // Make a POST request to save the new note to the server
    console.log("POST request URL:", "/api/notes");
    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteTitle, noteText }),
    })
      .then((response) => response.json())
      .then((newNote) => {
        const listItem = document.createElement("li");
        listItem.classList.add("note-item");
        listItem.textContent = newNote.title;
        listItem.dataset.id = newNote.id; // Store note ID as a data attribute
        listItem.addEventListener("click", () => displayNoteDetails(newNote));
        const deleteButton = document.createElement("span");
        deleteButton.textContent = "🗑️";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", (event) =>
          deleteNote(event, newNote.id)
        );
        listItem.appendChild(deleteButton);
        document.getElementById("notesList").appendChild(listItem);
        clearForm();
      })
      .catch((error) => console.error("Error saving note:", error));
  });

// Function to display note details when a note is clicked
function displayNoteDetails(note) {
  document.getElementById("noteTitle").textContent = note.title;
  document.getElementById("noteText").textContent = note.text;
}

// Function to delete a note
function deleteNote(event, id) {
  event.stopPropagation(); // Prevent event from bubbling up
  fetch(`/api/notes/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        const listItem = event.target.parentElement;
        listItem.remove();
        if (
          document.getElementById("noteTitle").textContent ===
          listItem.textContent
        ) {
          document.getElementById("noteTitle").textContent = "";
          document.getElementById("noteText").textContent = "";
        }
      }
    })
    .catch((error) => console.error("Error deleting note:", error));
}

// Event listener to trigger the hideNewNoteForm function when the "Cancel" button is clicked
document
  .getElementById("cancelButton")
  .addEventListener("click", hideNewNoteForm);

// Function to hide the new note form
function hideNewNoteForm() {
  if (event.target.id === "cancelButton") {
    document.getElementById("newNoteForm").style.display = "none";
  }
}
