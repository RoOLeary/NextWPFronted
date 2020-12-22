import Head from 'next/head';
import Link from 'next/link';

// styles
import styles from '../styles/Home.module.css';
import blogStyles from '../styles/Blog.module.css';

import { getProduct } from '../lib/api';

export default function Cart({ cartData }) {

    return(
    <div className={styles.container}>
            <Head>
                <title>CART</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className={styles.main}>
                 <h1>CART PAGE</h1>
                
                <Link href={`/products`}>
                    <a>Back to Products</a>
                </Link>
               
            </main>

        </div>
    );

}

// export async function getStaticProps({ params }){
//     const data = await getProduct(params.slug); 

//     return{
//         props: {
//             cartData: data.product
//         }
//     }
// }