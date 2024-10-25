'use client'
// components/QuestionList.tsx
import React, { useState } from 'react';
import useQuestionStore from '../stores/questionStore';
import { Question } from '../types/question';

const QuestionList: React.FC = () => {
    const { questions, addQuestion, removeQuestion, clearQuestions } = useQuestionStore();
    const [questionStr, setQuestionStr] = useState('');
    const [choices, setChoices] = useState<string[]>(['']);
    const [answer, setAnswer] = useState('');

    const handleAddQuestion = () => {
        const newQuestion: Question = {
            id: questions.length + 1,
            questionStr,
            choices,
            answer,
        };
        addQuestion(newQuestion);
        // Reset fields
        setQuestionStr('');
        setChoices(['']);
        setAnswer('');
    };

    const handleChoiceChange = (index: number, value: string) => {
        const newChoices = [...choices];
        newChoices[index] = value;
        setChoices(newChoices);
    };

    return (
        <div>
            <h1>Question List</h1>
            <input
                type="text"
                value={questionStr}
                onChange={(e) => setQuestionStr(e.target.value)}
                placeholder="Question"
            />
            {choices.map((choice, index) => (
                <input
                    key={index}
                    type="text"
                    value={choice}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                    placeholder={`Choice ${index + 1}`}
                />
            ))}
            <button onClick={() => setChoices([...choices, ''])}>Add Choice</button>
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Answer"
            />
            <button onClick={handleAddQuestion}>Add Question</button>
            <button onClick={clearQuestions}>Clear Questions</button>

            <h2>Questions:</h2>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        {question.questionStr} - {question.answer}
                        <button onClick={() => removeQuestion(question.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionList;
