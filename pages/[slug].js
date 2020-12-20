import { useRouter } from 'next/router'; 
import Head from 'next/head';
import Link from 'next/link';

// data
import { getAllPagesWithSlug, getPage } from '../lib/api';

// styles
import styles from '../styles/Home.module.css';
import blogStyles from '../styles/Blog.module.css';

export default function Page({ postData }) {

    //console.log(postData.pageBy.title);

    const router = useRouter(); 

    // if(!router.isFallback && !pageBy.slug){
    //     return <p>Something's fucked</p>; 
    // }

    
    return(
        <div className={styles.container}>
            <Head>
                <title>Sample</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className={styles.main}>
                 <Link href={`/`}>
                    <a>Home</a>
                </Link>
                 <h1>{postData.pageBy.title}</h1>
                 <div dangerouslySetInnerHTML={{ __html:postData.pageBy.content }} />
                <Link href={`/blog`}>
                    <a>Back to Blog Index</a>
                </Link>
               
            </main>

        </div>

    );
}

export async function getStaticPaths(){
    const allPages = await getAllPagesWithSlug(); 

    return { 
        paths: allPages.edges.map(({ node }) => `/${node.slug}`) || [],
        fallback: true
    }
}

export async function getStaticProps({ params }){
    const data = await getPage(params.slug); 
    console.log(data);
    return{
        props: {
            postData: data
        }
    }
}