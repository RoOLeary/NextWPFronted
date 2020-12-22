import { useRouter } from 'next/router'; 
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../src/components/Layout'

// data
import { getAllProductsWithSlug, getProduct } from '../../lib/api';

// styles
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';

export default function Product({ productData }) {


    // console.log(productData);
    
    const router = useRouter(); 
    if(!router.isFallback && !productData?.slug){
        return <p>Something's fucked</p>; 
    }

   
    return(

      <Layout>  
        <div className={styles.container}>
            <Head>
                <title>{productData.title}</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
           <main className={styles.main}>
                <h1>{productData.name}</h1>
                <div dangerouslySetInnerHTML={{ __html:productData.description }} />
                <h2>{productData.price ? productData.price : '' }</h2>
                {/* <h4>Regular: {productData.price ? productData.price : productData.regularPrice }</h4> */}
                {/* <br />
                {productData.salePrice ? <p>{productData.salePrice}</p> : ``} */}
                <Link href={`/cart/`}>
                    <a>Add to Cart</a>
                </Link>
                
                <Link href={`/products`}>
                    <a>Back to Product List</a>
                </Link>
                
            </main>

        </div>
      </Layout>
    );
}

export async function getStaticPaths(){
    const allProducts = await getAllProductsWithSlug(); 

    return { 
        paths: allProducts.edges.map(({ node }) => `/products/${node.slug}`) || [],
        fallback: true
    }
}

export async function getStaticProps({ params }){
    const data = await getProduct(params.slug); 

    return{
        props: {
            productData: data.product
        }
    }
}