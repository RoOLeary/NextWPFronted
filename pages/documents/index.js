import { useEffect } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../src/components/Layout'
// styles
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';

// data
import { getAllDocuments } from '../../lib/api';


const Documents = ({ allDocuments: { edges } }) => (


<Layout>
  <div className={styles.container}>
    <Head>
      <title>Documents</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>Latest Documents</h1>
       <Link href={`/`}>
            <a>Home</a>
        </Link>
      <hr />
      <section>
        {edges.map(({ node }) => (
          <div className={blogStyles.listitem} key={node.id}>
            
            <div className={blogStyles.listitem__content}>
              <h2>{node.title}</h2>
               <div dangerouslySetInnerHTML={{ __html:node.description }} />
              <Link href={`/documents/${node.slug}`}>
                <a>MORE INFO ></a>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  </div>
  </Layout>
);


export async function getStaticProps() {
  const allDocuments = await getAllDocuments();
  return {
    props: {
      allDocuments
    }
  };
}

export default Documents