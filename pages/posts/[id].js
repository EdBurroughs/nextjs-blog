import Head from "next/head";
import Layout from "../../components/Layout";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css'

import { getAllPostsIDs, getPostData } from "../../lib/posts";

const Post = ({postData}) => {
  return (
    <Layout>
        <Head>
            <title>{postData.title} </title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXL}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date}/>
            </div>
            <div dangerouslySetInnerHTML={{__html : postData.contentHTML}}></div>     
        </article>
       
     
    </Layout>
  )
}

//gets teh array of possible valus for the post ID
export async function getStaticPaths(){
    const paths = getAllPostsIDs();

    return {
        paths,
        fallback : false
    }
}

export async function getStaticProps({params}){
    const postData = await getPostData(params.id);

    return {
        props : {
            postData
        }
    }

}

export default Post