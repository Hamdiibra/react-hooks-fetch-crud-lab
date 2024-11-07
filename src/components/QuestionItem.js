import React from "react";

function QuestionItem({ question, onDelete, onCorrectAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleCorrectAnswerChange = (e) => {
    const newCorrectIndex = Number(e.target.value);

    // PATCH request to update the question
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then((r) => r.json())
      .then((updatedQ) => {
        onCorrectAnswerChange(updatedQ); 
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  return (
    <li>
      <h4>Question</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={correctIndex} 
          onChange={handleCorrectAnswerChange} 
        >
          {options}
        </select>
      </label>
      <button
        onClick={() => {
          fetch(`http://localhost:4000/questions/${id}`, {
            method: "DELETE",
          })
            .then((r) => r.json())
            .then(() => onDelete(question)); 
        }}
      >
        Delete Question
      </button>
    </li>
  );
}

export default QuestionItem;
