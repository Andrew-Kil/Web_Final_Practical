import React from "react";

export default function SearchForm(props) {
  return (
    <form onSubmit={props.handleSubmit} className="form-songs">
      <label htmlFor="submit-button" className="ubuntu-font">
        Search By Title:{" "}
      </label>
      <input
        type="text"
        name="search"
        onChange={props.handleChange}
        value={props.search}
        id="search-input-field"
      />
      <button type="submit" id="submit-button" className="ubuntu-font">
        Submit
      </button>
    </form>
  );
}
