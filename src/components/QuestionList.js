import React from "react";
import QuestionItem from "./QuestionItem";
import { useState, useEffect } from "react";



function QuestionList({ questions, onDeleteQuestion }) {
  const questionItems = questions.map((question) => (
    <QuestionItem key={question.id} question={question} onDeleteQuestion={onDeleteQuestion} />
  ));
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
