import { useEffect, useState } from "react";


interface TextElementProps {
  id: number;
  text: string;
  onTextChange: (id: number, newText: string) => void;
}

const TextElement = ({ text, id,onTextChange }: TextElementProps) => {
  
  const [inputValue, setInputValue] = useState(text);

  const handleTextChange = (e:any) => {
    const updatedText = e.target.value;
    setInputValue(updatedText);
    onTextChange(id, updatedText); 
  };

  useEffect(() => {
    setInputValue(text); 
  }, [text]);

  return (
    <div className="text-editor border p-2 cursor-pointer">
      <input
        type="text"
        className="border w-full"
        value={inputValue}
        onChange={handleTextChange}
      />
    </div>
  );
};

export default TextElement;
