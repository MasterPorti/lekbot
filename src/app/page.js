import Link from "next/link";
import { Poppins } from "next/font/google";
import RbLogo from "@/components/RbLogo";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  return (
    <main>
      <nav className="flex items-center justify-between p-4 bg-[#F5F4ED] ">
        <RbLogo className={poppins.className} />
        <div className="flex items-center gap-8">
          <Link
            href="/about"
            className="font-extrabold  hover:text-[#DB5679] transition-colors duration-300 hover:bg-[#DB5679]/10 px-2 py-1 rounded-lg"
          >
            LekBot
          </Link>
          <Link
            href="/about"
            className="font-extrabold  hover:text-[#DB5679] transition-colors duration-300 hover:bg-[#DB5679]/10 px-2 py-1 rounded-lg"
          >
            Galeria
          </Link>
          <Link
            href="/about"
            className="font-extrabold  hover:text-[#DB5679] transition-colors duration-300 hover:bg-[#DB5679]/10 px-2 py-1 rounded-lg"
          >
            Profesores
          </Link>
          <Link
            href="/about"
            className="font-extrabold  hover:text-[#DB5679] transition-colors duration-300 hover:bg-[#DB5679]/10 px-2 py-1 rounded-lg"
          >
            Contacto
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="border-3 border-[#DB5679] text-[#DB5679]   px-2 py-1 rounded-full font-semibold transition-colors duration-300"
          >
            Lek aqui
          </Link>
          <Link
            href="/login"
            className="border-3 border-[#DB5679] bg-[#DB5679] text-white px-2 py-1 rounded-full font-semibold  transition-colors duration-300"
          >
            Ingresa
          </Link>
        </div>
      </nav>
      <div className="h-">
        <div className="flex flex-col items-center justify-center h-full bg-[#F5F4ED]">
          <h1 className="text-6xl font-extrabold text-[#DB5679] mb-4">
            Bienvenido a LekBot
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Todo lo que necesitas un "¿Que pasaria si?"
          </p>
          <Link
            href="/about"
            className="bg-[#DB5679] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#DB5679]/90 transition-colors duration-300"
          >
            Comienza ahora
          </Link>
        </div>
      </div>
    </main>
  );
}
