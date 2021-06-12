import logo from "./logo.svg";
import React, { Component, useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./App.css";

const EditorContainer = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // const [editorState, setEditorState] = useState();

  useEffect(() => {
    // Is for Edit...
    const sampleMarkup =
      "<b>Bold text</b>, <i>Italic text</i><br/ ><br />" +
      '<a href="http://www.google.com">Example link</a>';
    const blocksFromHtml = htmlToDraft(sampleMarkup);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    setEditorState(EditorState.createWithContent(contentState));
    // Is for create...
    // ...NOTHING...
  }, []);

  const onEditorStateChange = (editorState) => {
    // console.log(editorState);
    // console.log(convertToRaw(editorState.getCurrentContent()));
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

    setEditorState(editorState);
  };

  // Set the store blob!
  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID ##clientid##");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error);
        reject(error);
      });
    });
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
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true },
          },
        }}
      />
      <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      ></textarea>
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
