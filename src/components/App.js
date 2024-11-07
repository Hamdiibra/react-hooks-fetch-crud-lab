import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch all questions from the server
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAddQ = (q) => {
    setQuestions([...questions, q]);  // Add new question to the list
  };

  const handleDelete = (question) => {
    // Remove the deleted question from the state
    const newQuestions = questions.filter((q) => q.id !== question.id);
    setQuestions(newQuestions);

    // Delete the question from the server
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    });
  };

  const handleUpdate = (updatedQuestion) => {
    // Update the question in the state
    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQ={handleAddQ} />
      ) : (
        <QuestionList questions={questions} onDel={handleDelete} onUpdate={handleUpdate} />
      )}
    </main>
  );
}

export default App;
