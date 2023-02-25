import React, { PropsWithChildren } from 'react';

export function MainContainer(props: React.ComponentPropsWithoutRef<'main'>) {
  const { children, className, ...rest } = props;

  return (
    <main className={['p-5 grow flex flex-col', className].join(' ')} {...rest}>
      {children}
    </main>
  );
}
