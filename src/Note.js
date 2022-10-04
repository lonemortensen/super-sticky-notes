/*
====================================================================
Project: Super Sticky Notes 

Note.js contains a presentational component that renders a single 
sticky note. A sticky note consists of title and description
fields, and a delete functionality (X). 

The Note component's event listeners trigger updates to state (data) 
in the App component when users:
- enter or edit text in the title or description fields of a note, or 
- delete a note by clicking the X in the note's top right corner. 
====================================================================
*/

import React from "react";

const Note = (props) => {
  /* Updates title field. Passes id, key parameter, and 
  text input from onChange event to onType method in the App component: */
  const updateTitle = (event) => {
    const noteId = props.note.id;
    const updatedValue = event.target.value;
    props.onType(noteId, "title", updatedValue);
  };

  /* Updates description field. Passes id, key parameter, and 
  text input from onChange event to onType method in the App component: */
  const updateDescription = (event) => {
    const noteId = props.note.id;
    const updatedValue = event.target.value;
    props.onType(noteId, "description", updatedValue);
  };

  //Passes id from onClick event to deleteNote method in the App component:
  const removeNoteOnClick = () => {
    props.deleteNote(props.note.id);
  };

  return (
    <div>
      <li className="note">
        <input
          className="note__title"
          type="text"
          placeholder="Title"
          value={props.note.title}
          onChange={updateTitle}
        />
        <textarea
          className="note__description"
          placeholder="Description..."
          value={props.note.description}
          onChange={updateDescription}
        />
        <span className="note__delete" onClick={removeNoteOnClick}>
          X
        </span>
      </li>
    </div>
  );
};

export default Note;
