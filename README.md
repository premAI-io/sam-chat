# PremAI Sample + Minimal Blog Scraper

This project contains:
1. **PremAI Sample** - Basic chat completion example with bedtime story generation
2. **Minimal Blog Scraper** - MVP scraper that uses LLM to extract content from web pages

## PremAI Sample Usage

```bash
# Install dependencies
npm install

# Run PremAI sample (generates unicorn bedtime story)
npm start
```

## Blog Scraper Usage 

```bash
# Scrape all posts from any blog
npm run scrape <blog-url>

# Examples
npm run scrape https://blog.samaltman.com/
npm run scrape https://dev.to/username
npm run scrape https://techcrunch.com/
```

## Setup

1. **Set your PremAI API key** in `.env` (for the chat sample only):
   ```bash
   PREMAI_API_KEY=your_api_key_here
   ```

2. **Get your API key**: https://premai.io/apiKeys

**Note**: The blog scraper doesn't need any API keys - it uses RSS feeds directly!

## How the Scraper Works

1. **Finds RSS/Atom feeds** automatically from any blog
2. **Parses XML content** directly from feeds (no HTML scraping!)
3. **Saves posts in batches** of 10 to `./scraper/scraped/{timestamp}_{domain}_batch_X.txt`

## Files

- `index.js` - PremAI sample app
- `scraper/scrape.js` - Clean RSS/Atom feed parser (~220 lines)
- `scraper/scraped/*.txt` - Scraped content output (batched)

## Why RSS/Atom Feeds?

RSS/Atom feeds are the perfect data source for blog content extraction:

- **Universal** - Standard format across all blog platforms
- **Complete** - Contains full article content, not just snippets
- **Fast** - Single request gets all posts vs individual page scraping
- **Reliable** - No HTML parsing, selectors, or layout dependencies
- **Clean** - Pre-formatted content without ads/navigation

Perfect for content extraction and demos! 🚀 