/*
====================================================================
Project: Super Sticky Notes 

The Header.js module is a presentational component that renders 
the header of the app. The header includes the headline, a New Note
button, and a search field. 

The Header component's event listeners trigger updates to state (data) 
in the App component when users: 
- enter text in the search field to search for existing notes, or  
- click the New Note button to create a new note.  
====================================================================
*/

import React from "react";

const Header = (props) => {
  //Passes search input from onChange event to onSearch method in the App component:
  const getSearchInput = (event) => {
    const inputText = event.target.value;
    props.onSearch(inputText);
  };

  return (
    <div>
      <header>
        <h1 className="app-header__title">Super Sticky Notes</h1>
        <aside className="app-header__controls">
          {/* onClick event passes a reference to addNote method in the App component: */}
          <button className="add-new" onClick={props.addNote}>
            + New Note
          </button>
          <input
            className="search"
            type="text"
            placeholder="Type here to search..."
            value={props.searchText}
            onChange={getSearchInput}
          />
        </aside>
      </header>
    </div>
  );
};

export default Header;
