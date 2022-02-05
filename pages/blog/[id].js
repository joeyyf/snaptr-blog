import fs from "fs";
import matter from "gray-matter";
import md from 'markdown-it'

export default function Blog({ frontmatter ,content}) {

  return (
    <div className="w-100">
      <img src={`/${frontmatter.socialImage}`} className="w-3/4 mx-auto" />
      <div className="prose w-3/4  mx-auto">
        <h1 className="text-3xl">{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }}></div>
      </div>
    </div>
  );
}



export async function getStaticPaths() {
  // Get all the paths from slugs or file names
  const files = fs.readdirSync("posts");
  const paths = files.map((files) => ({
    params: {
      id: files.replace(".md", ""),
    },
  }));
  console.log("paths",paths)
  return {
    paths,
    fallback:false
  }
}

export async function getStaticProps({params:{id}}){
    const fileName = fs.readFileSync(`posts/${id}.md`, "utf-8");
    const { data: frontmatter, content } = matter(fileName);
    return {
      props: {
        frontmatter,
        content,
      },
    };
}