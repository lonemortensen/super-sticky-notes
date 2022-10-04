/*
====================================================================
Project:  Super Sticky Notes 
Description:  An interactive web application built with React JS. 
The app lets users:
- Create new sticky notes
- Edit notes
- Delete notes
- Search through their notes
Background: Course work for Skillcrush's "Introduction to 
JavaScript React" course. 
                            
===== *** =====

The App.js module is a stateful component that contains the app's 
data logic and delegates rendering logic to the app's presentational 
components. 

The App component manages the notes and their contents as created, 
edited, and deleted by the user, and the search input as entered 
in the search field by the user. 

Notes are saved to/retrieved from the browser's local storage from
session to session.  
====================================================================
*/

import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  //Adds a new note when user clicks the New Note button:

  addNote = () => {
    const newNoteData = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    const createNewNote = [newNoteData, ...this.state.notes];
    this.setState({ notes: createNewNote });
  };

  //Edits text when user types in a note's title or description fields:

  onType = (noteId, updatedKey, updatedValue) => {
    //Callback function finds and updates edited note:
    const updateEditedNote = (note) => {
      if (note.id !== noteId) {
        return note;
      } else if (updatedKey === "title") {
        note.title = updatedValue;
        return note;
      } else {
        note.description = updatedValue;
        return note;
      }
    };
    //Creates a new notes array with the updated note:
    const updatedNotes = this.state.notes.map(updateEditedNote);
    this.setState({ notes: updatedNotes });
  };

  //Searches through notes based on user input in the search field:

  onSearch = (inputText) => {
    let lowerCaseInputText = inputText.toLowerCase();
    /* Callback function compares title and description text to search text, 
    and updates the doesMatchSearch property: */
    const compareSearchInput = (note) => {
      const lowerCaseTitleText = note.title.toLowerCase();
      const lowerCaseDescriptionText = note.description.toLowerCase();

      if (!lowerCaseInputText) {
        //Sets doesMatchSearch to true and shows all notes if search field is empty:
        note.doesMatchSearch = true;
        return note;
      } else if (
        lowerCaseTitleText.includes(lowerCaseInputText) ||
        lowerCaseDescriptionText.includes(lowerCaseInputText)
      ) {
        note.doesMatchSearch = true;
        return note;
      } else {
        note.doesMatchSearch = false;
        return note;
      }
    };
    //Creates a new notes array with the notes that match the search text:
    const showMatchingNotes = this.state.notes.map(compareSearchInput);
    this.setState({ notes: showMatchingNotes, searchText: lowerCaseInputText });
  };

  //Deletes a note when user clicks on X:

  deleteNote = (noteId) => {
    const findNotesToKeep = (note) => {
      if (note.id !== noteId) {
        return note;
      }
    };
    const keepTheseNotes = this.state.notes.filter(findNotesToKeep);
    this.setState({ notes: keepTheseNotes });
  };

  //Saves notes to browser's local storage every time state changes:

  componentDidUpdate() {
    const savedNotesString = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", savedNotesString);
  }

  //Retrieves saved notes from browser's local storage when browser re-opens:

  componentDidMount() {
    const savedNotesString = localStorage.getItem("savedNotes");
    if (savedNotesString) {
      const savedNotes = JSON.parse(savedNotesString);
      this.setState({ notes: savedNotes });
    }
  }

  render() {
    return (
      <div>
        <Header
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          deleteNote={this.deleteNote}
        />
      </div>
    );
  }
}

export default App;
