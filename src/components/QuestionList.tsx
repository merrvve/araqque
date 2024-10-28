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
                    <li key={question.id} className='mb-5'>
                        
                       <h5 className='text-xl font-bold underline mb-2'>Soru No: {question.id +1}</h5>
                       <p>
                        <strong className='m-2'>
                        Soru Tipi: 
                        </strong>
                        {question.question_type}
                       </p>
                       <p>
                        <strong className='m-2'>
                            Soru: 
                        </strong>
                        {question.question}
                       </p>
                       {question.question_type!=='Boşluk Doldurma Sorusu' && 
                       <>
                       <strong className='m-2'>
                            Seçenekler: 
                        </strong>
                        {question.choices.map((choice)=>(
                            <div className='ml-3' key={choice}>
                                {choice}
                            </div>
                        ))}
                       </>
                       }
                        
                        <p>
                            <strong className='m-2'>
                                Doğru Cevap: 
                            </strong>
                            {
                                question.correct_answer
                            }
                        </p>
                       
                        
                    </li>
                ))}
            </ul>
      
    );
};

export default QuestionList;
