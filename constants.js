export const COLORS = {
  purple: { bg: "#EEEDFE", mid: "#7F77DD", dark: "#3C3489", text: "#26215C" },
  teal: { bg: "#E1F5EE", mid: "#1D9E75", dark: "#0F6E56", text: "#04342C" },
  coral: { bg: "#FAECE7", mid: "#D85A30", dark: "#993C1D", text: "#4A1B0C" },
  amber: { bg: "#FAEEDA", mid: "#BA7517", dark: "#854F0B", text: "#412402" },
  blue: { bg: "#E6F1FB", mid: "#378ADD", dark: "#185FA5", text: "#042C53" },
  green: { bg: "#EAF3DE", mid: "#639922", dark: "#3B6D11", text: "#173404" },
};

export const OPTION_COLORS = ["blue", "purple", "coral", "teal", "amber", "green"];

export const POLL_TEMPLATES = [
  {
    question: "Which concept do you find most challenging so far?",
    options: ["Variables & Types", "Functions & Scope", "Async/Promises", "Classes & OOP"],
    type: "poll",
  },
  {
    question: "What is the output of `typeof null` in JavaScript?",
    options: ['"null"', '"object"', '"undefined"', '"boolean"'],
    type: "quiz",
    correct: 1,
  },
  {
    question: "How would you rate today's session?",
    options: ["⭐ Needs improvement", "⭐⭐ Okay", "⭐⭐⭐ Good", "⭐⭐⭐⭐ Excellent!"],
    type: "poll",
  },
  {
    question: "Which learning style works best for you?",
    options: ["Visual diagrams", "Code examples", "Written docs", "Video walkthroughs"],
    type: "poll",
  },
];
