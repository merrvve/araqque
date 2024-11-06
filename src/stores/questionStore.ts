// stores/useQuestionStore.ts
import {create} from 'zustand';
import { Question } from '../types/question'; // Adjust the path according to your project structure

interface QuestionStore {
    questions: Question[];
    addQuestion: (question: Question) => void;
    removeQuestion: (id: number) => void;
    clearQuestions: () => void;
    updateQuestionTime: (index: number, timeSpent: number) => void;
}

const useQuestionStore = create<QuestionStore>((set) => ({
    questions: [],
    addQuestion: (question) => set((state) => ({
        questions: [...state.questions, question],
    })),
    removeQuestion: (id) => set((state) => ({
        questions: state.questions.filter(question => question.id !== id),
    })),
    clearQuestions: () => set({ questions: [] }),
    updateQuestionTime: (index: number, timeSpent: number) =>
        set((state) => {
          const updatedQuestions = [...state.questions];
          updatedQuestions[index] = {
            ...updatedQuestions[index],
            completion_time: timeSpent,
          };
          return { questions: updatedQuestions };
        }),
}));

export default useQuestionStore;
