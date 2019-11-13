import React from "react";
import ReactQuill from "react-quill";
import DropComponent from "./DropComponent";

import "./App.css";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"]
  ]
};

class App extends React.Component {
  state = {
    text: "",
    files: []
  };

  handleChange = value => {
    this.setState({
      text: value
    });
  };

  handleFileUpload = file => {
    this.setState({
      files: this.state.files.concat(file)
    });
  };

  render() {
    return (
      <div className="app">
        <div className="text-editor">
          <ReactQuill
            theme="snow"
            value={this.state.text}
            onChange={this.handleChange}
            modules={modules}
          />
        </div>
        <DropComponent
          onFileUpload={this.handleFileUpload}
          files={this.state.files}
        />

        <button
          onClick={() => {
            console.log(this.state);
          }}
        >
          throw component state into console.log
        </button>
      </div>
    );
  }
}

export default App;
