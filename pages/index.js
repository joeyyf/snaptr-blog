import Blogcard from "../components/Blogcard";
import fs from 'fs'
import matter from "gray-matter";

export default function Home(props) {
  console.log(props.posts.data)
  const {posts} = props
  return (
    <div>

      {posts.map((post,index)=>(
        <Blogcard key={index} post={post} />
      ))}

    </div>
  );
}
export async function getStaticProps(){
  // Getting all our posts at build time

  const files = fs.readdirSync("posts");
  
  const posts = files.map((file) => {
    const slug = file.replace(".md", "");
    const filecontent = fs.readFileSync(`posts/${file}`, "utf-8");
    const parsedContent = matter(filecontent);

    const {data} = parsedContent

    return {
      slug,
      data,
    };
  }).filter((post) => post.data.isReleased)
    .sort((post) => post.slug)
    .reverse();

  return {
    props:{
      posts
    }
  }
}
