import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const storiesDir = path.join(root, "content", "stories");
const outputPath = path.join(root, "public", "search-index.json");

const files = fs.existsSync(storiesDir)
  ? fs.readdirSync(storiesDir).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
  : [];

const stripMdx = (text) =>
  text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const index = files.map((file) => {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(storiesDir, file), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    dek: data.dek,
    lane: data.lane,
    tags: data.tags || [],
    publishedAt: data.publishedAt,
    body: stripMdx(content)
  };
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));
console.log(`Wrote ${index.length} search records to ${outputPath}`);
