import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the default styles for the editor

const MyEditor = () => {
  const [editorValue, setEditorValue] = useState("");

  const handleChange = (value) => {
    setEditorValue(value);
  };

  return (
    <div>
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ align: [] }],
            ["link", "image"],
            ["blockquote"],
          ],
        }}
      />
      <div>
        <h3>Editor Content:</h3>
        <div>{editorValue}</div>
      </div>
    </div>
  );
};

export default MyEditor;
