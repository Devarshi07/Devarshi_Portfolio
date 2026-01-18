import { useState, useEffect } from 'react';
import NeuralBackground from './components/Background/NeuralBackground';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Hero from './components/Sections/Hero';
import StatsSection from './components/Sections/StatsSection';
import Skills from './components/Sections/Skills';
import Projects from './components/Sections/Projects';
import Experience from './components/Sections/Experience';
import Education from './components/Sections/Education';
import Publications from './components/Sections/Publications';
import Testimonials from './components/Sections/Testimonials';
import Contact from './components/Sections/Contact';
import ChatBot from './components/Chatbot/ChatBot';
import { fetchPortfolioData } from './services/api';
//import BeyondCode from './components/Sections/BeyondCode';




function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPortfolioData();
        setPortfolioData(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load portfolio data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-cyan-400 font-mono animate-pulse text-xl">
          INITIALIZING NEURAL LINK...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-red-400 font-mono text-center">
          <p className="text-2xl mb-4">ERROR: NEURAL LINK FAILED</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-red-400 font-mono">No data loaded</div>
      </div>
    );
  }

  const {
    profile = {},
    links = {},
    stats = {},
    skills = [],
    projects = [],
    experience = [],
    education = [],
    publications = [],
    testimonials = []
  } = portfolioData;

  return (
    <div className="min-h-screen relative font-sans selection:bg-cyan-500/30 selection:text-white">
      <NeuralBackground />
      <Navbar profile={profile} />
      <Hero profile={profile} links={links} />
      <StatsSection stats={stats} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Education education={education} />
      {/* <BeyondCode activities={portfolioData.extracurricular || []} /> */}
      {publications.length > 0 && <Publications publications={publications} />}
      <Testimonials testimonials={testimonials} />
      <Contact />
      <Footer profile={profile} />
      <ChatBot avatar={profile.image} />
    </div>
  );
}

export default App;