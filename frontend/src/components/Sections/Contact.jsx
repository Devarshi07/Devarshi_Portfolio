import { useState } from 'react';
import { Icons } from '../UI/Icons';
import { submitContactForm } from '../../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await submitContactForm(formData);
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="connect" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-panel p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Icons.Mail /> Transmit Data
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" placeholder="Identity" required />
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none" placeholder="Email" required />
              <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none resize-none" placeholder="Message" required></textarea>
              {status.message && (
                <div className={`p-3 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                  {status.message}
                </div>
              )}
              <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                {isSubmitting ? 'SENDING...' : 'INITIALIZE UPLINK'}
                {!isSubmitting && <Icons.Send />}
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center">
            <div className="glass-panel p-8 rounded-2xl text-center border-l-4 border-l-cyan-500">
              <div className="flex justify-center mb-6 text-cyan-400">
                <Icons.Calendar />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Schedule Sync</h3>
              <p className="text-gray-400 mb-8">Book a 30-minute call via Calendly.</p>
              <a href="https://calendly.com/devarshi" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors w-full uppercase text-sm font-bold">
                Open Calendar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
