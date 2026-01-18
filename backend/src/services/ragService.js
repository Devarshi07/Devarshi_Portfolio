import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class RAGService {
  constructor() {
    this.knowledge = null;
  }

  async loadKnowledge() {
    try {
      const dataPath = path.join(__dirname, '../../data/portfolio.json');
      const data = await fs.readFile(dataPath, 'utf-8');
      this.knowledge = JSON.parse(data);
      console.log('✅ Portfolio data loaded successfully');
      return this.knowledge;
    } catch (error) {
      console.error('❌ Error loading knowledge:', error);
      throw error;
    }
  }

  buildContext(query) {
    if (!this.knowledge) {
      throw new Error('Knowledge base not loaded');
    }

    const { profile, experience, education, projects, skills } = this.knowledge;

    const context = `
You are Devarshi's AI assistant. Answer questions based on this information:

PROFILE:
- Name: ${profile.name}
- Role: ${profile.role}
- About: ${profile.subHeadline}
- Location: ${profile.location || 'Boston, MA'}
- Status: ${profile.status}

EXPERIENCE:
${experience.map(exp => `
- ${exp.title} at ${exp.org} (${exp.year})
  ${exp.desc}
`).join('\n')}

EDUCATION:
${education.map(edu => `
- ${edu.title} from ${edu.org} (${edu.year})
  ${edu.desc}
`).join('\n')}

PROJECTS:
${projects.map(proj => `
- ${proj.title} (${proj.category})
  ${proj.desc}
  Technologies: ${proj.tags.join(', ')}
  ${proj.github ? `GitHub: ${proj.github}` : ''}
`).join('\n')}

SKILLS:
${skills.map(cat => `
- ${cat.name}: ${cat.skills.join(', ')}
`).join('\n')}

CONTACT:
- Email: ${profile.email || 'Available on request'}
- GitHub: ${this.knowledge.links?.github || 'Check portfolio'}
- LinkedIn: ${this.knowledge.links?.linkedin || 'Check portfolio'}

Instructions:
- Answer as if you are Devarshi's personal assistant
- Be professional, helpful, and enthusiastic  
- If asked about skills/experience not listed, say you don't have that information
- Keep responses concise but informative (2-4 sentences)
- If asked to schedule a meeting, mention the Calendly link on the website
- For technical questions about projects, provide details from the project descriptions
- Use specific examples and numbers when available
`;

    return context;
  }

  searchRelevantInfo(query) {
    const lowercaseQuery = query.toLowerCase();
    const relevantSections = [];

    if (lowercaseQuery.includes('experience') || lowercaseQuery.includes('work') || lowercaseQuery.includes('job')) {
      relevantSections.push('experience');
    }
    if (lowercaseQuery.includes('education') || lowercaseQuery.includes('study') || lowercaseQuery.includes('degree')) {
      relevantSections.push('education');
    }
    if (lowercaseQuery.includes('project') || lowercaseQuery.includes('build') || lowercaseQuery.includes('developed')) {
      relevantSections.push('projects');
    }
    if (lowercaseQuery.includes('skill') || lowercaseQuery.includes('technology') || lowercaseQuery.includes('tech stack')) {
      relevantSections.push('skills');
    }

    return relevantSections;
  }

  getStats() {
    if (!this.knowledge) return null;
    
    return {
      projects: this.knowledge.projects?.length || 0,
      experience: this.knowledge.experience?.length || 0,
      education: this.knowledge.education?.length || 0,
      skills: this.knowledge.skills?.reduce((acc, cat) => acc + cat.skills.length, 0) || 0
    };
  }
}

export default new RAGService();