import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import githubService from '../services/githubService.js';
import leetcodeService from '../services/leetcodeService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getPortfolioData = async (req, res, next) => {
  try {
    const dataPath = path.join(__dirname, '../../data/portfolio.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    const portfolioData = JSON.parse(data);

    // Fetch live GitHub stats
    const githubUsername = process.env.GITHUB_USERNAME || 'devarshi107';
    try {
      const githubStats = await githubService.getContributions(githubUsername);
      portfolioData.stats.githubContributions = githubStats.total;
      portfolioData.stats.githubWeeks = githubStats.weeks;
    } catch (error) {
      console.log('⚠️  Using GitHub stats from portfolio.json');
    }

    // Fetch live LeetCode stats
    const leetcodeUsername = process.env.LEETCODE_USERNAME || 'devarshim2002';
    try {
      const leetcodeStats = await leetcodeService.getUserStats(leetcodeUsername);
      
      // Only update if API returned data
      if (leetcodeStats) {
        portfolioData.stats.leetcode = {
          easy: leetcodeStats.easy,
          medium: leetcodeStats.medium,
          hard: leetcodeStats.hard,
          total: leetcodeStats.total
        };
        portfolioData.stats.leetcodeSubmissions = leetcodeStats.submissions;
      } else {
        console.log('⚠️  Using LeetCode stats from portfolio.json');
      }
      portfolioData.stats.leetcodeUsername = leetcodeUsername;
    } catch (error) {
      console.log('⚠️  Using LeetCode stats from portfolio.json');
    }

    res.json({
      success: true,
      data: portfolioData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const dataPath = path.join(__dirname, '../../data/portfolio.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    const { projects } = JSON.parse(data);
    
    let filteredProjects = projects;
    
    if (category && category !== 'All') {
      filteredProjects = filteredProjects.filter(p => p.category === category);
    }
    
    if (featured === 'true') {
      filteredProjects = filteredProjects.filter(p => p.featured);
    }
    
    res.json({
      success: true,
      data: filteredProjects,
      count: filteredProjects.length
    });
  } catch (error) {
    next(error);
  }
};