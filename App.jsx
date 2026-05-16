import { useState, useCallback } from "react";
import { useSimulatedWS } from "./useSimulatedWS";
import { TeacherView } from "./TeacherView";
import { StudentView } from "./StudentView";
import { COLORS } from "./constants";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [role, setRole] = useState(null);
  const [sessionCode, setSessionCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [polls, setPolls] = useState([]);
  const [votes, setVotes] = useState({});
  const [myVotes, setMyVotes] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, color = "teal") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2500);
  }, []);

  useSimulatedWS(role, sessionCode, (event) => {
    if (event.type === "student_join") {
      const s = { id: Date.now() + Math.random(), name: event.name, avatar: event.avatar, present: true, joinedAt: new Date() };
      setStudents((prev) => [...prev, s]);
      showToast(`${event.name} joined`, "teal");
      setVotes((prev) => {
        const next = { ...prev };
        polls.forEach((p) => {
          if (!next[p.id]) next[p.id] = {};
          const opt = Math.floor(Math.random() * p.options.length);
          next[p.id][opt] = (next[p.id][opt] || 0) + 1;
        });
        return next;
      });
    }
  });

  const generateCode = () => Math.random().toString(36).slice(2, 7).toUpperCase();

  const createSession = () => {
    const code = generateCode();
    setSessionCode(code);
    setRole("teacher");
    setScreen("session");
    showToast(`Session ${code} created!`, "purple");
  };

  const joinSession = () => {
    if (!inputCode.trim() || !studentName.trim()) return;
    setSessionCode(inputCode.toUpperCase());
    setRole("student");
    setScreen("session");
    showToast(`Joined session ${inputCode.toUpperCase()}`, "teal");
  };

  const addPoll = useCallback(
    (template) => {
      const p = { ...template, id: Date.now(), active: true };
      setPolls((prev) => [p, ...prev]);
      setVotes((prev) => ({ ...prev, [p.id]: {} }));
      showToast("Poll launched!", "purple");
    },
    [showToast]
  );

  const togglePoll = useCallback((id) => {
    setPolls((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  }, []);

  const castVote = useCallback(
    (pollId, optIdx) => {
      if (myVotes[pollId] !== undefined) return;
      setMyVotes((prev) => ({ ...prev, [pollId]: optIdx }));
      setVotes((prev) => ({
        ...prev,
        [pollId]: { ...prev[pollId], [optIdx]: (prev[pollId]?.[optIdx] || 0) + 1 },
      }));
      showToast("Vote recorded!", "teal");
    },
    [myVotes, showToast]
  );

  if (screen === "home") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "var(--color-background-tertiary)" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: COLORS.purple.mid,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: 30,
              }}
            >
              🎓
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0, color: "var(--color-text-primary)" }}>ClassroomLive</h1>
            <p style={{ color: "var(--color-text-secondary)", fontSize: 15, margin: "6px 0 0" }}>Real-time polls & quizzes for your class</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                background: "var(--color-background-primary)",
                border: "0.5px solid var(--color-border-tertiary)",
                borderRadius: 14,
                padding: "1.5rem",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: "var(--color-text-primary)" }}>I'm a teacher</div>
              <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 14 }}>Create a session and launch polls</div>
              <button
                onClick={createSession}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: COLORS.purple.mid,
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                Create session →
              </button>
            </div>

            <div
              style={{
                background: "var(--color-background-primary)",
                border: "0.5px solid var(--color-border-tertiary)",
                borderRadius: 14,
                padding: "1.5rem",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: "var(--color-text-primary)" }}>I'm a student</div>
              <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 12 }}>Enter your name and session code</div>
              <input
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Your name"
                style={{ width: "100%", marginBottom: 8, boxSizing: "border-box" }}
              />
              <input
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Session code (e.g. AB3X9)"
                style={{ width: "100%", marginBottom: 10, boxSizing: "border-box", fontFamily: "monospace", letterSpacing: 2 }}
                maxLength={5}
              />
              <button
                onClick={joinSession}
                disabled={!inputCode.trim() || !studentName.trim()}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: COLORS.teal.mid,
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: "pointer",
                  opacity: !inputCode.trim() || !studentName.trim() ? 0.5 : 1,
                }}
              >
                Join session →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background-tertiary)" }}>
      <div
        style={{
          background: "var(--color-background-primary)",
          borderBottom: "0.5px solid var(--color-border-tertiary)",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🎓</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: "var(--color-text-primary)" }}>ClassroomLive</div>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>
              {role === "teacher" ? "Teacher view" : `Student · ${studentName}`}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              background: COLORS.purple.bg,
              border: `0.5px solid ${COLORS.purple.mid}66`,
              borderRadius: 8,
              padding: "4px 12px",
              fontFamily: "monospace",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 3,
              color: COLORS.purple.dark,
            }}
          >
            {sessionCode}
          </div>
          {role === "teacher" && (
            <div
              style={{
                background: COLORS.teal.bg,
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 600,
                color: COLORS.teal.dark,
              }}
            >
              👥 {students.length}
            </div>
          )}
          <button
            onClick={() => {
              setScreen("home");
              setStudents([]);
              setPolls([]);
              setVotes({});
              setMyVotes({});
            }}
            style={{
              padding: "5px 10px",
              borderRadius: 8,
              border: "0.5px solid var(--color-border-tertiary)",
              background: "transparent",
              fontSize: 12,
              cursor: "pointer",
              color: "var(--color-text-secondary)",
            }}
          >
            Leave
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "1.5rem 1rem" }}>
        {role === "teacher" ? (
          <TeacherView
            session={sessionCode}
            students={students}
            polls={polls}
            votes={votes}
            myVotes={myVotes}
            onAddPoll={addPoll}
            onTogglePoll={togglePoll}
            onVote={castVote}
          />
        ) : (
          <StudentView studentName={studentName} polls={polls} votes={votes} myVotes={myVotes} onVote={castVote} />
        )}
      </div>

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: COLORS[toast.color].dark,
            color: "white",
            padding: "9px 20px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            zIndex: 100,
            animation: "fadeIn 0.2s ease",
          }}
        >
          <style>{`@keyframes fadeIn{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
