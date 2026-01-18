import OpenAI from 'openai';
import ragService from './ragService.js';

class OpenAIService {
  constructor() {
    if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  OPENAI_API_KEY not set - chatbot will be disabled');
    this.client = null;
  } else {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  this.conversationHistory = new Map();
}

  async chat(message, sessionId = 'default') {
    if (!this.client) {
    throw new Error('OpenAI API key not configured');
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
      const context = ragService.buildContext(message);

      // Build messages array
      const messages = [
        {
          role: 'system',
          content: context
        },
        ...history,
        {
          role: 'user',
          content: message
        }
      ];

      // Call OpenAI API
      const completion = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      });

      const assistantMessage = completion.choices[0].message.content;

      // Update conversation history (keep last 10 messages)
      history.push({ role: 'user', content: message });
      history.push({ role: 'assistant', content: assistantMessage });
      
      if (history.length > 10) {
        history.splice(0, 2); // Remove oldest exchange
      }

      return {
        message: assistantMessage,
        usage: completion.usage
      };
    } catch (error) {
      console.error('OpenAI Error:', error);
      throw error;
    }
  }

  clearHistory(sessionId = 'default') {
    this.conversationHistory.delete(sessionId);
  }
}

export default new OpenAIService();