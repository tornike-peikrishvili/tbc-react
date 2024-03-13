function Landing() {
  return (
    <main className="mb-auto w-full">
      <section className="py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container m-auto flex flex-col items-center justify-center md:text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to our website
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Accessible. Customizable. Open Source.
            </p>
          </div>
          <div className="space-x-4">
            <button className="btn border-black text-white bg-black hover:text-black hover:border-black hover:bg-white">
              Get Started
            </button>
            <button className="btn border-black text-black hover:text-white hover:border-black hover:bg-black">
              Learn More
            </button>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container m-auto text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl pb-10 font-bold tracking-tighter md:text-4xl/tight">
              Meet our trusted Partners
            </h2>
          </div>
          <div className="m-auto w-1/2 flex justify-between items-center">
            <div className="w-24 h-24 bg-gray-400"></div>
            <div className="w-24 h-24 bg-gray-400"></div>
            <div className="w-24 h-24 bg-gray-400"></div>
            <div className="w-24 h-24 bg-gray-400"></div>
            <div className="w-24 h-24 bg-gray-400"></div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
