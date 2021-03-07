import { useRouter } from 'next/router'; 
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../src/components/Layout'
// data
import { getAllPostsWithSlug, getPost } from '../../lib/api';

// styles
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';

export default function Post({ postData }) {

    console.log(postData);

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
        <Layout>
        <div className={styles.container}>
            <Head>
                <title>{postData.title}</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className={styles.main}>
                <h1>{postData.title}</h1>
                <p><strong>{postData.dockerwp_test_field}</strong></p>
                <p>Category: {postData.categories.edges[0].node.name}</p>
                <Link href={`/blog`}>
                    <a>Back to Blog Index</a>
                </Link>
                <div dangerouslySetInnerHTML={{ __html:postData.content }} />
            </main>

        </div>
        </Layout>
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