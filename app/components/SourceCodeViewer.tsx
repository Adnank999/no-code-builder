import React, { useState } from "react";

import DirectoryView from "./DirectoryView";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
interface Props {
  files: { [key: string]: string };
  handleBack: ()=>void;
}
const SourceCodeViewer = ({ files,handleBack }: Props) => {
  const [selectedFileContent, setSelectedFileContent] = useState("");

  const handleFileClick = (filePath: string) => {
    setSelectedFileContent(files[filePath]);
  };

  console.log("selectedFileContent", selectedFileContent);

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r">
        <div className="flex flex-row justify-between items-baseline gap-4">
          <h2 className="text-lg font-bold mb-4">Source Code</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4"
            onClick={handleBack}
          >
            Back
          </button>
        </div>

        <DirectoryView files={files} onFileClick={handleFileClick} />
      </div>

      <div className="w-3/4 p-4 ">
        {selectedFileContent ? (
          <SyntaxHighlighter language="typescript" style={coldarkDark}>
            {selectedFileContent}
          </SyntaxHighlighter>
        ) : (
          <p>Select a file to view its content</p>
        )}
      </div>
    </div>
  );
};

export default SourceCodeViewer;
