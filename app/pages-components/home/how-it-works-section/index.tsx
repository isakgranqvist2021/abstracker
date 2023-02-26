import Link from 'next/link';

export function HowItWorksSection() {
  return (
    <div>
      <div className="container flex flex-col mx-auto lg:p-20 p-6 gap-10 items-center">
        <h3 className="text-center font-semibold lg:text-6xl text-4xl">
          Lorem ipsum dolor sit amet.
        </h3>
        <div className="flex gap-10 justify-center flex-wrap">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img alt="" src="https://i.pravatar.cc/150?img=1" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img alt="" src="https://i.pravatar.cc/150?img=2" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img alt="" src="https://i.pravatar.cc/150?img=3" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img alt="" src="https://i.pravatar.cc/150?img=4" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-center flex items-center gap-5 text-xs lg:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <p className="text-center flex items-center gap-5 text-xs lg:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <p className="text-center flex items-center gap-5 text-xs lg:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <p className="text-center flex items-center gap-5 text-xs lg:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Lorem ipsum dolor sit amet.
          </p>
        </div>

        <Link href="/api/auth/login" className="btn gap-3">
          Lorem, ipsum dolor.
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
