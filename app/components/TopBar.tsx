import { Dispatch, SetStateAction } from "react";

interface Props{
    onPreview : () =>void;
    onSourceCode: ()=>void;
    isPreviewMode: boolean;
    setIsPreviewMode: Dispatch<SetStateAction<boolean>>;
}

const TopBar = ({ onPreview, onSourceCode,isPreviewMode,setIsPreviewMode }:Props) => {
    return (
      <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
        <button onClick={onPreview} className="bg-blue-500 text-white px-4 py-2 rounded">Preview</button>
        <button onClick={()=> setIsPreviewMode(false)} className={`bg-red-500 text-white px-4 py-2 rounded ${isPreviewMode ? 'block' : 'hidden'}`}>Go Back</button>
        <button onClick={onSourceCode} className="bg-green-500 text-white px-4 py-2 rounded">See Source Code</button>
      </div>
    );
  };
  
  export default TopBar;