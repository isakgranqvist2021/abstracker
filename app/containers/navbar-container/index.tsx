import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

type NavbarContainerProps = PropsWithChildren<{
  pageOptions?: { href: string; title: string };
}>;

export function NavbarContainer(props: NavbarContainerProps) {
  const { children, pageOptions } = props;

  const { user } = useUser();

  return (
    <div className="drawer">
      <input id="main-nav" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label htmlFor="main-nav" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <ul className="menu menu-horizontal">
              {pageOptions ? (
                <li>
                  <Link href={pageOptions.href}>{pageOptions.title}</Link>
                </li>
              ) : (
                <li>
                  <Link href={user ? '/account' : '/'}>AbsTracker</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              <li>
                {user ? (
                  <Link href="/api/auth/logout">Logout</Link>
                ) : (
                  <Link href="/api/auth/login">Login</Link>
                )}
              </li>
            </ul>
          </div>
        </div>

        {children}
      </div>

      <div className="drawer-side">
        <label htmlFor="main-nav" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100">
          <li>
            {user ? (
              <Link href="/api/auth/logout">Logout</Link>
            ) : (
              <Link href="/api/auth/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
