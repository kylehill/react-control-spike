import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const convertToHumanReadableSize = size => {
  const labels = ["bytes", "KB", "MB", "GB"];
  for (let i = 0; i < labels.length; i++) {
    const dividedSize = size / Math.pow(1024, i);
    if (dividedSize < 1024) {
      return `${dividedSize.toFixed(1)} ${labels[i]}`;
    }
  }

  return "real dang big wtf";
};

const DropComponent = props => {
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();
    const file = acceptedFiles[0];
    reader.onload = () => {
      props.onFileUpload({
        name: file.name,
        size: file.size,
        type: file.type,
        result: reader.result
      });
    };

    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="drop-container">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop files here ...</p>
        ) : (
          <p>Drag 'n' drop a file here, or click to select</p>
        )}
      </div>
      <ul>
        {props.files.map((file, index) => {
          return (
            <li key={index}>
              {file.name} - {convertToHumanReadableSize(file.size)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropComponent;
