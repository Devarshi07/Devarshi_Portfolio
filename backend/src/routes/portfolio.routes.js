import express from 'express';
import { getPortfolioData, getProjects } from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/', getPortfolioData);
router.get('/projects', getProjects);

export default router;