import { useDrop } from "react-dnd";
import { Dispatch, useState } from "react";
import TextElement from "./TextElement";
import ImageElement from "./ImageElement";
import TextEditorSidebar from "./TextEditorSidebar";
import ImageEditorSidebar from "./ImageEditorSidebar";
import { Element } from "@/redux/elementSlice";

interface Props {
  elements: Element[];
  setElements: any;
  croppedImage: string | null;
  setCroppedImage: Dispatch<React.SetStateAction<string | null>>;
}

const Canvas = ({
  elements,
  setElements,
  croppedImage,
  setCroppedImage,
}: Props) => {
  const [activeElement, setActiveElement] = useState(null);

  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const [{ isOver }, drop] = useDrop({
    accept: "element",
    drop: (item: any) => {
      if (item.type === "text") {
        const newTextElement = {
          id: Date.now(),
          type: "text",
          text: "Edit your texts",
          fontSize: 16,
          alignment: "left",
          color: "#000",
          lineHeight: 1.5,
          fontFamily: "",
          fontStyle: "",
          lineSpacing: 0,
        };
        setElements((prev: any) => [...prev, newTextElement]);
      } else if (item.type === "image") {
        const newImageElement = {
          type: "image",
          src: "",
          id: Date.now(),
          width: 100,
          height: 100,
          position: "center",
          rotation: 0,
        };
        setElements((prev: any) => [...prev, newImageElement]);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleTextElementClick = (element: any) => {
    setActiveElement(element);
  };

  const handleImageElementClick = (element: any) => {
    setActiveElement(element);
  };

  const handleUpdateElement = (updatedElement: any) => {
    const updatedElements = elements.map((el) =>
      el.id === updatedElement.id ? updatedElement : el
    );
    setElements(updatedElements);
    setActiveElement(updatedElement);
  };

  const handleImageSrcChange = (element: Element, newSrc: string) => {
    const updatedImageElement = { ...element, src: newSrc };
    const updatedElements = elements.map((el) =>
      el.id === updatedImageElement.id ? updatedImageElement : el
    );
    setElements(updatedElements);
    setActiveElement(updatedImageElement);
    setCroppedImage(newSrc);
  };

  const handleTextChange = (id: number, newText: string) => {
    const updatedElement = elements.find((el) => el.id === id);

    if (updatedElement) {
      const newElement = { ...updatedElement, text: newText };

      handleUpdateElement(newElement);
    }
  };

  console.log("elements in Canvas", elements);
  return (
    <>
      {activeElement?.type === "text" && (
        <TextEditorSidebar
          element={activeElement}
          onUpdate={handleUpdateElement}
        />
      )}
      {activeElement?.type === "image" && (
        <ImageEditorSidebar
          element={activeElement}
          onUpdate={handleUpdateElement}
          onCropComplete={setCroppedImage}
          imageRef={imageRef}
          setImageRef={setImageRef}
        />
      )}

      {/* <div
        ref={drop}
        className="w-3/4 h-[100vh] bg-white p-4 relative border-2 border-t-black"
      >
        { elements.map((el) => {
          if (el?.type === "text") {
            return (
              <div key={el?.id} onClick={() => handleTextElementClick(el)}>
                <TextElement
                  id={el.id}
                  text={el.text}
                  onTextChange={handleTextChange}
                />
              </div>
            );
          }
          if (el.type === "image") {
            return (
              <div key={el.id} onClick={() => handleImageElementClick(el)}>
                <ImageElement
                  {...el}
                  croppedImage={croppedImage}
                  imageRef={imageRef}
                  onSrcChange={(newSrc: string) =>
                    handleImageSrcChange(el, newSrc)
                  }
                />
              </div>
            );
          }
          return null;
        })}
      </div> */}

      <div
        ref={drop}
        className="w-3/4 h-[100vh] bg-white p-4 relative border-2 border-t-black flex flex-col items-start justify-start"
      >
        {elements.length === 0 ? (
          <h1 className="text-4xl font-bold pl-10">Please Drag and Drop here</h1> // Show message when no elements
        ) : (
          elements.map((el) => {
            if (el?.type === "text") {
              return (
                <div key={el?.id} onClick={() => handleTextElementClick(el)}>
                  <TextElement
                    id={el.id}
                    text={el.text}
                    onTextChange={handleTextChange}
                  />
                </div>
              );
            }
            if (el?.type === "image") {
              return (
                <div key={el.id} onClick={() => handleImageElementClick(el)}>
                  <ImageElement
                    {...el}
                    croppedImage={croppedImage}
                    imageRef={imageRef}
                    onSrcChange={(newSrc: string) =>
                      handleImageSrcChange(el, newSrc)
                    }
                  />
                </div>
              );
            }
            return null;
          })
        )}
      </div>
    </>
  );
};

export default Canvas;
