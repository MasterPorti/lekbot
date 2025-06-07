import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Led({
  position,
  wireActive,
  setWireActive,
  setWireStart,
  setWireEnd,
}) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineEnd, setLineEnd] = useState({ x: 0, y: 0 });
  const [lineStart, setLineStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      if (isDrawing) {
        setLineEnd({ x: e.clientX, y: e.clientY });
        console.log("Drawing line from", lineStart, "to", e.clientX, e.clientY);
      }
    }

    function handleClick(e) {
      if (isDrawing) {
        setIsDrawing(false);
        setWireActive(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsDrawing(false);
        setWireActive(false);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawing]);

  function handlePinClick(e) {
    if (!wireActive) {
      e.stopPropagation();

      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setLineStart({ x: centerX, y: centerY });
      setLineEnd({ x: centerX, y: centerY });
      setWireStart({ x: centerX, y: centerY });
      setIsDrawing(true);
      setWireActive(true);
    }
    if (wireActive) {
      e.stopPropagation();
      setIsDrawing(false);
      setWireActive(false);
      setWireEnd({ x: lineEnd.x, y: lineEnd.y });
      console.log("Wire drawn from", lineStart, "to", lineEnd);
    }
  }

  return (
    <>
      <div
        className="relative w-[100px] h-[100px] border-2 border-gray-300 rounded-2xl flex items-center justify-center"
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src="/componets/led.png"
          width={80}
          height={80}
          alt="LED Component"
          className="object-cover rounded-2xl"
        />
        <div
          onClick={handlePinClick}
          className="w-3.5 h-3.5 bottom-[5px] left-[28px] absolute hover:bg-red-500 hover:border-4 border-black cursor-pointer z-10"
        ></div>
        <div
          onClick={handlePinClick}
          className="w-3.5 h-3.5 bottom-[5px] left-[55px] absolute hover:bg-blue-500 hover:border-4 border-black cursor-pointer z-10"
        ></div>
      </div>

      {isDrawing && (
        <svg
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            width: "100vw",
            height: "100vh",
          }}
        >
          <line
            x1={lineStart.x}
            y1={lineStart.y}
            x2={lineEnd.x}
            y2={lineEnd.y}
            stroke="black"
            strokeWidth={2}
          />
        </svg>
      )}
    </>
  );
}
