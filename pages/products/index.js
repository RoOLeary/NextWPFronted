import { useEffect } from 'react'
import Head from 'next/head';
import Link from 'next/link';

// styles
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';

// data
import { getAllProducts } from '../../lib/api';


const Products = ({ allProducts: { edges } }) => (


  <div className={styles.container}>
    <Head>
      <title>Products</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>Latest Products</h1>
       <Link href={`/`}>
            <a>Home</a>
        </Link>
      <hr />
      <section>
        {edges.map(({ node }) => (
          <div className={blogStyles.listitem} key={node.id}>
            
            <div className={blogStyles.listitem__content}>
              <h2>{node.name}</h2>
               <h2>{node.price ? node.price : 'FREEEEE' }</h2>
               <div dangerouslySetInnerHTML={{ __html:node.description }} />
              <Link href={`/products/${node.slug}`}>
                <a>MORE INFO ></a>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  </div>
);


export async function getStaticProps() {
  const allProducts = await getAllProducts();
  return {
    props: {
      allProducts
    }
  };
}

export default Products