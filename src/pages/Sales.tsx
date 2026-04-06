import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Zap, Image as ImageIcon, BookOpen, FileText, MonitorPlay, Briefcase, X } from 'lucide-react';
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

        {/* HERO SECTION */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="inline-block bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6">
            90+ Done-For-You Sales Pages You Can Resell.
          </div>
          <h1 className="font-heading font-black text-4xl md:text-5xl leading-tight mb-6">
            Start Selling Websites and Digital Products This Week Without Building Anything from Scratch.
          </h1>
          <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-8">
            You get the templates, the tools, the courses, the proposal, and the business plan. Everything is done. You just add your name and start.
          </p>
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-5xl font-bold text-gold">N5,000</span>
              <span className="font-mono text-2xl text-danger line-through">N20,000</span>
            </div>
            <p className="text-sm text-text-muted mt-2">Price: N5,000 now. N10,000 in 24hrs. N20,000 final price.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn-shimmer inline-flex items-center justify-center gap-2 w-full max-w-md p-5 bg-gold text-black font-bold text-xl rounded hover:bg-gold-light transition-transform hover:-translate-y-0.5">
            Get Everything for N5,000 <ArrowRight size={20} />
          </button>
        </motion.div>

        {/* STORY SECTION */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16 prose prose-invert max-w-none">
          <h2 className="font-heading font-black text-2xl text-gold mb-6">Let me tell you about Tunde.</h2>
          <p className="text-lg">
            Tunde spent three weeks trying to build one sales page on Elementor. He watched videos. He dragged blocks. He adjusted the mobile view eight times. The page still looked like something a twelve year old put together at midnight.
          </p>
          <p className="text-lg">
            Meanwhile, a friend of his, Biodun, just bought a done-for-you template bundle. He opened the file on a Tuesday. By Thursday, he had sent a client a link to a finished sales page and collected N80,000.
          </p>
          <p className="text-lg">Tunde asked Biodun what he paid for the bundle.</p>
          <p className="text-lg font-bold text-gold">Biodun said N5,000.</p>
          <p className="text-lg">Tunde felt sick.</p>
          <p className="text-lg">
            Not because Biodun made money. But because he had been grinding for three weeks to get something Biodun got in two days by paying N5,000 for the right tools.
          </p>
          <div className="bg-surface-1 border-l-4 border-gold p-6 my-8 text-lg italic rounded-r">
            That is exactly the gap this bundle closes.
          </div>
          <p className="text-lg">
            The difference between people closing contracts right now and people still learning is not intelligence. It is tools. The right tools make you look like you have been doing this for years, even if you just started last week.
          </p>
        </motion.div>

        {/* THE REAL COST */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16">
          <h2 className="font-heading font-black text-3xl text-danger mb-6">THE REAL COST OF NOT HAVING THE RIGHT TOOLS</h2>
          <p className="text-lg mb-6">Here is what is actually happening while you wait to figure this out on your own.</p>
          
          <ul className="space-y-4 mb-8">
            <li className="flex gap-3">
              <X className="text-danger shrink-0 mt-1" size={20} />
              <span className="text-lg">Every week you spend building from scratch is a week a competitor is already in front of a client with a finished proposal and a professional-looking page.</span>
            </li>
            <li className="flex gap-3">
              <X className="text-danger shrink-0 mt-1" size={20} />
              <span className="text-lg">Every N50,000 or N80,000 you pay a designer to build one sales page is money you keep spending instead of money you keep collecting.</span>
            </li>
            <li className="flex gap-3">
              <X className="text-danger shrink-0 mt-1" size={20} />
              <span className="text-lg">Every client who asks to see your work and finds nothing is a client who walks to the next person with a portfolio.</span>
            </li>
          </ul>
          
          <p className="text-lg mb-4">And the painful part? The client did not choose them because they were better. The client chose them because they showed up with something finished.</p>
          <p className="text-lg font-bold text-gold mb-6">You had the skills. You had the offer. You just did not have the tools.</p>
          
          <div className="bg-surface-2 border border-[#333] p-6 rounded text-lg">
            Clients do not pay for potential. They pay for proof. If you cannot show them a finished page, a real proposal, and a plan, they move on. This bundle gives you all three before you even make your first call.
          </div>
        </motion.div>

        {/* WHAT YOU GET */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16">
          <h2 className="font-heading font-black text-3xl text-gold mb-4">HERE IS WHAT YOU GET IN THIS BUNDLE</h2>
          <p className="text-lg mb-8">This is not ten templates and a thank you page. This is a complete business kit that gives you everything you need to start selling web design, digital products, and done-for-you assets starting today.</p>
          
          <div className="space-y-4">
            {[
              { icon: FileText, title: "90+ Done-For-You Sales Page Templates", desc: "All niches. Fully editable in Elementor. You can resell every single one.", value: "75,000" },
              { icon: Zap, title: "Elementor Pro License", desc: "1 full year. Build unlimited pages on unlimited sites.", value: "45,000" },
              { icon: Briefcase, title: "Cartlow Pro Plugin with license", desc: "The same tools professionals use.", value: "15,000" },
              { icon: FileText, title: "Web Design Proposal Template", desc: "Walk into any company, pitch, and close contracts with this.", value: "90,000" },
              { icon: TrendingUp, title: "ICT Business Plan", desc: "With 3-year financial analysis. Written. Ready to submit.", value: "50,000" },
              { icon: MonitorPlay, title: "Full Web Design Course", desc: "Learn to build any website.", value: "35,000" },
              { icon: BookOpen, title: "50+ Winning Ecommerce Product List", desc: "Ready-to-sell products you can start moving today.", value: "55,000" },
              { icon: ImageIcon, title: "1,500+ Done-For-You Canva Templates", desc: "Graphics for every content need.", value: "20,000" },
              { icon: MonitorPlay, title: "Full Funnel Design Course", desc: "Learn how to design any type of funnel from scratch. Comes with resale rights.", value: "30,000" }
            ].map((item, i) => (
              <div key={i} className="bg-surface-1 border border-[#222] rounded p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gold/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-surface-2 p-3 rounded-full text-gold shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                    <p className="text-text-muted">{item.desc}</p>
                  </div>
                </div>
                <div className="shrink-0 bg-black/50 px-4 py-2 rounded border border-[#333] text-center">
                  <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Worth</div>
                  <div className="font-mono font-bold text-gold">N{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* BONUS SECTION */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16">
          <div className="bg-gradient-to-br from-gold/10 to-surface-1 border border-gold rounded-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gold text-black font-bold px-4 py-1 rounded-bl-lg text-sm">EXCLUSIVE BONUS</div>
            <h3 className="font-heading font-black text-2xl mb-2 mt-4 text-gold">Not Available Anywhere Else.</h3>
            <h4 className="text-xl font-bold mb-4">How to Stop Burning Money on Ads and Start Running Profitable Facebook and Instagram Ads With as Low as N2,000.</h4>
            <p className="text-lg text-text-muted mb-6">
              This exact formula is not on YouTube. It is not in any paid course. No ad agency is teaching this. This is the formula we use internally to get real results at the lowest possible budget. You are getting it free inside this bundle today.
            </p>
            <div className="inline-block bg-black/50 px-4 py-2 rounded border border-[#333]">
              <span className="text-sm text-text-muted uppercase tracking-wider mr-2">Worth</span>
              <span className="font-mono font-bold text-gold">N50,000</span>
            </div>
          </div>
        </motion.div>

        {/* TOTAL VALUE */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16 bg-surface-2 p-8 rounded border border-[#333]">
          <p className="text-xl text-text-muted mb-2">Total value if you bought everything separately = <span className="line-through">N465,000</span></p>
          <h3 className="font-heading font-black text-3xl md:text-4xl text-gold mb-6">But You're getting everything ALTOGETHER FOR 5,000 TODAY ALONE</h3>
          <button onClick={() => setIsModalOpen(true)} className="btn-shimmer inline-flex items-center justify-center gap-2 w-full max-w-md p-5 bg-gold text-black font-bold text-xl rounded hover:bg-gold-light transition-transform hover:-translate-y-0.5">
            Get The Bundle Now <ArrowRight size={20} />
          </button>
        </motion.div>

        {/* TEMPLATES LOOK LIKE */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16">
          <h2 className="font-heading font-black text-3xl text-gold mb-6 text-center">HERE IS WHAT THE TEMPLATES LOOK LIKE</h2>
          <p className="text-lg text-center mb-8">
            These are some samples from the 90+ in the bundle. Every template is this clean, this professional, and this ready to use. You do not edit code. You do not move pixels. You open it in Elementor, replace the text and images, and it is done.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {/* Placeholders for template images */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3/4] bg-surface-2 border border-[#333] rounded overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-gold font-bold text-sm">Premium Template</span>
                </div>
                <div className="w-full h-full flex items-center justify-center text-[#444]">
                  <ImageIcon size={48} />
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-lg text-center text-text-muted">
            And these are just a few. There are 90+ more in different niches, different layouts, and different styles. All editable. All ready to publish. All yours to resell.
          </p>
        </motion.div>

        {/* WHO THIS IS FOR */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16 bg-surface-1 border border-[#222] rounded p-8 md:p-10">
          <h2 className="font-heading font-black text-3xl text-gold mb-8">THIS BUNDLE IS FOR YOU IF...</h2>
          <ul className="space-y-4">
            {[
              "You want to offer web design but have no portfolio to show clients",
              "You want to sell digital products and need ready-made assets to resell",
              "You are a freelancer who wants to close contracts faster with a real proposal",
              "You want to start a web or digital agency and need tools to look established from day one",
              "You want to make income online and need a complete system, not just a course",
              "You are a beginner who does not want to waste 6 months learning before you earn",
              "You want to sell this entire bundle to others and keep 100% of every sale"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="text-[#25D366] shrink-0 mt-1" size={20} />
                <span className="text-lg">{text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* WHAT THE NUMBERS SAY */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16">
          <h2 className="font-heading font-black text-3xl text-gold mb-6">WHAT THE NUMBERS SAY</h2>
          <p className="text-lg mb-6">The minimum charge for a business website in Lagos today is N80,000. Interior pages, landing pages, and funnels go from N50,000 to N300,000 depending on the client.</p>
          
          <div className="space-y-4 mb-8">
            <div className="bg-surface-2 border-l-4 border-gold p-6 rounded-r">
              <p className="text-lg">If you use one template from this bundle to close one contract this month, you have made your money back <strong className="text-gold">16 times over.</strong></p>
            </div>
            <div className="bg-surface-2 border-l-4 border-gold p-6 rounded-r">
              <p className="text-lg">If you sell this entire bundle or part of it to five people at N10,000 each, you have made <strong className="text-gold">N50,000</strong> from a N5,000 investment.</p>
            </div>
            <div className="bg-surface-2 border-l-4 border-gold p-6 rounded-r">
              <p className="text-lg">If you sell it to ten people, you have made <strong className="text-gold">N100,000.</strong></p>
            </div>
          </div>
          
          <p className="text-lg font-bold">The math is not complicated. The only question is whether you will move today or hand this opportunity to someone else.</p>
        </motion.div>

        {/* WHAT TO EXPECT */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16">
          <h2 className="font-heading font-black text-3xl text-gold mb-6">WHAT TO EXPECT AFTER YOU PAY</h2>
          <ul className="space-y-4 mb-6">
            {[
              "You get instant access to download the full bundle",
              "You open the templates in Elementor using the license included",
              "You pick a template, edit the text and images, publish the page",
              "You send the link to a client or post it as a sample on your WhatsApp status",
              "You start conversations. You close contracts. You collect money."
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-4 bg-surface-1 p-4 rounded border border-[#222]">
                <div className="bg-gold text-black font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">{i + 1}</div>
                <span className="text-lg pt-1">{text}</span>
              </li>
            ))}
          </ul>
          <p className="text-xl font-bold text-center text-gold">It is not more complicated than that.</p>
        </motion.div>

        {/* LAUNCH WINDOW */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16 bg-danger/10 border border-danger rounded p-8 text-center">
          <h2 className="font-heading font-black text-2xl text-danger mb-4">YOU ARE READING THIS DURING THE LAUNCH WINDOW</h2>
          <p className="text-lg mb-4">This bundle is priced at <strong className="text-gold">N5,000</strong> right now.</p>
          <p className="text-lg mb-4">After 24 hours, the price goes to N10,000. After that, it moves to N20,000 and stays there permanently.</p>
          <p className="text-lg mb-4 text-text-muted">There is no special code to extend the offer. There is no exception for late requests. Every price increase is final. There is no reversal, no extension, and no special code.</p>
          <p className="text-lg mb-4">You have seen the value table. You have seen what you get. You have done the math.</p>
          <p className="text-xl font-bold text-danger">The only reason to wait is if you want to pay double for the same thing tomorrow.</p>
        </motion.div>

        {/* GUARANTEE */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row items-center gap-8 bg-surface-1 border border-gold-border rounded p-10 mb-16">
          <div className="shrink-0 w-32 h-32 rounded-full bg-gold-dim border-2 border-dashed border-gold flex items-center justify-center text-center text-gold font-heading font-black text-xl leading-tight p-2">
            ZERO<br/>RISK
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-heading font-black text-2xl mb-3">YOU TAKE ZERO RISK</h3>
            <p className="text-lg text-text-muted mb-4">Download the bundle. Go through every template. Open every course. Review every asset.</p>
            <p className="text-lg text-text-muted mb-4">If you do all of that and feel like this was not worth what you paid, send a message within 7 days. You get a full refund. No arguments. No back and forth.</p>
            <p className="text-lg font-bold text-gold mb-2">You keep the risk. I keep the pressure off you.</p>
            <p className="text-lg text-text-muted">The only way you lose here is if you do not buy and someone else uses these templates to close the client you were supposed to close.</p>
          </div>
        </motion.div>

        {/* FINAL CTA & MANUAL TRANSFER */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="font-heading font-black text-3xl text-gold mb-6">Pay N5,000. Get Instant Access. Start Today.</h2>
          
          <button onClick={() => setIsModalOpen(true)} className="btn-shimmer inline-flex items-center justify-center gap-2 w-full max-w-md p-5 bg-gold text-black font-bold text-xl rounded hover:bg-gold-light transition-transform hover:-translate-y-0.5 mb-10">
            Get The Bundle Now <ArrowRight size={20} />
          </button>

          <div className="max-w-md mx-auto bg-surface-2 border border-[#333] rounded p-8 text-left">
            <h3 className="font-bold text-xl mb-4 text-center border-b border-[#333] pb-4">OR YOU CAN PAY DIRECTLY USING THE DETAILS BELOW</h3>
            <p className="text-lg mb-6 text-center text-text-muted">Pay ₦5,000 via bank transfer using the details below.</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center border-b border-[#333] pb-2">
                <span className="text-text-muted">Account Name:</span>
                <span className="font-bold text-gold">Emmanuel Ifenna</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#333] pb-2">
                <span className="text-text-muted">Bank Name:</span>
                <span className="font-bold">opay Bank</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#333] pb-2">
                <span className="text-text-muted">Account Number:</span>
                <span className="font-mono text-xl font-bold">7033570538</span>
              </div>
            </div>
            
            <p className="text-center mb-4">After payment, send proof on WhatsApp to:</p>
            <a href="https://wa.me/2347033570538" target="_blank" rel="noreferrer" className="block text-center font-mono text-2xl font-bold text-[#25D366] hover:underline mb-6">
              07033570538
            </a>
            
            <p className="text-center text-text-muted text-sm mb-6">Once confirmed, you will receive access details.</p>
            
            <div className="bg-danger/10 text-danger text-center p-3 rounded font-bold text-sm">
              N5,000 now. N10,000 in 24 hours. N20,000 after that. The price only moves up.
            </div>
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
