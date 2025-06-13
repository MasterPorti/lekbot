"use client";

import { Poppins } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import Components from "@/components/componetButton";
import Led from "@/components/elements/Led";
import Baterry from "@/components/elements/Battery";
import Switch from "@/components/elements/Switch";
import typeElements from "@/app/data/typeElements";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Dev() {
  const canvasRef = useRef(null);

  const [customCursor, setCustomCursor] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [boxes, setBoxes] = useState([]);
  const [wireActive, setWireActive] = useState(false);
  const [wireStart, setWireStart] = useState({ x: 0, y: 0 });
  const [wireEnd, setWireEnd] = useState({ x: 0, y: 0 });
  const [wires, setWires] = useState([]);
  const [color, setColor] = useState("black");

  // ✅ NUEVO: estados para línea temporal
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineStart, setLineStart] = useState({ x: 0, y: 0 });
  const [lineEnd, setLineEnd] = useState({ x: 0, y: 0 });

  const handleClick = (e) => {
    if (!customCursor) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCustomCursor(null);
    setBoxes([...boxes, { x, y, type: customCursor }]);
  };

  useEffect(() => {
    if (
      !wireActive &&
      wireStart.x !== 0 &&
      wireStart.y !== 0 &&
      wireEnd.x !== 0 &&
      wireEnd.y !== 0
    ) {
      setWires([...wires, { start: wireStart, end: wireEnd, color: color }]);
      setWireStart({ x: 0, y: 0 });
      setWireEnd({ x: 0, y: 0 });
      setLineStart({ x: 0, y: 0 });
      setLineEnd({ x: 0, y: 0 });
    }
  }, [wireActive, wireStart, wireEnd, wires, color]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    if (customCursor) {
      window.addEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "none";
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
    };
  }, [customCursor]);

  return (
    <div
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='25' cy='25' r='4' fill='%23d9d9d9' /%3E%3C/svg%3E\")",
      }}
      className="bg-[#faf9f5]"
    >
      <Header poppins={poppins} />
      <div className="w-full h-[calc(100vh-70px)] flex">
        <div
          ref={canvasRef}
          className="w-[80%] h-full relative"
          onClick={handleClick}
        >
          {/* Elementos */}
          {boxes.map((box, index) => {
            if (box.type === "LED") {
              return (
                <Led
                  key={index}
                  position={{ x: box.x, y: box.y }}
                  wireActive={wireActive}
                  setWireActive={setWireActive}
                  setWireStart={setWireStart}
                  setWireEnd={setWireEnd}
                  canvasRef={canvasRef}
                  isDrawing={isDrawing}
                  setIsDrawing={setIsDrawing}
                  lineStart={lineStart}
                  setLineStart={setLineStart}
                  lineEnd={lineEnd}
                  setLineEnd={setLineEnd}
                  setColor={setColor}
                />
              );
            } else if (box.type === "Batería") {
              return (
                <Baterry
                  key={index}
                  position={{ x: box.x, y: box.y }}
                  wireActive={wireActive}
                  setWireActive={setWireActive}
                  setWireStart={setWireStart}
                  setWireEnd={setWireEnd}
                  canvasRef={canvasRef}
                  isDrawing={isDrawing}
                  setIsDrawing={setIsDrawing}
                  lineStart={lineStart}
                  setLineStart={setLineStart}
                  lineEnd={lineEnd}
                  setLineEnd={setLineEnd}
                  setColor={setColor}
                />
              );
            } else if (box.type === "SWITCH") {
              return (
                <Switch
                  key={index}
                  position={{ x: box.x, y: box.y }}
                  wireActive={wireActive}
                  setWireActive={setWireActive}
                  setWireStart={setWireStart}
                  setWireEnd={setWireEnd}
                  canvasRef={canvasRef}
                  isDrawing={isDrawing}
                  setIsDrawing={setIsDrawing}
                  lineStart={lineStart}
                  setLineStart={setLineStart}
                  lineEnd={lineEnd}
                  setLineEnd={setLineEnd}
                  setColor={setColor}
                />
              );
            } else {
              return null;
            }
          })}

          {/* ✅ SVG que dibuja cables (tanto los terminados como el temporal) */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {isDrawing && (
              <line
                x1={lineStart.x}
                y1={lineStart.y}
                x2={lineEnd.x}
                y2={lineEnd.y}
                stroke={color}
                strokeWidth="5"
                strokeLinecap="round"
              />
            )}
            {wires.map((wire, index) => (
              <line
                key={index}
                x1={wire.start.x}
                y1={wire.start.y}
                x2={wire.end.x}
                y2={wire.end.y}
                stroke={wire.color}
                strokeWidth="5"
                strokeLinecap="round"
              />
            ))}
          </svg>

          <CustomCursor customCursor={customCursor} position={position} />
        </div>

        {/* Panel lateral */}
        <section className="w-[20%] h-full px-3 py-3">
          <div className="w-full h-[70px] rounded-xl bg-white/10 backdrop-blur-md shadow-lg p-4 flex flex-col border border-white/20">
            <div className="w-[100px] h-[40px] px-2 py-1 border-2 border-gray-400 cursor-pointer rounded-xl">
              <div className="w-[30px] rounded-md h-full bg-red-500" />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-3 overflow-y-auto ">
            <Components
              setCustomCursor={setCustomCursor}
              customCursor={customCursor}
              position={position}
              poppins={poppins}
              elementName="LED"
            />
            <Components
              setCustomCursor={setCustomCursor}
              customCursor={customCursor}
              position={position}
              poppins={poppins}
              elementName="Batería"
            />

            <Components
              setCustomCursor={setCustomCursor}
              customCursor={customCursor}
              position={position}
              poppins={poppins}
              elementName="SWITCH"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
