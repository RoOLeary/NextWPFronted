import { useState } from 'react';
import { useRouter } from 'next/router'; 
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../src/components/Layout'
// data
import { getAllDocumentsWithSlug, getDocument } from '../../lib/api';

// styles
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';

let initialState = {
    blerp: 'Shits'
}

export default function Document({ documentsData }) {


    const [shits, setShits] = useState(initialState.blerp); 

    const giggles = () => {
        if(shits === 'Shits'){
            setShits('Giggles')
        } else {
            setShits(initialState.blerp)
        }
    }

    
    return(
    <Layout>
        <div className={styles.container}>
            <Head>
                <title>Documents | {documentsData.title} </title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
           <main className={styles.main}>
                <h1>{documentsData.title}</h1>
                <div dangerouslySetInnerHTML={{ __html:documentsData.content }} />
                <p>{documentsData.docCPTFields.docTitle}</p> 
                <a onClick={() => giggles()}>
                    <strong>{shits}</strong>
                </a>
                <Link href={`/documents`}>
                    <a>Back to Document List</a>
                </Link>
                
            </main>

        </div>
 </Layout>
    );
}



export async function getStaticPaths(){
    const allDocuments = await getAllDocumentsWithSlug(); 
    return { 
        paths: allDocuments.edges.map(({ node }) => `/documents/${node.slug}`) || [],
        fallback: true
    }
}


export async function getStaticProps({ params }){

    const data = await getDocument(params.slug); 

    return{
        props: {
            documentsData: data.document
        }
    }

}
