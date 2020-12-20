import { useRouter } from 'next/router'; 
import Head from 'next/head';
import Link from 'next/link';

// data
import { getPagesBySlug, getPage } from '../lib/api';

// styles
import styles from '../styles/Home.module.css';
import blogStyles from '../styles/Blog.module.css';

export default function About() {
    return(
        <div className={styles.container}>
            <Head>
                <title>ABOUT</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className={styles.main}>
                <h1>ABOUT</h1>
               
                <p>Suck my balls</p>
            </main>

        </div>

    );
}
