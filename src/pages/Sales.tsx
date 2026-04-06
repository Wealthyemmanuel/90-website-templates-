import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Image as ImageIcon, Award, TrendingUp, ArrowRight } from 'lucide-react';
import CheckoutModal from '../components/CheckoutModal';

export default function Sales() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timerKey = 'naval_azure_timer_end';
    let endTime = localStorage.getItem(timerKey);
    
    if (!endTime) {
      endTime = (new Date().getTime() + (24 * 60 * 60 * 1000)).toString();
      localStorage.setItem(timerKey, endTime);
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = parseInt(endTime!) - now;

      if (distance < 0) {
        const newEndTime = (new Date().getTime() + (24 * 60 * 60 * 1000)).toString();
        localStorage.setItem(timerKey, newEndTime);
        endTime = newEndTime;
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="sticky top-0 bg-gold text-black text-center py-3 px-5 font-mono font-medium z-40 flex justify-center items-center gap-4 shadow-[0_4px_20px_rgba(201,168,76,0.2)]">
        <span className="text-sm md:text-base">PRICE INCREASES IN:</span>
        <div className="flex items-center gap-1">
          <span className="bg-black text-gold px-2 py-1 rounded font-bold">{timeLeft.hours.toString().padStart(2, '0')}</span>:
          <span className="bg-black text-gold px-2 py-1 rounded font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>:
          <span className="bg-black text-gold px-2 py-1 rounded font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[760px] mx-auto px-5 py-16">
        <div className="glow-bg"></div>

        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h1 className="font-heading font-black text-4xl md:text-5xl leading-tight mb-6">
            The 200+ Done-For-You Sales Pages Bundle
          </h1>
          <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Stop losing clients because you can't design fast enough. Get the exact templates, proposals, and training you need to close N80k+ deals this week.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="font-mono text-5xl font-bold text-gold">N5,000</span>
            <span className="font-mono text-2xl text-danger line-through">N20,000</span>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn-shimmer inline-flex items-center justify-center gap-2 w-full max-w-md p-5 bg-gold text-black font-bold text-xl rounded hover:bg-gold-light transition-transform hover:-translate-y-0.5">
            Get The Bundle Now <ArrowRight size={20} />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16">
          <p className="text-lg mb-6">Let's be honest.</p>
          <div className="bg-surface-1 border-l-4 border-danger p-8 italic text-xl rounded-r mb-6">
            "While you are still dragging blocks in Elementor trying to make a page look 'okay', someone else just landed your client using a template."
          </div>
          <p className="text-lg text-text-muted">Clients don't care how hard you worked. They care about results. This bundle gives you the unfair advantage to deliver world-class results in minutes, not days.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16">
          <h2 className="font-heading font-black text-3xl text-gold mb-8">What You Get Today</h2>
          <div className="space-y-5">
            {[
              { title: "200+ Done-For-You Sales Page Templates", desc: "Covering all major niches. Fully editable in Elementor. Import, change text, and you are done. Resell rights included." },
              { title: "Elementor Pro License", desc: "1 full year of Elementor Pro, valid for unlimited sites. Never pay monthly fees just to build a landing page." },
              { title: "Web Design Proposal Template", desc: "The exact document you need to walk into any company and close high-ticket contracts professionally." },
              { title: "ICT Business Plan with 3-Year Financial Analysis", desc: "Ready for submission for grants, loans, or investor meetings. Just fill in your company name." },
              { title: "Full Web Design and Funnel Design Courses", desc: "Step-by-step video training. Learn the skills, then sell the courses yourself with full resale rights." }
            ].map((item, i) => (
              <div key={i} className="relative bg-surface-1 border border-[#222] border-l-4 border-l-[#333] rounded p-8 pl-20 hover:border-l-gold hover:bg-surface-2 transition-all">
                <div className="absolute left-5 top-8 font-mono text-2xl font-bold text-gold opacity-50">0{i+1}</div>
                <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                <p className="text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-surface-2 border border-gold-border rounded p-10 text-center mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>
          <h3 className="font-heading font-black text-2xl mb-4">The Math Sells Itself</h3>
          <p className="text-lg mb-6">The minimum website price in Lagos right now is N80,000.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-3xl md:text-4xl text-gold font-bold mb-6">
            <span>N80,000</span>
            <span>&divide;</span>
            <span>N5,000</span>
            <span>=</span>
            <span className="bg-gold-dim border border-gold-border px-4 py-2 rounded">16x Return</span>
          </div>
          <p className="text-text-muted">One single contract pays for this bundle 16 times over.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16">
          <h2 className="font-heading font-black text-3xl text-gold mb-6">Fast-Action Bonuses</h2>
          <div className="bg-danger/10 border border-danger text-danger text-center p-4 rounded font-bold mb-8">
            WARNING: These bonuses are strictly for the first 10 buyers only.
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Zap, title: '"Fast Cash" Client-Attracting Scripts', desc: "Copy-paste email and text sequences that generate sales fast." },
              { icon: ImageIcon, title: "1,500+ Done-For-You Canva Templates", desc: "Professional graphics for every content need. Never design from scratch." },
              { icon: Award, title: '"White Glove" Support Framework', desc: "Learn how to package your services to charge 5x–10x more than competitors." },
              { icon: TrendingUp, title: "Facebook & Instagram Ads Formula", desc: "Run profitable ads from N2,000. Secret strategies not found on YouTube." }
            ].map((bonus, i) => (
              <div key={i} className="bg-surface-1 border border-[#222] rounded p-8 relative">
                <div className="absolute top-4 right-4 bg-gold-dim text-gold border border-gold-border px-2 py-1 text-xs font-bold rounded tracking-wider">BONUS</div>
                <bonus.icon className="text-gold mb-4" size={32} />
                <h4 className="font-bold text-lg mb-2">{bonus.title}</h4>
                <p className="text-text-muted text-sm">{bonus.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row items-center gap-8 bg-surface-1 border border-gold-border rounded p-10 mb-16">
          <div className="shrink-0 w-32 h-32 rounded-full bg-gold-dim border-2 border-dashed border-gold flex items-center justify-center text-center text-gold font-heading font-black text-xl leading-tight p-2">
            100%<br/>MONEY<br/>BACK
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-heading font-black text-2xl mb-3">7-Day Iron-Clad Guarantee</h3>
            <p className="text-text-muted">Download the bundle. Review the templates. Decide if it's for you. If you don't feel this is worth at least 10x what you paid, send us an email within 7 days and get a full refund. No questions asked.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="font-mono text-5xl font-bold text-gold">N5,000</span>
            <span className="font-mono text-2xl text-danger line-through">N20,000</span>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn-shimmer inline-flex items-center justify-center gap-2 w-full max-w-md p-5 bg-gold text-black font-bold text-xl rounded hover:bg-gold-light transition-transform hover:-translate-y-0.5">
            Get The Bundle Now <ArrowRight size={20} />
          </button>
          <div className="flex justify-center flex-wrap gap-3 mt-6">
            {['Card', 'Bank Transfer', 'USSD', 'Opay/Kuda'].map(method => (
              <span key={method} className="bg-surface-2 border border-[#333] text-text-muted px-4 py-1.5 rounded-full text-sm">{method}</span>
            ))}
          </div>
        </motion.div>

        <footer className="text-center pt-10 border-t border-[#222] text-text-muted text-sm">
          <div className="text-gold font-heading text-xl mb-2">Naval Azure</div>
          <div>Dream Big. Market Smart.</div>
          <div className="mt-2">&copy; {new Date().getFullYear()}</div>
        </footer>
      </div>

      <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
