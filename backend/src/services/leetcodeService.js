import axios from 'axios';

class LeetCodeService {
  async getUserStats(username) {
    try {
      console.log(`🔍 Fetching LeetCode stats for: ${username}`);
      
      // Try primary API
      const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`, {
        timeout: 5000
      });
      
      console.log('✅ LeetCode API response:', response.data);
      
      return {
        easy: response.data.easySolved || 0,
        medium: response.data.mediumSolved || 0,
        hard: response.data.hardSolved || 0,
        total: response.data.totalSolved || 0,
        submissions: this.generateRealisticHeatmap(response.data.totalSolved || 0)
      };
    } catch (error) {
      console.error('❌ LeetCode API Error:', error.message);
      
      // Try alternative API
      try {
        console.log('🔄 Trying alternative LeetCode API...');
        const fallback = await axios.get(`https://alfa-leetcode-api.onrender.com/${username}/solved`, {
          timeout: 5000
        });
        
        console.log('✅ Alternative API response:', fallback.data);
        
        return {
          easy: fallback.data.easySolved || 0,
          medium: fallback.data.mediumSolved || 0,
          hard: fallback.data.hardSolved || 0,
          total: fallback.data.solvedProblem || 0,
          submissions: this.generateRealisticHeatmap(fallback.data.solvedProblem || 0)
        };
      } catch (fallbackError) {
        console.error('❌ Alternative API also failed:', fallbackError.message);
        
        // Return manual stats from portfolio.json if APIs fail
        console.log('⚠️  Using fallback stats from portfolio.json');
        return null; // Will use stats from portfolio.json
      }
    }
  }

  generateRealisticHeatmap(totalSolved) {
    if (totalSolved === 0) return [];
    
    const weeks = [];
    const dailyAverage = totalSolved / 365;
    const today = new Date();

    for (let w = 0; w < 52; w++) {
      const week = { submissionDays: [] };
      
      for (let d = 0; d < 7; d++) {
        const date = new Date(today);
        date.setDate(today.getDate() - ((51 - w) * 7) - (6 - d));
        
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const activityMultiplier = isWeekend ? 0.3 : 1;
        
        const baseCount = Math.random() < 0.65 
          ? Math.floor(Math.random() * (dailyAverage * 4 * activityMultiplier)) 
          : 0;
        
        week.submissionDays.push({
          count: Math.floor(baseCount),
          date: date.toISOString().split('T')[0]
        });
      }
      
      weeks.push(week);
    }

    return weeks;
  }
}

export default new LeetCodeService();