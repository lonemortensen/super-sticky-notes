/*
====================================================================
Project: Super Sticky Notes 

The NotesList.js module contains a presentational component that 
renders a list of sticky notes.

The NotesList component displays the user's notes in the UI. The 
notes displayed are determined by:
- the total number of notes the user has, and
- the user's search input when looking for specific (existing) 
notes. 

If the user has entered text in the search field, only the notes 
that match the search input are displayed. (If the search field is 
empty, the component displays all of the user's notes).
====================================================================
*/

import React from "react";
import Note from "./Note.js";

const NotesList = (props) => {
  //Removes notes that don't match the search input:
  const positiveMatches = (note) => note.doesMatchSearch === true;
  const keepTheseNotes = props.notes.filter(positiveMatches);
  const renderNote = (note) => (
    <Note
      note={note}
      key={note.id}
      onType={props.onType}
      deleteNote={props.deleteNote}
    />
  );
  //Ensures only notes with a doesMatchSearch value of true are displayed:
  const noteElement = keepTheseNotes.map(renderNote);

  return (
    <div>
      <ul className="notes-list">{noteElement}</ul>
    </div>
  );
};

export default NotesList;
