import geminiService from '../services/geminiService.js';
import Joi from 'joi';

const chatSchema = Joi.object({
  message: Joi.string().min(1).max(1000).required(),
  sessionId: Joi.string().optional()
});

export const sendMessage = async (req, res, next) => {
  try {
    const { error, value } = chatSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const { message, sessionId } = value;

    const response = await geminiService.chat(message, sessionId || 'default');

    res.json({
      success: true,
      data: {
        message: response.message,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};

export const clearHistory = async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    geminiService.clearHistory(sessionId || 'default');
    
    res.json({
      success: true,
      message: 'Conversation history cleared'
    });
  } catch (error) {
    next(error);
  }
};
