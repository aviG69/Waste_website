import React, { useEffect, useState } from "react";
import "../styles.css";

export default function Quiz() {
  const questions = [
    {
      q: "Which gas is the main cause of human-driven global warming?",
      options: ["Nitrogen", "CO₂", "Oxygen", "Helium"],
      correct: 1,
      explain: "CO₂ traps heat and is the largest contributor to the greenhouse effect."
    },
    {
      q: "How much has global temperature risen since pre-industrial times?",
      options: ["0.1°C", "0.8°C", "1.1°C", "2.5°C"],
      correct: 2,
      explain: "Global warming has exceeded 1°C and continues to rise."
    },
    {
      q: "Which sector emits the most CO₂?",
      options: ["Transport", "Electricity & Heat", "Agriculture", "Aviation"],
      correct: 1,
      explain: "Electricity & heat production is the largest global emitter."
    },
    {
      q: "Which material has the highest manufacturing carbon footprint?",
      options: ["Plastic", "Wood", "Aluminum", "Glass"],
      correct: 2,
      explain: "Aluminum requires massive energy to process bauxite ore."
    },
    {
      q: "A product's carbon footprint measures:",
      options: ["Price", "CO₂ emissions over its life cycle", "Durability", "Weight"],
      correct: 1,
      explain: "It includes extraction → production → shipping → disposal."
    },
    {
      q: "Which habit reduces personal carbon footprint the MOST?",
      options: ["More recycling", "Plant-based diet", "Turning off lights", "Shorter showers"],
      correct: 1,
      explain: "Diet changes have the biggest impact."
    },
    {
      q: "Which lifecycle stage produces the most CO₂ for electronics?",
      options: ["Mining", "Manufacturing", "Packaging", "Disposal"],
      correct: 1,
      explain: "Chip fabrication and assembly consume huge energy."
    },
    {
      q: "True or False: Aviation is the #1 emitter globally.",
      options: ["True", "False"],
      correct: 1,
      explain: "Electricity & heat are much larger contributors."
    },
    {
      q: "What unit measures greenhouse gases?",
      options: ["Liters", "kgCO₂e", "kWh", "Pounds"],
      correct: 1,
      explain: "CO₂e includes all greenhouse gases."
    },
    {
      q: "Which consumer action lowers emissions best?",
      options: ["Buying new items", "Repairing products", "Single-use plastics", "Fast fashion"],
      correct: 1,
      explain: "Repairing reduces manufacturing demand."
    }
  ];

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [timer, setTimer] = useState(600); // 10 minutes

  useEffect(() => {
    const t = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const select = (i) => {
    const newAns = [...answers];
    newAns[index] = i;
    setAnswers(newAns);
  };

  const downloadCSV = () => {
    const data = JSON.parse(localStorage.getItem("quiz_results") || "[]");
    let csv = "score,answers,time\n";
    data.forEach((r) => {
      csv += `${r.score},"${r.answers.join("|")}",${r.time}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "results.csv";
    a.click();
  };

  const finish = () => {
    let score = 0;
    let details = "";

    questions.forEach((q, i) => {
      const correct = q.correct === answers[i];
      if (correct) score++;

      details += `
        <div class="results-box">
          <strong>Q${i + 1}: ${q.q}</strong><br>
          Your answer: ${q.options[answers[i]] ?? "No answer"}<br>
          Correct: ${q.options[q.correct]}<br>
          <em>${q.explain}</em>
        </div>
      `;
    });

    const previous = JSON.parse(localStorage.getItem("quiz_results") || "[]");
    previous.push({ score, answers, time: new Date().toISOString() });
    localStorage.setItem("quiz_results", JSON.stringify(previous));

    document.getElementById("results").innerHTML = `
      <h2>Your Score: ${score}/${questions.length}</h2>
      <button class="btn btn-primary" id="dlcsv">Download CSV</button>
      ${details}
    `;

    setTimeout(() => {
      document.getElementById("dlcsv").onclick = downloadCSV;
    }, 200);
  };

  return (
    <div className="container quiz-container">

      <h1>CO₂ & Carbon Footprint Quiz</h1>
      <p style={{ color: "var(--secondary)" }}>
        Test your knowledge on CO₂ emissions and climate impact.
      </p>

      <div className="timer">
        ⏳ Time Left: {Math.floor(timer / 60)}m {timer % 60}s
      </div>

      <div className="progress-bar">
        <div
          className="progress-bar-inner"
          style={{ width: `${(index / questions.length) * 100}%` }}
        ></div>
      </div>

      <h2>{index + 1}. {questions[index].q}</h2>

      {questions[index].options.map((opt, i) => (
        <div
          key={i}
          className={
            "answer " + (answers[index] === i ? "selected" : "")
          }
          onClick={() => select(i)}
        >
          {opt}
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <button className="btn btn-secondary" onClick={() => index > 0 && setIndex(index - 1)}>Previous</button>
        <button className="btn btn-primary" onClick={() => index < questions.length - 1 ? setIndex(index + 1) : finish()}>Next</button>
      </div>

      <div id="results"></div>

    </div>
  );
}
