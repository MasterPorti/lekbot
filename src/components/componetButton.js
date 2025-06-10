import Image from "next/image";

import typeElements from "@/app/data/typeElements";

export default function Components({ setCustomCursor, poppins, elementName }) {
  const elementImage = typeElements.find(
    (el) => el.name === elementName
  )?.image;

  return (
    <div
      onClick={() => {
        setCustomCursor(elementName);
      }}
      className="flex flex-col items-center justify-center w-[100px] h-[100px] rounded-2xl cursor-pointer bg-white border-2 border-gray-300 hover:border-4"
    >
      <Image
        src={elementImage}
        alt="Component"
        width={50}
        height={50}
        className="object-cover "
      />
      <p className={`${poppins.className} text-center font-bold`}>
        {elementName}
      </p>
    </div>
  );
}
