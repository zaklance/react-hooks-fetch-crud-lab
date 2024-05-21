import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleClickDelete() {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: 'DELETE',
    })
    .then((resp) => {
      if (resp.ok) {
        onDeleteQuestion(id);
      } else {
        console.error('Failed to delete question:', resp.statusText);
      }
    })
    .catch((error) => console.error('Error deleting question:', error));
  }

  function handleCorrectAnswerChange(event) {
    const newCorrectIndex = parseInt(event.target.value, 10);
    fetch(`http://localhost:3000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
    .then((resp) => resp.json())
    .then((updatedQuestion) => {
      onUpdateQuestion(updatedQuestion);
    })
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleClickDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
