"use client";

import { useEffect, useState } from "react";
// components/QuestionList.tsx


import useQuestionStore from "../stores/questionStore";

type QuestionState = {
  activeQuestion: number;
  quizState: boolean;
  answers: string[]; // Array to hold answers for each question
  setAnswers: (index: number, answer: string) => void; // Function to update answers
};

const QuestionList: React.FC<QuestionState> = ({ activeQuestion, quizState, answers, setAnswers }) => {
  const { questions, updateQuestionTime } = useQuestionStore();
  const choices = ["A", "B", "C", "D"]
  // Track the start time for each question
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    // Calculate time spent and save to completion_time of previous question
    if (startTime !== null && activeQuestion > 0) {
      const endTime = Date.now();
      const timeSpent = endTime - startTime;

      // Update completion_time for the previous question
      updateQuestionTime(activeQuestion - 1, timeSpent);
    }

    // Set new start time for the current question
    setStartTime(Date.now());

  }, [activeQuestion]); // Re-run this effect when activeQuestion changes


  return (
    <div className="flex flex-col mx-auto p-10 w-screen sm:w-[500px]">
      {questions[activeQuestion] && activeQuestion < 9 && quizState && (
        <>
          <h1 className="text-2xl font-bold mb-5">Sorular</h1>
          <ul>
            <li key={questions[activeQuestion].id} className="mb-5">
              <h5 className="text-xl font-bold underline mb-2">
                Soru No: {questions[activeQuestion].id + 1}
              </h5>

              <p>
                <strong className="m-2">Soru:</strong>
                {questions[activeQuestion].question}
              </p>

              {questions[activeQuestion].question_type !== "Boşluk Doldurma Sorusu" ? (
                <>
                  <strong className="m-2">Seçenekler:</strong>
                  {questions[activeQuestion].choices.map((choice, index) => (
                    <div className="ml-3" key={choice}>
                      <label className="p-2">
                        <input
                        className="p-2"
                          type="radio"
                          name={`question_${questions[activeQuestion].id}`} // Grouping for radio buttons
                          value={choice }
                          checked={questions[activeQuestion].question_type === "Çoktan Seçmeli Test Sorusu" ? (answers[activeQuestion].slice(0,1) === choice.slice(0,1)) : answers[activeQuestion] === choice}
                          onChange={(e) => setAnswers(activeQuestion, e.target.value)} // Update answers on change
                        />
                        {choice}
                      </label>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <strong className="m-2">Cevap:</strong>
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded"
                    value={answers[activeQuestion] || ''} // Use the answer if it exists
                    onChange={(e) => setAnswers(activeQuestion, e.target.value)} // Update answer on change
                  />
                </>
              )}

              
            </li>
          </ul>
        </>
      )}
      {(activeQuestion === 9 || !quizState) && (
        <>
          <h1 className="text-2xl font-bold leading-loose">Testi Tamamladınız!</h1>
        </>
      )}
    </div>
  );
};

export default QuestionList;
