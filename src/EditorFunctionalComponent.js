import logo from "./logo.svg";
import React, { Component, useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./App.css";

const EditorContainer = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    console.log(editorState);

    setEditorState(editorState);
  };

  return (
    <div className="editor">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          // image: {
          //   uploadCallback: uploadImageCallBack,
          //   alt: { present: true, mandatory: true },
          // },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <div>
      <h2>React Wysiwyg editor using Draft.js</h2>
      <EditorContainer />
    </div>
  );
}

export default App;
