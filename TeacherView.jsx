import { useState } from "react";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { PollCard } from "./PollCard";
import { COLORS, POLL_TEMPLATES } from "./constants";

export function TeacherView({ session, students, polls, votes, myVotes, onAddPoll, onTogglePoll, onVote }) {
  const [customQ, setCustomQ] = useState("");
  const [customOpts, setCustomOpts] = useState(["", ""]);
  const [pollType, setPollType] = useState("poll");
  const [correctIdx, setCorrectIdx] = useState(0);
  const [tab, setTab] = useState("polls");
  const [showForm, setShowForm] = useState(false);

  const addCustomPoll = () => {
    if (!customQ.trim() || customOpts.some((o) => !o.trim())) return;
    onAddPoll({ question: customQ, options: customOpts.filter((o) => o.trim()), type: pollType, correct: correctIdx });
    setCustomQ("");
    setCustomOpts(["", ""]);
    setShowForm(false);
  };

  const presentStudents = students.filter((s) => s.present);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, borderBottom: "0.5px solid var(--color-border-tertiary)", paddingBottom: 0 }}>
        {["polls", "attendance", "analytics"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 16px",
              border: "none",
              background: "transparent",
              fontWeight: tab === t ? 600 : 400,
              fontSize: 14,
              color: tab === t ? COLORS.purple.dark : "var(--color-text-secondary)",
              borderBottom: tab === t ? `2px solid ${COLORS.purple.mid}` : "2px solid transparent",
              cursor: "pointer",
              textTransform: "capitalize",
              transition: "all 0.15s",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "polls" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>
              {polls.filter((p) => p.active).length} active · {polls.length} total
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setShowForm(!showForm)}
                style={{
                  padding: "7px 14px",
                  background: COLORS.purple.bg,
                  color: COLORS.purple.dark,
                  border: `0.5px solid ${COLORS.purple.mid}66`,
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                + Custom poll
              </button>
            </div>
          </div>

          {showForm && (
            <div
              style={{
                background: COLORS.purple.bg,
                border: `0.5px solid ${COLORS.purple.mid}44`,
                borderRadius: 12,
                padding: "1rem",
                marginBottom: 14,
              }}
            >
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                {["poll", "quiz"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setPollType(t)}
                    style={{
                      padding: "5px 12px",
                      borderRadius: 999,
                      border: `0.5px solid ${COLORS.purple.mid}`,
                      background: pollType === t ? COLORS.purple.mid : "transparent",
                      color: pollType === t ? "white" : COLORS.purple.dark,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <input
                value={customQ}
                onChange={(e) => setCustomQ(e.target.value)}
                placeholder="Question..."
                style={{ width: "100%", marginBottom: 8, boxSizing: "border-box" }}
              />
              {customOpts.map((o, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "center" }}>
                  {pollType === "quiz" && (
                    <input
                      type="radio"
                      name="correct"
                      checked={correctIdx === i}
                      onChange={() => setCorrectIdx(i)}
                      style={{ accentColor: COLORS.teal.mid }}
                    />
                  )}
                  <input
                    value={o}
                    onChange={(e) => {
                      const next = [...customOpts];
                      next[i] = e.target.value;
                      setCustomOpts(next);
                    }}
                    placeholder={`Option ${i + 1}`}
                    style={{ flex: 1 }}
                  />
                  {customOpts.length > 2 && (
                    <button
                      onClick={() => setCustomOpts(customOpts.filter((_, j) => j !== i))}
                      style={{ border: "none", background: "transparent", color: COLORS.coral.mid, cursor: "pointer", fontSize: 16 }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button
                  onClick={() => setCustomOpts([...customOpts, ""])}
                  style={{
                    fontSize: 12,
                    padding: "5px 10px",
                    borderRadius: 6,
                    border: `0.5px solid ${COLORS.purple.mid}`,
                    background: "transparent",
                    color: COLORS.purple.dark,
                    cursor: "pointer",
                  }}
                >
                  + Option
                </button>
                <button
                  onClick={addCustomPoll}
                  style={{
                    fontSize: 12,
                    padding: "5px 14px",
                    borderRadius: 6,
                    background: COLORS.purple.mid,
                    color: "white",
                    border: "none",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Add poll
                </button>
              </div>
            </div>
          )}

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 8, fontWeight: 600, letterSpacing: 0.5 }}>
              QUICK ADD
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {POLL_TEMPLATES.map((t, i) => (
                <button
                  key={i}
                  onClick={() => onAddPoll(t)}
                  style={{
                    fontSize: 12,
                    padding: "5px 10px",
                    borderRadius: 8,
                    border: "0.5px solid var(--color-border-tertiary)",
                    background: "var(--color-background-secondary)",
                    color: "var(--color-text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  {t.type === "quiz" ? "📝" : "📊"} {t.question.slice(0, 30)}…
                </button>
              ))}
            </div>
          </div>

          {polls.map((p) => (
            <div key={p.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div />
                <button
                  onClick={() => onTogglePoll(p.id)}
                  style={{
                    fontSize: 11,
                    padding: "3px 10px",
                    borderRadius: 999,
                    border: `0.5px solid ${p.active ? COLORS.coral.mid : COLORS.teal.mid}`,
                    background: p.active ? COLORS.coral.bg : COLORS.teal.bg,
                    color: p.active ? COLORS.coral.dark : COLORS.teal.dark,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {p.active ? "Close poll" : "Open poll"}
                </button>
              </div>
              <PollCard poll={p} votes={votes[p.id] || {}} onVote={onVote} myVote={myVotes[p.id]} isTeacher />
            </div>
          ))}
        </div>
      )}

      {tab === "attendance" && (
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            {[
              { label: "Present", value: presentStudents.length, color: "teal" },
              { label: "Total enrolled", value: students.length, color: "purple" },
              { label: "Attendance %", value: students.length > 0 ? Math.round((presentStudents.length / students.length) * 100) + "%" : "—", color: "blue" },
            ].map((m) => (
              <div
                key={m.label}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  background: COLORS[m.color].bg,
                  borderRadius: 10,
                  border: `0.5px solid ${COLORS[m.color].mid}33`,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 600, color: COLORS[m.color].dark, marginBottom: 2 }}>{m.label}</div>
                <div style={{ fontSize: 24, fontWeight: 600, color: COLORS[m.color].dark }}>{m.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {students.map((s) => (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  background: "var(--color-background-secondary)",
                  borderRadius: 10,
                  border: "0.5px solid var(--color-border-tertiary)",
                }}
              >
                <Avatar name={s.name} color={s.present ? "teal" : "coral"} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-primary)" }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
                    Joined {new Date(s.joinedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
                <Badge color={s.present ? "teal" : "coral"}>{s.present ? "Present" : "Left"}</Badge>
              </div>
            ))}
            {students.length === 0 && (
              <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-secondary)", fontSize: 14 }}>
                Waiting for students to join…
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "analytics" && (
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 14, color: "var(--color-text-primary)" }}>Quiz performance</div>
          {polls.filter((p) => p.type === "quiz").length === 0 && (
            <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-secondary)", fontSize: 14 }}>
              No quiz data yet. Add a quiz to see analytics.
            </div>
          )}
          {polls.filter((p) => p.type === "quiz").map((p) => {
            const v = votes[p.id] || {};
            const total = Object.values(v).reduce((a, b) => a + b, 0);
            const correct = v[p.correct] || 0;
            const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
            return (
              <div
                key={p.id}
                style={{
                  background: "var(--color-background-secondary)",
                  borderRadius: 10,
                  padding: "14px 16px",
                  marginBottom: 10,
                  border: "0.5px solid var(--color-border-tertiary)",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 8 }}>{p.question}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{ flex: 1, height: 8, background: "var(--color-background-primary)", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: pct >= 70 ? COLORS.teal.mid : COLORS.coral.mid, transition: "width 0.6s" }} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: pct >= 70 ? COLORS.teal.dark : COLORS.coral.dark }}>{pct}% correct</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{total} responses · Correct: {p.options[p.correct]}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
