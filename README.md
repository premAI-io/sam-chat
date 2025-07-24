# PremAI Sample: Chat with Fine-Tuned Models

A complete Next.js application that demonstrates the full workflow of collecting data, fine-tuning models, and chatting with your custom AI models using PremAI.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up your API key (see Setup section)
cp .env.example .env

# Start the development server
npm run dev
```

Visit http://localhost:3000 to start chatting with your fine-tuned models!

## 📋 Complete Workflow

### 1. 📊 Collect Data from Website

Use the integrated scraper to gather training data from any blog:

```bash
# Scrape Sam Altman's blog (perfect for AI/tech content) - it uses rss feed
npm run scrape https://blog.samaltman.com/
```

**What happens:**
- 🔍 Automatically finds RSS/Atom feeds 
- 💾 Saves in batches of 10 posts to `./scraper/scraped/`

**Output:** Text files ready for building dataset (e.g., `batch_1_posts_1-10.txt`)

### 2. 🎯 Fine-tune Models in Studio

**Step 1: Create Dataset**
1. Visit [PremAI Studio Datasets](https://studio.premai.io/datasets)
2. **Create a new dataset** based on synthetic data
3. **Upload your text files** from `./scraper/scraped/` (the batch files you generated)

**Step 2: Prepare Training Data**
1. **Move data to training/validation samples** (you can use the autosplit feature for automatic data splitting)
2. **Create a snapshot** based on your training and validation datasets
3. Review your data split ratios and ensure quality

**Step 3: Fine-tune Your Model**
1. Go to [PremAI Studio Fine-tuning](https://studio.premai.io/finetuning)
2. **Run a fine-tuning job** using your prepared dataset snapshot
3. **Monitor experiments** and track training progress
4. **After completion** - your custom models are ready to use in the chat interface!

Your model will now have deep knowledge from the blogs you scraped and can answer questions with domain-specific expertise!

### 3. 💬 Use Your Fine-Tuned Model

**Launch the Chat Interface:**
```bash
npm run dev
```

**Features:**
- 🤖 **Dynamic Model Selection** - Automatically loads your fine-tuned models
- 💬 **Rich Chat Interface** - Markdown formatting, code blocks, lists
- 🔒 **Secure Backend** - API keys stay server-side
- ⚡ **Real-time Responses** - Powered by PremAI SDK
- 📱 **Modern UI** - Built with Next.js 15 + Tailwind CSS 4

Ask questions about the content you trained on and see how your model responds with domain-specific knowledge!

## ⚙️ Setup

### 1. Environment Variables

Create a `.env` file in the root directory:

```bash
PREMAI_API_KEY=your_api_key_here
```

### 2. Get Your API Key

1. Sign up at [PremAI](https://premai.io/)
2. Get your API key from [API Keys page](https://premai.io/apiKeys)
3. Add it to your `.env` file

## 🏗️ Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts      # Chat API endpoint
│   │   │   └── models/route.ts    # Models listing API
│   │   ├── page.tsx               # Main chat interface
│   │   └── layout.tsx             # App layout
│   ├── components/                # React components
│   │   ├── ChatHeader.tsx
│   │   ├── MessageList.tsx
│   │   ├── MessageInput.tsx
│   │   └── ModelSelector.tsx
│   └── types/
│       └── errors.ts              # Type-safe error handling
├── scraper/
│   └── scraped/                   # Generated content (gitignored)
├── scrape.js                      # Standalone scraper script
└── package.json                   # Dependencies & scripts
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start Next.js dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Data Collection
npm run scrape <url> # Scrape blog content for training
```

## 🎯 Why This Stack?

### **Next.js 15** 
- Full-stack framework with API routes
- Server-side API key security
- Modern React 19 features

### **PremAI SDK**
- Easy integration with fine-tuned models
- Dynamic model listing
- Reliable chat completions

### **RSS/Atom Scraping**
- Universal blog format support
- Clean, complete content extraction
- No brittle HTML parsing
- Perfect for training data

### **Tailwind CSS 4**
- Modern, responsive UI
- Zero-config setup
- Consistent design system

## 🔒 Security Features

- ✅ **Server-side API keys** - Never exposed to frontend
- ✅ **Type-safe error handling** - Consistent error responses  
- ✅ **Input validation** - Protected API endpoints
- ✅ **Secure logging** - No sensitive data in logs

## 📝 Example Use Cases

1. **Customer Support Bot** - Train on your documentation
2. **Domain Expert** - Train on industry-specific content  
3. **Writing Assistant** - Train on your preferred writing style
4. **Knowledge Base** - Train on company knowledge/procedures

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this for your own projects!

---

**Built with ❤️ using PremAI, Next.js, and modern web technologies.** 