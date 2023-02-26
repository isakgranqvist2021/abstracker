import Link from 'next/link';

export function CallToActionFooterSection() {
  return (
    <div className="bg-base-200">
      <div className="mx-auto lg:p-20 px-6 py-20 flex justify-center lg:justify-around container gap-10 items-center mx-auto flex-wrap">
        <h4 className="lg:text-left font-medium text-center lg:text-6xl text-4xl">
          Lorem, ipsum.
        </h4>
        <Link href="/api/auth/login" className="btn btn-primary">
          Lorem, ipsum dolor.
        </Link>
      </div>
    </div>
  );
}
