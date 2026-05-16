import { COLORS } from "./constants";

export function Badge({ children, color = "purple" }) {
  return (
    <span
      style={{
        background: COLORS[color].bg,
        color: COLORS[color].dark,
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 999,
        letterSpacing: 0.3,
      }}
    >
      {children}
    </span>
  );
}
