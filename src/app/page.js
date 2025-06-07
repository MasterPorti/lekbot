"use client";

import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import CustomCursor from "../components/CustomCursor";
import Components from "../components/componetButton";
import Led from "../components/elements/Led";
import Baterry from "@/components/elements/Battery";
import typeElements from "@/app/data/typeElements";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  const [customCursor, setCustomCursor] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0, type: null });
  const [boxes, setBoxes] = useState([]);
  const [wireActive, setWireActive] = useState(false);
  const [wireStart, setWireStart] = useState({ x: 0, y: 0 });
  const [wireEnd, setWireEnd] = useState({ x: 0, y: 0 });
  const [wires, setWires] = useState([]);

  const handleClick = (e) => {
    if (!customCursor) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCustomCursor(null); // Reset custom cursor after placing the box
    setBoxes([...boxes, { x, y, type: customCursor }]);
  };

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
    <div>
      <Header poppins={poppins} />
      <div className="w-full h-[calc(100vh-50px)] bg-gray-100/50 border-gray-400 border-t-2 flex">
        <div className="w-[80%] h-full relative" onClick={handleClick}>
          {boxes.map((box, index) => {
            if (box.type === "LED") {
              return (
                <Led
                  key={index}
                  position={{ x: box.x, y: box.y }}
                  wireActive={wireActive}
                  setWireActive={setWireActive}
                  poppins={poppins}
                  wireStart={wireStart}
                  setWireStart={setWireStart}
                  wireEnd={wireEnd}
                  setWireEnd={setWireEnd}
                />
              );
            } else if (box.type === "Batería") {
              return (
                <Baterry
                  key={index}
                  position={{ x: box.x, y: box.y }}
                  wireActive={wireActive}
                  setWireActive={setWireActive}
                  poppins={poppins}
                />
              );
            } else {
              return null; // o algún componente por defecto
            }
          })}
          <CustomCursor customCursor={customCursor} position={position} />
        </div>
        <section className="w-[20%] h-full bg-gray-100 border-l-2 p-3 border-gray-400">
          <div>
            <p
              onClick={() => setCustomCursor("")}
              className={`${poppins.className} font-bold text-2xl`}
            >
              Componentes
            </p>
            <p>Basic</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-3 overflow-y-auto h-[calc(100vh-50px-100px)]">
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
          </div>
        </section>
      </div>
    </div>
  );
}
