import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { LayoutTemplate, MonitorPlay, FileText, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';

export default function Optin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save to local storage to pre-fill checkout
    localStorage.setItem('naval_optin_name', formData.name);
    localStorage.setItem('naval_optin_email', formData.email);
    localStorage.setItem('naval_optin_whatsapp', formData.whatsapp);

    // Send to Google Sheets via backend API (which also fires CAPI Lead event)
    try {
      await fetch('/api/optin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.error('Failed to save optin to sheets:', err);
    }

    setIsSubmitting(false);
    navigate('/sales');
  };

  return (
    <div className="relative z-10 max-w-[760px] mx-auto px-5 py-16">
      <div className="glow-bg"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <h1 className="font-heading font-black text-4xl md:text-5xl leading-tight mb-5">
          Discover How to Close Your First <span className="text-gold">N80,000</span> Web Design Contract — Without Building a Single Page from Scratch
        </h1>
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
          Enter your details below and get immediate access to the exact blueprint beginners are using to land paid contracts this week — even with zero prior experience.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="bg-surface-1 border border-gold-border rounded p-8 md:p-10 mb-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input 
              type="text" 
              required 
              placeholder="Enter your full name" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full p-4 bg-surface-2 border border-[#333] rounded text-text-main focus:outline-none focus:border-gold transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="Enter your best email" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full p-4 bg-surface-2 border border-[#333] rounded text-text-main focus:outline-none focus:border-gold transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
            <input 
              type="tel" 
              required 
              placeholder="e.g., 08012345678" 
              value={formData.whatsapp}
              onChange={e => setFormData({...formData, whatsapp: e.target.value})}
              className="w-full p-4 bg-surface-2 border border-[#333] rounded text-text-main focus:outline-none focus:border-gold transition-colors" 
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-shimmer w-full p-5 bg-gold text-black font-bold text-lg rounded hover:bg-gold-light transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSubmitting ? 'Processing...' : 'Get Instant Access Now'} <ArrowRight size={20} />
          </button>
        </form>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12"
      >
        <div className="bg-surface-2 border border-[#222] rounded p-5 text-center">
          <div className="font-mono text-2xl text-gold font-medium mb-1">200+</div>
          <div className="text-xs text-text-muted uppercase tracking-wider">Templates</div>
        </div>
        <div className="bg-surface-2 border border-[#222] rounded p-5 text-center">
          <div className="font-mono text-2xl text-gold font-medium mb-1">N80K</div>
          <div className="text-xs text-text-muted uppercase tracking-wider">Min Contract</div>
        </div>
        <div className="bg-surface-2 border border-[#222] rounded p-5 text-center">
          <div className="font-mono text-2xl text-gold font-medium mb-1">16x</div>
          <div className="text-xs text-text-muted uppercase tracking-wider">ROI</div>
        </div>
        <div className="bg-surface-2 border border-[#222] rounded p-5 text-center">
          <div className="font-mono text-2xl text-gold font-medium mb-1">7-Day</div>
          <div className="text-xs text-text-muted uppercase tracking-wider">Guarantee</div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h3 className="text-center font-bold text-xl mb-6">What's inside the bundle:</h3>
        <ul className="space-y-3 mb-12">
          {[
            { icon: LayoutTemplate, text: "200+ Done-For-You Sales Page Templates" },
            { icon: MonitorPlay, text: "Elementor Pro License (1 Full Year)" },
            { icon: FileText, text: "Web Design Proposal Template" },
            { icon: Briefcase, text: "ICT Business Plan with 3-Year Financial Analysis" },
            { icon: GraduationCap, text: "Full Web Design and Funnel Design Courses" }
          ].map((item, i) => (
            <li key={i} className="flex items-center p-4 bg-surface-2 rounded border-l-2 border-transparent hover:border-gold hover:bg-[#1a1a1a] transition-all">
              <item.icon className="text-gold mr-4 shrink-0" size={24} />
              <span className="font-medium">{item.text}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <footer className="text-center pt-10 border-t border-[#222] text-text-muted text-sm mt-16">
        <div className="text-gold font-heading text-xl mb-2">Naval Azure</div>
        <div>Dream Big. Market Smart.</div>
        <div className="mt-2">&copy; {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
