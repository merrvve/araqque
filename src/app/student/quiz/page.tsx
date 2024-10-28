import Quiz from "@/components/Quiz";

export default function QuizPage() {
    return (
      <>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]">
          <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <h1 className="text-2xl font-bold mb-5">Sorular</h1>
              <Quiz />
          </div>
        </div>
      </>
    );
  }
  