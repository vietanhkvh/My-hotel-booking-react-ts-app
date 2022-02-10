import { some } from '@components/constants';
import { Helmet } from 'react-helmet';
import React from 'react';
import styles from './Layout.module.scss';
declare global {
  interface Window {
    vntCa: any;
  }
}

export default function LayoutCus({
  children,
  contents,
}: {
  children?: React.ReactNode;
  contents?: some;
}) {
  return (
    <>
      <Helmet>
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta
          name='viewport'
          content='initial-scale=1.0, maximum-scale=1.0, width=device-width, user-scalable=no'
        />
        {/* <meta name='robots' content='Noindex, nofollow' /> */}
        <link
          rel='icon'
          type='/image/png'
          sizes='16x16'
          href={contents?.icon}
        />
        <link rel='canonical' href='' />

        <title>{contents?.title}</title>
        <meta property='og:image' content={contents?.shareImg} />
        <meta property='og:title' content={contents?.title} />
        <meta property='og:url' content={contents?.url} />
        <meta property='og:type' content='article' />
        {/* <html lang='vi' /> */}
        <meta
          property='og:description'
          name='description'
          content={contents?.description}
        />
        <meta property='og:locale' content='en_GB' />
      </Helmet>
        {children}
    </>
  );
}
