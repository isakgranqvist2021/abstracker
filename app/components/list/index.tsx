import { PropsWithChildren } from 'react';

export function ListItem(props: React.ComponentPropsWithoutRef<'li'>) {
  const { children, ...rest } = props;

  return (
    <li
      className="flex items-center justify-between p-2"
      role="listitem"
      {...rest}
    >
      {children}
    </li>
  );
}

export function List(props: PropsWithChildren) {
  const { children } = props;

  return (
    <ul role="list" className="rounded-md divide-y w-full">
      {children}
    </ul>
  );
}
