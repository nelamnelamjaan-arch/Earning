import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const toolDir = path.join(process.cwd(), "content", "tools");

export function getToolArticleBySlug(slug: string) {
  const filePath = path.join(toolDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(source);
  return content;
}
