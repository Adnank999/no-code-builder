import { useEffect, useState } from "react";
import { debounce } from "lodash";

const TextEditorSidebar = ({ element, onUpdate }) => {
  const [fontSize, setFontSize] = useState(element.fontSize || 16);
  const [alignment, setAlignment] = useState(element.alignment || "left");
  const [fontFamily, setFontFamily] = useState(element.fontFamily || "Arial");
  const [fontStyle, setFontStyle] = useState(element.fontStyle || "normal");
  const [color, setColor] = useState(element.color || "#000000");
  const [lineHeight, setLineHeight] = useState(element.lineHeight || 1.5);
  const [lineSpacing, setLineSpacing] = useState(element.lineSpacing || 0);

  console.log("updatedElement", element);

  const debouncedUpdate = debounce((updatedElement) => {
    onUpdate(updatedElement);
  }, 300);

  useEffect(() => {
    const updatedElement = {
      ...element,
    
      fontSize,
      alignment,
      fontFamily,
      fontStyle,
      color,
      lineHeight,
      lineSpacing,
    };

    debouncedUpdate(updatedElement);

    return () => debouncedUpdate.cancel();
  }, [
   
    fontSize,
    alignment,
    fontFamily,
    fontStyle,
    color,
    lineHeight,
    lineSpacing,
  ]);

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="font-bold mb-4">Text Editor</h2>

     
      <div className="mb-4">
        <label>Font Size</label>
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full border p-1"
        />
      </div>

      
      <div className="mb-4">
        <label>Alignment</label>
        <div className="flex gap-2">
          <button
            onClick={() => setAlignment("left")}
            className={`p-2 ${
              alignment === "left" ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            Left
          </button>
          <button
            onClick={() => setAlignment("center")}
            className={`p-2 ${
              alignment === "center" ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            Center
          </button>
          <button
            onClick={() => setAlignment("right")}
            className={`p-2 ${
              alignment === "right" ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            Right
          </button>
        </div>
      </div>

    
      <div className="mb-4">
        <label>Font Family</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="w-full border p-1"
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>

      
      <div className="mb-4">
        <label>Font Style</label>
        <select
          value={fontStyle}
          onChange={(e) => setFontStyle(e.target.value)}
          className="w-full border p-1"
        >
          <option value="normal">Normal</option>
          <option value="italic">Italic</option>
          <option value="bold">Bold</option>
        </select>
      </div>

     
      <div className="mb-4">
        <label>Font Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full border p-1"
        />
      </div>

    
      <div className="mb-4">
        <label>Line Height</label>
        <input
          type="number"
          step="0.1"
          value={lineHeight}
          onChange={(e) => setLineHeight(Number(e.target.value))}
          className="w-full border p-1"
        />
      </div>

     
      <div className="mb-4">
        <label>Line Spacing</label>
        <input
          type="number"
          value={lineSpacing}
          onChange={(e) => setLineSpacing(Number(e.target.value))}
          className="w-full border p-1"
        />
      </div>
    </div>
  );
};

export default TextEditorSidebar;
