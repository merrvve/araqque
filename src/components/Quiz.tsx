"use client";

import { useState } from "react";
import QuestionList from "./QuestionList";
import { CountdownTimer } from "./CountdownTimer";
import useQuestionStore from "../stores/questionStore";

export default function Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [quizState, setQuizState] = useState(true);
  const [answers, setAnswers] = useState<string[]>(Array(9).fill("")); // Initialize answers array
  const { questions } = useQuestionStore();

  function handleForward() {
    if (activeQuestion < 9) {
      setActiveQuestion((prev) => prev + 1);
      if (activeQuestion === 8) {
        setQuizState(false);
      }
    }
  }

  function handleTimeOut() {
    setQuizState(false); // End quiz when timer reaches zero
  }

  const updateAnswer = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer; // Update the specific answer
    setAnswers(newAnswers);
  };

  return (
    <>
      <div className="flex justify-end p-10">
        <CountdownTimer
          initialTime={900}
          quizState={quizState}
          onTimeOut={handleTimeOut}
        />
      </div>
      <div>
        <QuestionList
          activeQuestion={activeQuestion}
          quizState={quizState}
          answers={answers}
          setAnswers={updateAnswer} // Pass the update function
        />
      </div>

      <div className="flex justify-end sm:px-52">
        {activeQuestion < 9 && quizState && (
          <>
            <button
              className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 "
              onClick={handleForward}
            >
              {activeQuestion == 8 ? "Tamamla" : "Sonraki"}
            </button>
          </>
        )}
      </div>
      {!quizState && (
        <div className="grid grid-cols-3 gap-2">
          <div>
            <strong>Cevaplarınız:</strong>
            
            <ul>
              {answers.map((answer, index) => (
                <li key={index}>
                  <strong>{index+1}.</strong> {answer}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Doğru Cevaplar:</strong>
            <ul>
              {questions.map((question)=>(
                <li key={question.id}>
                    {question.correct_answer}
                </li>
              ))}
            </ul>
          </div>
          <div>
          <strong>Değerlendirme:</strong>
              <ul>
              {questions.map((question, index)=>(
                <li key={index}>
                    {question.correct_answer.toLowerCase() === answers[index].toLocaleLowerCase() ? 'Doğru' : 'Yanlış'}
                </li>
              ))}
              </ul>
          </div>
        </div>
      )}
    </>
  );
}
