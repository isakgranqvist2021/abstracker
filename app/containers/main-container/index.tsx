import { PropsWithChildren } from 'react';

export function MainContainer(props: PropsWithChildren) {
  const { children } = props;

  return <main className="p-5 grow flex flex-col">{children}</main>;
}
