"use client";
// pages/index.tsx o cualquier componente React
import { useState } from "react";

export default function CircuitSimulator() {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnected(true);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6 min-h-screen bg-gray-50">
      {/* Panel lateral de componentes */}
      <div className="col-span-1 bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Componentes</h2>
        <div className="flex flex-col gap-3">
          <div className="p-3 border rounded bg-gray-100 text-center">
            🔋 Batería
          </div>
          <div className="p-3 border rounded bg-gray-100 text-center">
            💡 LED
          </div>
        </div>
      </div>

      {/* Área del circuito */}
      <div className="col-span-2 bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Área de Circuito</h2>
        <div className="flex items-center gap-6 p-6 border rounded bg-gray-100">
          <div className="p-4 border rounded bg-white text-3xl">🔋</div>

          <button
            onClick={handleConnect}
            disabled={connected}
            className={`px-4 py-2 rounded font-semibold transition ${
              connected
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Conectar
          </button>

          <div
            className={`p-4 border rounded bg-white text-3xl transition ${
              connected ? "bg-yellow-300" : "bg-gray-300"
            }`}
          >
            💡
          </div>
        </div>

        <p className="mt-6 text-lg">
          {connected
            ? "✅ ¡El LED está encendido!"
            : "🔌 Conecta la batería para encender el LED."}
        </p>
      </div>
    </div>
  );
}
