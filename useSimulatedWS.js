import { useEffect, useRef } from "react";

export function useSimulatedWS(role, sessionCode, onEvent) {
  const timerRef = useRef(null);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  useEffect(() => {
    if (!sessionCode) return;
    if (role === "teacher") return;

    const events = [
      { type: "student_join", name: "Alex M.", avatar: "AM" },
      { type: "student_join", name: "Priya K.", avatar: "PK" },
      { type: "student_join", name: "Jordan T.", avatar: "JT" },
      { type: "student_join", name: "Sam L.", avatar: "SL" },
      { type: "student_join", name: "Mei W.", avatar: "MW" },
    ];

    let i = 0;
    const fire = () => {
      if (i < events.length) {
        onEventRef.current(events[i]);
        i++;
        timerRef.current = setTimeout(fire, 1200 + Math.random() * 800);
      }
    };

    timerRef.current = setTimeout(fire, 600);
    return () => clearTimeout(timerRef.current);
  }, [sessionCode, role]);

  return null;
}
