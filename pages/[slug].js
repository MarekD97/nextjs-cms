import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';

import Head from 'next/head';
import Comments from '../components/comments';
import { getEntriesPaths, getEntriesStatic } from './api/entries';
import DisplayModule from '../components/displayModule';

const GeneratedPage = ({data}) => {
    const router = useRouter();
    if (!data) return <p>404</p>
    return (
        <Layout>
          <Head>
            <title>{data.title}</title>
          </Head>
            {data.modules.map((item, index) => (
              <DisplayModule 
                  key={index}
                  index={index} 
                  params={item}
                 />
                    
                ))}
              {data.enableComments && <Comments entryId={data._id} />}
        </Layout>
    );
};
export async function getStaticPaths() {
    const entries = await getEntriesPaths();
    const paths = entries.map((entry) => ({
      params: { slug: entry.slug },
    }))
    return { paths, fallback: true }
  }

export async function getStaticProps({params}) {
    const entry = await getEntriesStatic(params.slug);
    return {
      props: {data: entry},
      revalidate: 1,
    }
  }

export default GeneratedPage;