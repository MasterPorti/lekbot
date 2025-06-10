import React, { useEffect } from "react";
import Image from "next/image";

export default function Led({
  position,
  wireActive,
  setWireActive,
  setWireStart,
  setWireEnd,
  canvasRef,
  isDrawing,
  setIsDrawing,
  lineStart,
  setLineStart,
  lineEnd,
  setLineEnd,
  setColor,
}) {
  useEffect(() => {
    function handleMouseMove(e) {
      if (isDrawing && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setLineEnd({ x, y });
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsDrawing(false);
        setWireActive(false);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawing]);

  useEffect(() => {
    if (!wireActive) {
      setIsDrawing(false);
    }
  }, [wireActive]);

  function handlePinClick(e) {
    e.stopPropagation();

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    if (wireActive) {
      setWireEnd({ x, y });
      setIsDrawing(false);
      setWireActive(false);
    } else {
      setLineStart({ x, y });
      setLineEnd({ x, y });
      setWireStart({ x, y });
      setIsDrawing(true);
      setWireActive(true);
    }
  }

  return (
    <div
      className="relative w-[100px] h-[100px]  border-gray-300 rounded-2xl flex items-center justify-center"
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
        onClick={(e) => {
          handlePinClick(e);
          setColor("red");
        }}
        className="w-3.5 h-3.5 bottom-[5px] left-[28px] absolute hover:bg-red-500 hover:border-4 border-black cursor-pointer z-10"
      ></div>
      <div
        onClick={(e) => {
          handlePinClick(e);
          setColor("blue");
        }}
        className="w-3.5 h-3.5 bottom-[5px] left-[55px] absolute hover:bg-blue-500 hover:border-4 border-black cursor-pointer z-10"
      ></div>
    </div>
  );
}
