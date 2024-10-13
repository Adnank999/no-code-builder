import React, { LegacyRef, useRef, useState } from "react";

interface ImageElementProps {
  onSrcChange: (newSrc: string) => void;
  croppedImage: string | null;
  imageRef: HTMLImageElement | null;
}

const ImageElement = ({
  onSrcChange,
  croppedImage,
  imageRef,
}: ImageElementProps) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    const newImageUrl = URL.createObjectURL(file);

    setImageUrl(newImageUrl);
    if (file) {
      onSrcChange(newImageUrl);
    }
  };

  const divRef = useRef<HTMLDivElement | null>(null);
  const newImageRef = useRef<HTMLImageElement | null>(imageRef);
  return (
    <div className="p-2 border" ref={divRef}>
      {croppedImage ? (
        <img
          src={croppedImage}
          alt="Cropped"
          className="w-[50%] h-auto"
          ref={newImageRef}
        />
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="w-[50%] h-auto"
          ref={newImageRef}
        />
      ) : (
        <input type="file" onChange={handleImageUpload} />
      )}
    </div>
  );
};

export default ImageElement;
