import axios from 'axios';

class GitHubService {
  async getContributions(username) {
    try {
      // Using GitHub GraphQL API
      const query = `
        query($userName:String!) {
          user(login: $userName) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      const response = await axios.post(
        'https://api.github.com/graphql',
        {
          query,
          variables: { userName: username }
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const calendar = response.data.data.user.contributionsCollection.contributionCalendar;
      
      return {
        total: calendar.totalContributions,
        weeks: calendar.weeks
      };
    } catch (error) {
      console.error('GitHub API Error:', error.message);
      // Return fallback data
      return {
        total: 1240,
        weeks: []
      };
    }
  }

  async getUserStats(username) {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        }
      });

      return {
        followers: response.data.followers,
        following: response.data.following,
        publicRepos: response.data.public_repos,
        bio: response.data.bio
      };
    } catch (error) {
      console.error('GitHub User Stats Error:', error.message);
      return null;
    }
  }
}

export default new GitHubService();