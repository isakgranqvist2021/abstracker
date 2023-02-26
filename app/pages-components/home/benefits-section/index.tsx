export function BenefitsSection() {
  return (
    <div className="bg-base-200 lg:p-20 px-8 py-20">
      <div className="mx-auto hero-content flex-col lg:flex-row lg:justify-center lg:items-center lg:gap-20">
        <img
          width={300}
          alt=""
          src="/images/pexels-pranav-digwal-32976.jpg"
          className="max-w-sm rounded-lg shadow-2xl max-w-full"
        />
        <div className="lg:mt-0 mt-4">
          <h1 className="text-2xl lg:text-5xl font-bold lg:text-left text-center">
            Lorem, ipsum dolor.
          </h1>
          <p className="py-6 max-w-prose lg:text-left text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
            quis non tempora totam modi id impedit aspernatur enim neque magni
            quibusdam, blanditiis magnam quasi, voluptatibus vel facere aut et
            quidem.
          </p>
        </div>
      </div>
    </div>
  );
}
