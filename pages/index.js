import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import Layout from '../src/components/Layout'


export default function Home() {
  return (

    
    <Layout>
    
    <div className={styles.container}>
      <Head>
        <title>NextJS WooCommerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to our demo blog!</h1>

      <p>
        You can find more articles on the{' '}
        <Link href='/blog'>
        <a>blog articles page</a>
        </Link>
        <br />
        <Link href='/products'>
        <a>products page</a>
        </Link>
      </p>
      <p>
        You can find more articles on the{' '}
        <Link href='/sample-page'>
        <a>Go to Sample</a>
        </Link>
      </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
    </Layout>
  )
}
