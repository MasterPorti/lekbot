import typeElements from "@/app/data/typeElements";

export default function CustomCursor({ customCursor, position }) {
  if (!customCursor) return null;

  const element = typeElements.find((el) => el.name === customCursor);

  return (
    <div
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        width: element?.size[0] || "100px",
        height: element?.size[1] || "100px",
        pointerEvents: "none",
        backgroundImage: `url(${element?.image})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
    />
  );
}
