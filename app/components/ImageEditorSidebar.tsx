import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageEditorSidebar = ({ element, onUpdate, onCropComplete, imageRef, setImageRef }) => {
  const [position, setPosition] = useState(element.position || "center");
  const [size, setSize] = useState({
    width: element.width || 200,
    height: element.height || 200
  });

  
  const [rotation, setRotation] = useState(element.rotation || 0);


  const debouncedUpdate = debounce((updatedElement) => {
    onUpdate(updatedElement);
  }, 300);

  useEffect(() => {
   
    const updatedElement = {
      ...element,
      position,
      rotation,
      width: size.width,
      height: size.height,
    };

    debouncedUpdate(updatedElement);


    return () => debouncedUpdate.cancel(); 
  }, [position, rotation, size]);


  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    aspect: 1, // Optional: lock aspect ratio to square (remove if you want free crop)
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  const handleCropComplete = (newCrop: Crop) => {
    setCompletedCrop(newCrop);
  };

  const handleImageLoaded = (image: HTMLImageElement) => {
    setImageRef(image); 
  };

  const handleConfirmCrop = () => {
    if (completedCrop && imageRef) {
      const canvas = document.createElement('canvas');
      const scaleX = imageRef.naturalWidth / imageRef.width;
      const scaleY = imageRef.naturalHeight / imageRef.height;

      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          imageRef,
          completedCrop.x * scaleX,
          completedCrop.y * scaleY,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY,
          0,
          0,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY
        );

        canvas.toBlob((blob) => {
          if (blob) {
            const croppedUrl = URL.createObjectURL(blob);
            onCropComplete(croppedUrl); // Send cropped image back to parent (Canvas)
          }
        }, 'image/jpeg');
      }
    }
  };


  const handleResize = (width, height) => {
    setSize({ width, height });
  };

  const handleRotate = (degree) => {
    setRotation(degree);
  };

  const handlePosition = (pos) => {
    setPosition(pos);
  };

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="font-bold mb-4">Image Editor</h2>
      {element && (
        <ReactCrop
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onComplete={handleCropComplete}
          aspect={1}
        >
          <img src={element.src} ref={imageRef} onLoad={(e) => handleImageLoaded(e.currentTarget)} />
        </ReactCrop>
      )}
      <button onClick={handleConfirmCrop} className="bg-blue-500 text-white px-2 py-1 mt-2">
        Confirm Crop
      </button>

     
      <div className="mb-4">
        <label>Position</label>
        <select value={position} onChange={(e) => handlePosition(e.target.value)} className="w-full border p-1">
          <option value="center">Center</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>

     
      <div className="mb-4">
        <label>Resize</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={size.width}
            onChange={(e) => handleResize(Number(e.target.value), size.height)}
            className="border p-1 w-full"
            placeholder="Width"
          />
          <input
            type="number"
            value={size.height}
            onChange={(e) => handleResize(size.width, Number(e.target.value))}
            className="border p-1 w-full"
            placeholder="Height"
          />
        </div>
      </div>

     
      <div className="mb-4">
        <label>Rotate</label>
        <input
          type="range"
          min="0"
          max="360"
          value={rotation}
          onChange={(e) => handleRotate(Number(e.target.value))}
          className="w-full"
        />
        <p>{rotation}°</p>
      </div>
    </div>
  );
};

export default ImageEditorSidebar;

