import React, { useState, useEffect } from "react";

const Qlist = {
  100: {
    Q: "Are you married?",
    options: [
      { name: "yes", value: 101 },
      { name: "no", value: "Not married", terminal: true },
    ],
  },
  101: {
    Q: "Do you have children?",
    options: [
      { name: "Yes", value: 102 },
      { name: "no", value: "No children", terminal: true },
    ],
  },
  102: {
    Q: "How many childrens do you have?",
    options: [
      {
        name: "Less than 2",
        value: "You have less than 2 children",
        terminal: true,
      },
      {
        name: "More than 2",
        value: "You have more than 2 children",
        terminal: true,
      },
    ],
  },
};

export default function App() {
  const [QId, setQId] = useState<keyof typeof Qlist>(100);
  const [terminalVal, setTerminalVal] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<
    (typeof Qlist)[typeof QId]
  >(Qlist[QId]);

  useEffect(() => {
    setCurrentQuestion(Qlist[QId]);
  }, [QId]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const { value, terminal: isTerminal } = target.dataset;
    if (isTerminal) {
      setTerminalVal(value || null);
      return;
    }
    value && setQId(value);
  };

  return (
    <div className="App">
      {!terminalVal ? (
        <div>
          <p>{currentQuestion["Q"]}</p>
          {currentQuestion.options.map((option) => {
            return (
              <button
                key={option.name}
                data-name={option.name}
                data-value={option.value}
                data-terminal={option.terminal}
                onClick={handleClick}
              >
                {option.name}
              </button>
            );
          })}
        </div>
      ) : (
        <p>Your answer is: {terminalVal}</p>
      )}
    </div>
  );
}

// Log to console
console.log("Hello console");
