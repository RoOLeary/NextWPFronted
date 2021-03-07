import { useRouter } from 'next/router'; 
import dynamic from "next/dynamic";
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../src/components/Layout'

// data
import { getAllPagesWithSlug, getPage } from '../lib/api';

// styles
import styles from '../styles/Home.module.css';
import blogStyles from '../styles/Blog.module.css';




export default function Page({ postData }) {
    const router = useRouter(); 
    const FlexUnit = dynamic(() => import('../src/components/FlexUnit'));
    const OtherUnit = dynamic(() => import('../src/components/OtherUnit'));
    const Tabunit = dynamic(() => import('../src/components/Tabunit'));
    const VideoEmbed = dynamic(() => import('../src/components/VideoEmbed'));


    
    const blocks = postData.pageBy.pageBlocks.pageblocks;
    console.log(blocks);
        
    const output = blocks.map((r, i) => {
        let fieldGroupNames = r.fieldGroupName;
        let pageObject = {
            groupName: r.fieldGroupName,
            additional_text: r.additionalText,
            videoEmbedCode: r.videoEmbedCode,
            tabs: r.tabs
        }
        switch(fieldGroupNames) {
            case 'page_Pageblocks_Pageblocks_Flexgroup':
                return <FlexUnit key={i} data={pageObject['additional_text']} />
                break;
            case 'page_Pageblocks_Pageblocks_VideoEmbed':
                return <VideoEmbed key={i} data={pageObject['videoEmbedCode']}/>
                break;
            case 'page_Pageblocks_Pageblocks_TabUnit':
                return <Tabunit key={i} data={pageObject['tabs']}/>
                break;
            default:
                // code block
            }
    })
                
    return(
        <Layout>
        <div className={styles.container}>
            <Head>
                <title>About</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className={styles.main}>
                 <Link href={`/`}>
                    <a>Home</a>
                </Link>
                 <h1>{postData.pageBy.title}</h1>
                 <div dangerouslySetInnerHTML={{ __html:postData.pageBy.content }} />
                <div className="container">
                    <h3>Blocks</h3>
                     {output} 
                </div>
                <Link href={`/blog`}>
                    <a>Back to Blog Index</a>
                </Link>
            </main>
        </div>
    </Layout>
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
    // console.log(data);
    return{
        props: {
            postData: data
        }
    }
}