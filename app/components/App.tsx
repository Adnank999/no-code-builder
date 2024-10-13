"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import TopBar from "./TopBar";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { Providers } from "@/redux/provider";

import Preview from "./Preview";

import SourceCodeViewer from "./SourceCodeViewer";

const App = () => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [elements, setElements] = useState([]);
  const [isSourceCodeMode, setIsSourceCodeMode] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [files, setFiles] = useState({});

  

  useEffect(() => {

    fetch('/api/loadSourceCode')
      .then((response) => response.json())
      .then((data) => {
        setFiles(data.files); 
      })
      .catch((error) => {
        console.error('Error fetching source code files:', error);
      });
  }, []);

  

  const handlePreview = () => {
    setIsPreviewMode(true);
  };

    const handleSourceCode = () => {
    setIsSourceCodeMode(true);
  };

  const handleBackFromSourceCode = () => {
    setIsSourceCodeMode(false);
  };



  return (


    <Providers>
    <div>
      <DndProvider backend={HTML5Backend}>
        <div className="h-screen flex flex-col">
          <TopBar onPreview={handlePreview} onSourceCode={handleSourceCode} isPreviewMode={isPreviewMode} setIsPreviewMode={setIsPreviewMode}/>

          {!isPreviewMode && !isSourceCodeMode ? (
            <div className="flex flex-row">
              <Sidebar />
              <Canvas elements={elements} setElements={setElements} croppedImage={croppedImage} setCroppedImage={setCroppedImage}/>
            </div>
          ) : isPreviewMode ? (
            <div className="w-full h-full">
              <Preview elements={elements}  croppedImage={croppedImage}/>
            </div>
          ) : isSourceCodeMode ? (
            <div className="w-full h-full">
              <SourceCodeViewer files={files} handleBack={handleBackFromSourceCode}/>
              
            </div>
          ) : null}
        </div>
      </DndProvider>
    </div>
  </Providers>
  );
};

export default App;
