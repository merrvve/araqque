'use client'
// components/QuestionList.tsx
import React, { useState } from 'react';
import useQuestionStore from '../stores/questionStore';
import { Question } from '../types/question';

const QuestionList: React.FC = () => {
    const { questions } = useQuestionStore();
   

    return (
            
        
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        Soru: <strong>{question.questionStr}:</strong>  Cevap: {question.answer}
                        
                    </li>
                ))}
            </ul>
      
    );
};

export default QuestionList;
