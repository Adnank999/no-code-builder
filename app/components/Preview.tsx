import { Element } from "@/redux/elementSlice";
import Image from "next/image";
import React from "react";

interface Props {
  elements: Element[];
  croppedImage: string | null;
}
const Preview = ({ elements, croppedImage }: Props) => {
  console.log("Elements in Preview", elements);
  return (
    <div className="w-full h-full">
      {elements.map((el) => {
        if ("text" in el) {
          return (
            <div
              key={el.id}
              style={{
                fontSize: `${el.fontSize}px`,
                textAlign: el.alignment,
                color: el.color,
                lineHeight: el.lineHeight ? `${el.lineHeight}` : "normal",
                fontStyle: el.fontStyle || "normal",
                fontFamily: el.fontFamily || "Arial, sans-serif",
                letterSpacing: el.lineSpacing
                  ? `${el.lineSpacing}px`
                  : "normal",
              }}
            >
              {el.text}
            </div>
          );
        }

        if ("src" in el) {
          const justifyClass =
            el.position === "right"
              ? "justify-end"
              : el.position === "center"
              ? "justify-center"
              : "justify-start";

          const itemsClass =
            el.position === "right"
              ? "items-end"
              : el.position === "center"
              ? "items-center"
              : "items-start";

          return (
            <div
              key={el.id}
              className={`flex flex-col ${itemsClass} ${justifyClass}`}
              style={{ transform: `rotate(${el.rotation}deg)` }}
            >
              {croppedImage ? (
                <Image
                  width={el.width}
                  height={el.height}
                  src={croppedImage}
                  alt="croppedImage"
                />
              ) : (
                <Image
                  width={el.width}
                  height={el.height}
                  src={el.src}
                  alt="Uploaded"
                />
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default Preview;
