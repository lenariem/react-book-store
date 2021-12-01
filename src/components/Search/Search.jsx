import React, { useState } from "react";
import {API_URL} from '../../config';
import "./Search.css";

export default function Search({ getData, goodsLength }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearchTerm = (e) => {
    let term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleSearch = () => {
    if (searchTerm) {
      getData(`${API_URL}search/`, searchTerm);
    }
  };

  //search by Enter press
  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="row">
        <div className="input-field col s12">
          <input
            type="text"
            className="validate"
            placeholder="Search..."
            maxLength="130"
            value={searchTerm}
            onChange={handleSearchTerm}
            onKeyPress={handleKey}
            onClick={() => {
              setSearchTerm("");
            }}
          />

          <button
            className="btn search-btn deep-purple darken-2"
            onClick={() => handleSearch()}
          >
            <i className="material-icons">search</i>
          </button>
        </div>
      </div>

      {searchTerm && <p>Found books: {goodsLength} </p>}
    </>
  );
}
