import { useRef, useState } from "react";

const ZoomImage = ({ src, zoom = 2, radius = 150 }) => {
  const containerRef = useRef();
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setZoomPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      className="relative w-[400px] h-[400px] overflow-hidden border rounded-lg"
    >
      {/* Base Image */}
      <img
        src={src}
        alt="Zoom Target"
        className="w-full h-full object-cover"
        draggable={false}
      />

      {/* Zoom lens */}
      {showZoom && (
        <div
          className="absolute pointer-events-none border-2 border-white shadow-2xl rounded-full"
          style={{
            width: radius,
            height: radius,
            top: zoomPosition.y - radius / 2,
            left: zoomPosition.x - radius / 2,
            backgroundImage: `url(${src})`,
            backgroundSize: `${containerRef.current?.offsetWidth * zoom}px ${
              containerRef.current?.offsetHeight * zoom
            }px`,
            backgroundPosition: `-${zoomPosition.x * zoom - radius / 2}px -${
              zoomPosition.y * zoom - radius / 2
            }px`,
            backgroundRepeat: "no-repeat",
            transition: "opacity 0.1s ease",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

export default ZoomImage;
