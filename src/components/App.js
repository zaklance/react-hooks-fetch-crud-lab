import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [ questions, setQuestions ] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/questions')
    .then((resp) => resp.json())
    .then((data) => setQuestions(data))
  }, []);

  function addQuestion(newQuestion) {
    setQuestions((oldQuestions) => [...oldQuestions, newQuestion]);
  }
  function deleteQuestion(id) {
    setQuestions((oldQuestions) => oldQuestions.filter((question) => question.id !== id));
  }
  function updatedQuestion(updatedQuestion) {
    setQuestions((oldQuestions) =>
      oldQuestions.map((question) =>
        question.id ===updatedQuestion.id ? updatedQuestion : question
      )
    );
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
      <QuestionForm onAddQuestion={addQuestion} />
      ) : (
      <QuestionList 
        questions={questions}
        onDeleteQuestion={deleteQuestion}
        onUpdateQuestion={updatedQuestion}
      />
    )}
    </main>
  );
}

export default App;
