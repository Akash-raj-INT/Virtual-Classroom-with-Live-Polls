import { COLORS } from "./constants";

export function Pulse({ active }) {
  return active ? (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: COLORS.teal.mid,
          animation: "pulse 1.4s infinite",
          display: "inline-block",
        }}
      />
      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}`}</style>
      <span style={{ fontSize: 12, color: COLORS.teal.dark, fontWeight: 600 }}>LIVE</span>
    </span>
  ) : null;
}
