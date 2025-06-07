import RbLogo from "./RbLogo";

export default function Header({ poppins }) {
  return (
    <header className="flex px-5 h-[50px] py-5 items-center justify-between">
      <RbLogo className="w-[261px] h-[30px]" />
      <p className={`${poppins.className} font-extrabold text-3xl`}>
        Clase Cero
      </p>
      <div className="w-[261px] flex items-end justify-end ">
        <div className="w-[40px] h-[40px] rounded-full bg-blue-700"></div>
      </div>
    </header>
  );
}
