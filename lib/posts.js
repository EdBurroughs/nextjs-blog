import fs from 'fs';
import path from 'path'
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
        //remove .md from filenames to create id
        const id = fileName.replace(/\.md$/, '');

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8')

        const frontMatter = matter(fileContents)

        return {
            id,
            ...frontMatter.data
        }
    })

    return allPostsData.sort( ({date: a}, {data: b}) => {
        if (a<b){
            return 1
        }else if (a>b){
            return 0
        }
    })
}

export function getAllPostsIDs(){
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map( fileName => {
        return {
            params : {
                id : fileName.replace(/\.md$/, ''),
            }
        }
    })
}

export async function getPostData(id){
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, 'utf8')

    const frontMatter = matter(fileContent)

    const processedContent = await remark()
        .use(html)
        .process(frontMatter.content)
    
    const contentHTML = processedContent.toString()

    return{
        id, 
        contentHTML,
        ...frontMatter.data
    }
}