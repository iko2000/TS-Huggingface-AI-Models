import express from 'express';
import { pipeline, type Pipeline } from '@xenova/transformers';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Model state
let sentimentModel: Pipeline | null = null;

// Valid model name
const SENTIMENT_MODEL = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';

// Middleware
app.use(express.json());

// Model initialization
async function initializeModel(): Promise<void> {
  console.log('🤖 Loading sentiment model...');
  
  try {
    console.log(`Loading sentiment model: ${SENTIMENT_MODEL}...`);
    sentimentModel = await pipeline('sentiment-analysis', SENTIMENT_MODEL);
    console.log('✅ Sentiment model loaded successfully!');
    
  } catch (error) {
    console.error('❌ Failed to load model:', error);
    throw error;
  }
}

// Sentiment analysis function
async function analyzeSentiment(text: string): Promise<any> {
  if (!sentimentModel) {
    throw new Error('Sentiment model not initialized');
  }

  const result = await sentimentModel(text);
  return result;
}

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World from AI Model Microservice! 🚀',
    service: 'ai-model',
    model: SENTIMENT_MODEL,
    modelLoaded: !!sentimentModel,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ai-model',
    model: SENTIMENT_MODEL,
    modelLoaded: !!sentimentModel,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Sentiment analysis endpoint
app.post('/sentiment', async (req, res) => {
  if (!sentimentModel) {
    return res.status(503).json({
      error: 'Sentiment model not loaded yet',
      timestamp: new Date().toISOString()
    });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      error: 'Text is required',
      timestamp: new Date().toISOString()
    });
  }

  try {
    const result = await analyzeSentiment(text);
    
    res.json({
      text,
      sentiment: result,
      model: SENTIMENT_MODEL,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    res.status(500).json({
      error: 'Sentiment analysis failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Start server with model initialization
async function startServer() {
  console.log('🚀 Starting AI Model microservice...');

  try {
    await initializeModel();
    
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`🎭 Sentiment analysis: POST http://localhost:${PORT}/sentiment`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();