import { GoogleGenerativeAI } from '@google/generative-ai';
import ragService from './ragService.js';

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('⚠️  GEMINI_API_KEY not set - chatbot will be disabled');
      this.client = null;
    } else {
      this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      this.model = this.client.getGenerativeModel({ model: 'gemini-2.5-flash' });
    }
    this.conversationHistory = new Map();
  }

  async chat(message, sessionId = 'default') {
    if (!this.client) {
      throw new Error('Gemini API key not configured');
    }
    
    try {
      // Load knowledge if not already loaded
      if (!ragService.knowledge) {
        await ragService.loadKnowledge();
      }

      // Get or create conversation history
      if (!this.conversationHistory.has(sessionId)) {
        this.conversationHistory.set(sessionId, []);
      }
      const history = this.conversationHistory.get(sessionId);

      // Build context from knowledge base
      const systemContext = ragService.buildContext(message);

      // Build conversation history for Gemini
      const chatHistory = history.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      // Start chat with history
      const chat = this.model.startChat({
        history: chatHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      });

      // Combine system context with user message
      const fullMessage = history.length === 0 
        ? `${systemContext}\n\nUser question: ${message}`
        : message;

      // Send message
      const result = await chat.sendMessage(fullMessage);
      const response = await result.response;
      const assistantMessage = response.text();

      // Update conversation history (keep last 10 messages)
      history.push({ role: 'user', content: message });
      history.push({ role: 'assistant', content: assistantMessage });
      
      if (history.length > 10) {
        history.splice(0, 2); // Remove oldest exchange
      }

      return {
        message: assistantMessage,
        usage: {
          promptTokens: result.response?.usageMetadata?.promptTokenCount || 0,
          completionTokens: result.response?.usageMetadata?.candidatesTokenCount || 0,
          totalTokens: result.response?.usageMetadata?.totalTokenCount || 0
        }
      };
    } catch (error) {
      console.error('Gemini Error:', error);
      throw error;
    }
  }

  clearHistory(sessionId = 'default') {
    this.conversationHistory.delete(sessionId);
  }
}

export default new GeminiService();
