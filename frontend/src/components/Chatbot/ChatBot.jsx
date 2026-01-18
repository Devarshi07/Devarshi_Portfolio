import { useState, useRef, useEffect } from 'react';
import { Icons } from '../UI/Icons';
import axios from 'axios';

export default function ChatBot({ avatar }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Devarshi's AI assistant. Ask me anything about his experience, projects, or skills!",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const sessionId = useRef(`session_${Date.now()}`);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        message: input,
        sessionId: sessionId.current
      });

      const botMsg = {
        id: Date.now() + 1,
        text: response.data.data.message,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    try {
      await axios.post('/api/chat/clear', {
        sessionId: sessionId.current
      });
      setMessages([
        {
          id: 1,
          text: "Hi! I'm Devarshi's AI assistant. Ask me anything about his experience, projects, or skills!",
          sender: 'bot',
        },
      ]);
    } catch (error) {
      console.error('Clear chat error:', error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 glass-panel rounded-lg overflow-hidden flex flex-col shadow-2xl border-cyan-500/30 animate-[float_0.3s_ease-out]">
          <div className="bg-cyan-900/40 p-3 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={avatar}
                  className="w-8 h-8 rounded-full border border-cyan-400/50 object-cover"
                  alt="AI Avatar"
                />
                <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-black animate-pulse"></div>
              </div>
              <span className="text-sm font-mono text-cyan-400">AI_Devarshi.exe</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearChat}
                className="text-gray-400 hover:text-white text-xs"
                title="Clear chat"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <Icons.X />
              </button>
            </div>
          </div>
          <div className="h-64 overflow-y-auto p-4 space-y-3 bg-black/40 font-mono text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded ${
                    msg.sender === 'user'
                      ? 'bg-cyan-900/50 text-cyan-100'
                      : 'bg-white/5 text-gray-300'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 text-gray-300 p-2 rounded">
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSend}
            className="p-2 bg-black/60 border-t border-white/10 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent text-sm text-white px-2 focus:outline-none font-mono"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="text-cyan-400 hover:text-white disabled:text-gray-600"
              disabled={isLoading}
            >
              <Icons.Send />
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-cyan-600 hover:bg-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all transform hover:scale-110 overflow-hidden border-2 border-white/20 group relative"
      >
        <img
          src={avatar}
          alt="Chat with AI"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />
        {!isOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-cyan-600/80">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
        )}
      </button>
    </div>
  );
}