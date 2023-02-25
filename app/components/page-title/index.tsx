type PageTitleProps = React.ComponentPropsWithoutRef<'h1'>;

export function PageTitle(props: PageTitleProps) {
  const { children, className } = props;

  return (
    <h1 className={['text-5xl text-primary font-bold', className].join(' ')}>
      {children}
    </h1>
  );
}
