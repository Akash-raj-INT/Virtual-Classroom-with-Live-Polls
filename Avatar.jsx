import { COLORS } from "./constants";

export function Avatar({ name, size = 36, color = "purple" }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: COLORS[color].bg,
        color: COLORS[color].dark,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.35,
        fontWeight: 600,
        flexShrink: 0,
        border: `1.5px solid ${COLORS[color].mid}22`,
      }}
    >
      {initials}
    </div>
  );
}
