import { useRouter } from 'next/router'; 
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../src/components/Layout'
import Flexgroup from '../src/components/Flexgroup'
import Tabunit from '../src/components/Tabunit'
import CalloutUnit from '../src/components/CalloutUnit'
import VideoEmbed from '../src/components/VideoEmbed'
// data
import { getAllPagesWithSlug, getPage } from '../lib/api';

// styles
import styles from '../styles/Home.module.css';
import blogStyles from '../styles/Blog.module.css';

export default function Page({ postData }) {

    
    const blocks = postData.pageBy.pageBlocks.pageblocks;
    const router = useRouter(); 
    
    console.log(blocks);

    return(
        <Layout>
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
                
                {blocks ? Object.entries(blocks).map(([key]) => {
                    let fieldGroupNames = blocks[key]['fieldGroupName'];
                    let pageObject = {
                        groupName: blocks[key]['fieldGroupName'],
                        title: blocks[key]['title'],
                        additional_text: blocks[key]['additionalText'],
                        textIntro: blocks[key]['textIntro'],
                        selectArticles: blocks[key]['selectArticles'],
                        videoEmbedCode: blocks[key]['videoEmbedCode'],
                        tabs: blocks[key]['tabs']
                    }
                    switch(fieldGroupNames) {
                        case 'page_Pageblocks_Pageblocks_Flexgroup':
                            return <Flexgroup key={key} data={pageObject} />;
                            break;
                        case 'page_Pageblocks_Pageblocks_TabUnit':
                            return <Tabunit key={key} data={pageObject} />;
                            break;
                        case 'page_Pageblocks_Pageblocks_CalloutUnit':
                            return <CalloutUnit key={key} data={pageObject} />;
                            break;
                        case 'page_Pageblocks_Pageblocks_CalloutUnit':
                            return <CalloutUnit key={key} data={pageObject} />;
                            break;
                        case 'page_Pageblocks_Pageblocks_VideoEmbed':
                            return <VideoEmbed key={key} data={pageObject} />;
                            break;                            
                        default:
                            // code block
                        }
                    
                    })
                : ''}
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
    console.log(data);
    return{
        props: {
            postData: data
        }
    }
}