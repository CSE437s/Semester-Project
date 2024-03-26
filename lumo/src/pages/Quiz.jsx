import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom"

const initialScores = [
  { name: "Risk", responseScore: 0, totalScore: 0 },
  { name: "Feeling", responseScore: 0, totalScore: 0 },
  { name: "Planning", responseScore: 0, totalScore: 0 },
  { name: "Spending", responseScore: 0, totalScore: 0 },
  { name: "Influence", responseScore: 0, totalScore: 0 },
  { name: "Knowledge", responseScore: 0, totalScore: 0 },
];

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [factorScore, setfactorScore] = useState(initialScores);
  const [currentIndex, setcurrentIndex] = useState(0);
  const navigate = useNavigate();


  // Fetch question and options from Supabase
  useEffect(() => {
    async function fetchQuestionAndOptions() {
      const { data: questions, error } = await supabase
        .from("Questions")
        .select("questionText, options, primaryFactor");

      if (error) {
        console.error("Error fetching question and options:", error.message);
        return;
      }

      if (questions && questions.length > 0) {
        setQuestions(questions);
      }
    }
    fetchQuestionAndOptions();
  }, []);

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
  };

  async function createResponseEntry(responseData) {
    try {
      const { data, error } = await supabase.from("Responses").insert(responseData);

      if (error) {
        console.error("Error creating entry 1:", error.message);
        return null;
      }
      console.log("Entry created successfully:", data);
      return data;
    } catch (err) {
      console.error("Error creating entry 2:", err.message);
      return null;
    }
  }

  // Usage example

  const handleContinueClick = async () => {
    const updatedScore = factorScore.map((item) =>
      item.name === questions[currentIndex].primaryFactor
        ? {
            ...item,
            responseScore: item.responseScore + questions[currentIndex].options[selectedOption].focusScore,
            totalScore: item.totalScore + 4,
          }
        : item
    );
    setfactorScore(updatedScore);
    if (currentIndex + 1 >= questions.length) {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting user:", error.message);
        return null;
      }
      const uid = data.session.user.id;
      const responseData = { userID: uid, factorScores: factorScore };
      createResponseEntry(responseData);
      navigate('/home/phenotype');
      //TODO: Navigate somewhere
    } else {
      setcurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", textAlign: "center" }}>
      <h1>Quiz</h1>
      <h3>Progress</h3>
      <progress value={(currentIndex / questions.length ?? 1) * 100} max="100"></progress>
      {questions && questions.length > 0 ? (
        <>
          <p>{questions[currentIndex].questionText}</p>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}
          >
            {questions[currentIndex].options.map((option, index) => (
              <button
                key={index}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  backgroundColor: selectedOption === index ? "#4CAF50" : "#f0f0f0",
                  color: selectedOption === index ? "white" : "black",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => handleOptionClick(index)}
              >
                {option.optionText}
              </button>
            ))}
          </div>
          {selectedOption + 1 && <button onClick={handleContinueClick}>Continue</button>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
