import RbLogo from "./RbLogo";

export default function Header({ poppins }) {
  return (
    <header className="flex px-5 h-[70px] py-5 items-center bg-[#F5F4ED] justify-between">
      <RbLogo />
      <p
        className={`${poppins.className} font-extrabold text-3xl text-[#DB5679]`}
      >
        ¿Que vamos a crear hoy?
      </p>
      <div className="w-[261px] flex items-end justify-end ">
        <div className="w-[40px] h-[40px] rounded-full bg-blue-700"></div>
      </div>
    </header>
  );
}
