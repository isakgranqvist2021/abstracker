import Link from 'next/link';
import { PropsWithChildren } from 'react';

type BreadCrumbProps = PropsWithChildren<{
  href: string;
}>;

export function BreadCrumb(props: BreadCrumbProps) {
  const { children, href } = props;

  return (
    <li>
      <Link href={href}>{children}</Link>
    </li>
  );
}

export function BreadCrumbs(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className="bg-base-200 lg:px-10 py-2 px-5">
      <div className="text-sm breadcrumbs">
        <ul>{children}</ul>
      </div>
    </div>
  );
}
