import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse lg:justify-center lg:items-center lg:gap-20 lg:p-20 p-6">
        <img
          alt=""
          src="/images/pexels-guilherme-almeida-1858175.jpg"
          className="max-w-sm rounded-lg shadow-2xl max-w-full"
        />
        <div className="lg:mt-0 mt-4 flex flex-col lg:items-start items-center">
          <h1 className="lg:text-6xl text-4xl font-black lg:text-left text-center">
            Lorem, ipsum dolor.
          </h1>
          <p className="py-6 max-w-prose lg:text-left text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad iure
            optio ab, quas fuga laborum id expedita odit molestias quidem!
          </p>
          <Link href="/api/auth/login" className="btn btn-primary lg:mx-0">
            Lorem, ipsum.
          </Link>
        </div>
      </div>
    </div>
  );
}
