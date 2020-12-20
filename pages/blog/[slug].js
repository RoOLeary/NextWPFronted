import { useRouter } from 'next/router'; 
import Head from 'next/head';
import Link from 'next/link';

// data
import { getAllPostsWithSlug, getPost } from '../../lib/api';

// styles
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';

export default function Post({ postData }) {
    const router = useRouter(); 

    if(!router.isFallback && !postData?.slug){
        return <p>Something's fucked</p>; 
    }

    const formatDate = date => {
        const newDate = new Date(date);

        return `${newDate.getDate()}/${
            newDate.getMonth() + 1
        }/${newDate.getFullYear()}`;
    };


    return(
        <div className={styles.container}>
            <Head>
                <title>{postData.title}</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className={styles.main}>
                <h1>{postData.title}</h1>
                <div dangerouslySetInnerHTML={{ __html:postData.content }} />
            </main>

        </div>

    );
}

export async function getStaticPaths(){
    const allPosts = await getAllPostsWithSlug(); 

    return { 
        paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
        fallback: true
    }
}

export async function getStaticProps({ params }){
    const data = await getPost(params.slug); 

    return{
        props: {
            postData: data.post
        }
    }
}