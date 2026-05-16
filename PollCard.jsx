import { COLORS, OPTION_COLORS } from "./constants";
import { Pulse } from "./Pulse";

export function PollCard({ poll, votes, onVote, myVote, isTeacher }) {
  const total = Object.values(votes).reduce((a, b) => a + b, 0);

  return (
    <div
      style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: 14,
        padding: "1.25rem",
        marginBottom: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 2 }}>
            {poll.type === "quiz" ? "📝 Quiz" : "📊 Poll"}
          </div>
          <div style={{ fontSize: 16, fontWeight: 500, color: "var(--color-text-primary)" }}>{poll.question}</div>
        </div>
        <Pulse active={poll.active} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {poll.options.map((opt, i) => {
          const c = OPTION_COLORS[i % OPTION_COLORS.length];
          const pct = total > 0 ? Math.round(((votes[i] || 0) / total) * 100) : 0;
          const chosen = myVote === i;
          const showResults = isTeacher || myVote !== undefined;

          return (
            <button
              key={i}
              onClick={() => !isTeacher && poll.active && myVote === undefined && onVote(poll.id, i)}
              style={{
                position: "relative",
                overflow: "hidden",
                border: chosen ? `2px solid ${COLORS[c].mid}` : "0.5px solid var(--color-border-tertiary)",
                borderRadius: 10,
                padding: "10px 14px",
                background: showResults ? COLORS[c].bg : "var(--color-background-secondary)",
                cursor: !isTeacher && poll.active && myVote === undefined ? "pointer" : "default",
                textAlign: "left",
                transition: "all 0.2s",
              }}
            >
              {showResults && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${pct}%`,
                    background: `${COLORS[c].mid}22`,
                    transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
                  }}
                />
              )}
              <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: chosen ? 600 : 400, color: showResults ? COLORS[c].dark : "var(--color-text-primary)" }}>
                  {opt}
                  {poll.type === "quiz" && poll.correct === i && isTeacher && (
                    <span style={{ marginLeft: 6, color: COLORS.teal.mid }}>✓</span>
                  )}
                </span>
                {showResults && (
                  <span style={{ fontSize: 13, fontWeight: 600, color: COLORS[c].dark }}>{pct}%</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {total > 0 && (
        <div style={{ marginTop: 8, fontSize: 12, color: "var(--color-text-secondary)" }}>
          {total} response{total !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
