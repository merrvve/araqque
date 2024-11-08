import Login from "./Login";

export const Hero = () => {
    return (
        <section className="min-h-screen">
        <div className="container px-10 py-5 mx-auto flex flex-wrap items-center">
          <div className="md:w-1/2 md:px-16 lg:pr-0 pr-0 w-full mb-5 text-center sm:text-start">
            <h1 className="title-font font-bold text-4xl md:leading-loose leading-normal text-gray-900">Araqque&apos;ye Hoşgeldiniz.</h1>
            <p className="leading-relaxed mt-4">Açıklama</p>
          </div>
          <div className="md:w-1/2 w-full">
            <Login />
          </div>
        </div>
      </section>
    );
}