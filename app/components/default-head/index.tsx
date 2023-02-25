import Head from 'next/head';

interface DefaultHeadProps {
  title: string;
}

export function DefaultHead(props: DefaultHeadProps) {
  const { title } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="AbsTracker" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
