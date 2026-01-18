import express from 'express';
import { sendMessage, clearHistory } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', sendMessage);
router.post('/clear', clearHistory);

export default router;