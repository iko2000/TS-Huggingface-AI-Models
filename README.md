# 🤖 AI Model Microservice

A lightweight Node.js microservice that provides easy access to Hugging Face models in JavaScript/TypeScript applications. This service acts as a bridge between your applications and powerful AI models, making it simple to integrate machine learning capabilities without the complexity of managing models directly.

## ✨ Features

- 🚀 **Easy Integration**: Simple REST API for AI model inference
- 🎭 **Sentiment Analysis**: Analyze text sentiment with state-of-the-art models
- ⚡ **Fast & Lightweight**: Built with Express.js for optimal performance
- 🔄 **Model Caching**: Models are loaded once and reused for better performance
- 📊 **Health Monitoring**: Built-in health checks and status endpoints
- 🛡️ **Error Handling**: Comprehensive error handling and validation
- 📝 **TypeScript Support**: Full TypeScript support for better development experience

## 🏗️ Architecture

This microservice uses the `@xenova/transformers` library to run Hugging Face models directly in Node.js, eliminating the need for Python dependencies or external AI services.

```
┌─────────────────┐    HTTP/REST    ┌──────────────────┐    @xenova/transformers    ┌─────────────────┐
│   Your App      │ ──────────────> │   AI Service     │ ─────────────────────────> │  Hugging Face   │
│                 │                 │                  │                            │     Models      │
└─────────────────┘                 └──────────────────┘                            └─────────────────┘
```

## 📦 Installation

git clone https://github.com/iko2000/TS-Huggingface-AI-Models



### Environment Variables

```bash
PORT=3000                    # Service port (default: 3000)
NODE_ENV=development         # Environment
```

### Model Configuration

You can easily switch models by changing the `SENTIMENT_MODEL` constant:

```typescript
// Popular alternatives:
const SENTIMENT_MODEL = 'Xenova/bert-base-multilingual-uncased-sentiment';
const SENTIMENT_MODEL = 'Xenova/twitter-roberta-base-sentiment-latest';
```

## 📊 Performance

- **Model Loading**: ~5-10 seconds on first startup
- **Inference Time**: ~100-500ms per request
- **Memory Usage**: ~200-500MB (varies by model)
- **Concurrent Requests**: Supports multiple concurrent requests

## 🛠️ Development

### Project Structure
```
ai-model-microservice/
├── index.ts              # Main service file
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
└── README.md            # This file
```

### Adding Features

The service is designed to be easily extensible:

- **New Models**: Add more AI capabilities
- **Batch Processing**: Process multiple texts at once
- **Caching**: Add Redis for response caching
- **Authentication**: Add API key validation
- **Rate Limiting**: Prevent abuse
- **Logging**: Add structured logging

## 🚨 Troubleshooting

### Common Issues

**Model not found error**
```
Error: Could not locate file: "https://huggingface.co/..."
```
- Ensure the model name is correct and exists on Hugging Face
- Check your internet connection
- Verify the model is compatible with `@xenova/transformers`

**Out of memory**
```
JavaScript heap out of memory
```
- Increase Node.js memory: `node --max-old-space-size=4096 index.js`
- Use smaller models for resource-constrained environments

**Port already in use**
```
EADDRINUSE: address already in use :::3000
```
- Change the port: `PORT=3001 npm run dev`
- Kill the existing process: `lsof -ti:3000 | xargs kill`

## 📄 License

MIT License - feel free to use this in your projects!

## 🤝 Contributing

This is a template/example service. Feel free to:
- Fork and modify for your needs
- Add more models and endpoints
- Improve error handling and logging
- Add tests and documentation

## 🔗 Useful Links

- [Hugging Face Models](https://huggingface.co/models)
- [@xenova/transformers Documentation](https://huggingface.co/docs/transformers.js)
- [Transformers.js Examples](https://github.com/xenova/transformers.js)

---
