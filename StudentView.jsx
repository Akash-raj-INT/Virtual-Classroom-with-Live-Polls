import { Pulse } from "./Pulse";
import { PollCard } from "./PollCard";
import { COLORS } from "./constants";

export function StudentView({ studentName, polls, votes, myVotes, onVote }) {
  const activePoll = polls.filter((p) => p.active);
  const closed = polls.filter((p) => !p.active);

  return (
    <div>
      {activePoll.length === 0 && (
        <div
          style={{
            background: COLORS.purple.bg,
            border: `0.5px solid ${COLORS.purple.mid}44`,
            borderRadius: 12,
            padding: "1.5rem",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 8 }}>⏳</div>
          <div style={{ fontWeight: 500, color: COLORS.purple.dark }}>Waiting for the teacher</div>
          <div style={{ fontSize: 13, color: COLORS.purple.dark + "99", marginTop: 4 }}>
            A poll or quiz will appear here when launched
          </div>
        </div>
      )}

      {activePoll.length > 0 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.teal.dark, marginBottom: 10, letterSpacing: 0.3, display: "flex", alignItems: "center", gap: 6 }}>
            <Pulse active /> Active
          </div>
          {activePoll.map((p) => (
            <PollCard key={p.id} poll={p} votes={votes[p.id] || {}} onVote={onVote} myVote={myVotes[p.id]} isTeacher={false} />
          ))}
        </div>
      )}

      {closed.length > 0 && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 10, letterSpacing: 0.5 }}>
            CLOSED
          </div>
          {closed.map((p) => (
            <PollCard key={p.id} poll={p} votes={votes[p.id] || {}} onVote={onVote} myVote={myVotes[p.id]} isTeacher={false} />
          ))}
        </div>
      )}
    </div>
  );
}
