import axios from 'axios';
import fs from 'fs-extra';
import { XMLParser } from 'fast-xml-parser';

const cleanText = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

async function extractPosts(url) {
  const baseUrl = new URL(url);
  const feedUrls = [
    `${baseUrl.origin}/rss.xml`,
    `${baseUrl.origin}/feed.xml`,
    `${baseUrl.origin}/atom.xml`,
    `${baseUrl.origin}/posts.atom`
  ];
  
  for (const feedUrl of feedUrls) {
    try {
      const response = await axios.get(feedUrl);
      const parser = new XMLParser({ ignoreAttributes: false });
      const parsed = parser.parse(response.data);
      
      const posts = [];
      
      // RSS
      if (parsed.rss?.channel?.item) {
        const items = Array.isArray(parsed.rss.channel.item) ? parsed.rss.channel.item : [parsed.rss.channel.item];
        items.forEach(item => {
          const title = cleanText(item.title);
          const content = cleanText(item.description);
          if (title && content) posts.push({ title, content });
        });
      }
      
      // Atom
      if (parsed.feed?.entry) {
        const entries = Array.isArray(parsed.feed.entry) ? parsed.feed.entry : [parsed.feed.entry];
        entries.forEach(entry => {
          const title = cleanText(entry.title);
          const content = cleanText(entry.content?.['#text'] || entry.content);
          if (title && content) posts.push({ title, content });
        });
      }
      
      if (posts.length > 0) return posts;
    } catch (e) {}
  }
  return [];
}

const POSTS_PER_FILE = 10;

async function savePosts(posts) {
  await fs.ensureDir('./scraper/scraped');
  
  const totalBatches = Math.ceil(posts.length / POSTS_PER_FILE);
  
  for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
    const startIndex = batchIndex * POSTS_PER_FILE;
    const endIndex = Math.min(startIndex + POSTS_PER_FILE, posts.length);
    const batchPosts = posts.slice(startIndex, endIndex);
    
    const filename = `./scraper/scraped/batch_${batchIndex + 1}_posts_${startIndex + 1}-${endIndex}.txt`;
    
    let content = '';
    batchPosts.forEach((post, index) => {
      if (index > 0) content += '\n\n';
      content += `${post.title}\n\n${post.content}`;
    });
    
    await fs.writeFile(filename, content);
  }
}

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.log('Usage: node scraper/scrape.js <url>');
    process.exit(1);
  }
  
  const posts = await extractPosts(url);
  if (posts.length === 0) {
    console.log('No posts found');
    return;
  }
  
  await savePosts(posts);
  console.log(`Saved ${posts.length} posts`);
}

main().catch(console.error); 