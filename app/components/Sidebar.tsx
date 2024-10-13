
import { useDrag } from "react-dnd";

const Sidebar = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "element",
    item: { type: "text" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isDragging: imgDragging }, dragImg] = useDrag(() => ({
    type: "element",
    item: { type: "image" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className="w-1/8 bg-gray-200 p-4">
      <div
        ref={drag as unknown as React.Ref<HTMLDivElement>}
        className="p-4 bg-white rounded-lg shadow-lg cursor-pointer mb-4"
      >
        Text
      </div>
      <div
        ref={dragImg as unknown as React.Ref<HTMLDivElement>}
        className="p-4 bg-white rounded-lg shadow-lg cursor-pointer"
      >
        Image
      </div>
    </div>
  );
};

export default Sidebar;
