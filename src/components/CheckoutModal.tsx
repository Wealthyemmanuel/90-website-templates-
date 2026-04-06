import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { usePaystackPayment } from 'react-paystack';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });

  const config = {
    reference: 'NAVAL_' + Math.floor((Math.random() * 1000000000) + 1),
    email: formData.email || 'customer@example.com',
    amount: 500000, // 500000 kobo = N5000
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_fbab14cc7aff03ae794c607f3b8112a7861f3947',
    currency: 'NGN',
  };

  const initializePayment = usePaystackPayment(config);

  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      const name = localStorage.getItem('naval_optin_name') || '';
      const email = localStorage.getItem('naval_optin_email') || '';
      const whatsapp = localStorage.getItem('naval_optin_whatsapp') || '';
      
      setFormData({ name, email, whatsapp });

      // Fire CAPI InitiateCheckout Event
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          eventName: 'InitiateCheckout',
          userData: { name, email, whatsapp }
        })
      }).catch(console.error);
    }
  }, [isOpen]);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePayment();
  };

  const onSuccess = async (response: any) => {
    try {
      // Backend handles CAPI Purchase Event
      await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          reference: response.reference
        })
      });
    } catch (err) {
      console.error('Failed to save purchase:', err);
    }
    setStep(3);
  };

  const onClosePayment = () => {
    console.log('Payment window closed');
  };

  const handlePayment = () => {
    if (!formData.email) {
      alert("Please enter your email address first.");
      setStep(1);
      return;
    }
    
    try {
      initializePayment({ onSuccess, onClose: onClosePayment });
    } catch (err) {
      console.error("Paystack initialization error:", err);
      alert("Payment failed to initialize. Please check your internet connection and try again.");
    }
  };

  const getWhatsAppLink = () => {
    const message = `Hello Naval! I just completed payment for the 90+ Done-For-You Sales Pages Bundle. Name: ${formData.name} / WhatsApp: ${formData.whatsapp} / Please send me my bundle access. Thank you!`;
    return `https://wa.me/2347033570538?text=${encodeURIComponent(message)}`;
  };

  const getManualTransferLink = () => {
    const namePart = formData.name ? `Name: ${formData.name} / ` : '';
    const message = `Hello Naval! I just made a manual transfer of N5,000 for the 90+ DFY Sales Pages Bundle. ${namePart}Here is my payment proof:`;
    return `https://wa.me/2347033570538?text=${encodeURIComponent(message)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="w-full max-w-lg bg-surface-1 border border-gold-border rounded shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#222] bg-surface-2 sticky top-0 z-10">
          <h3 className="font-heading text-gold text-xl font-bold m-0">Naval Azure | Secure Checkout</h3>
          <button onClick={onClose} className="text-text-muted hover:text-text-main transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-surface-2 p-4 rounded border border-[#222] mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-muted text-sm">Product</span>
                  <span className="font-medium">90+ DFY Sales Pages Bundle</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-muted text-sm">Delivery</span>
                  <span className="text-[#25D366] font-medium text-sm">Instant Delivery</span>
                </div>
                <div className="flex justify-between items-center pt-3 mt-3 border-t border-[#333]">
                  <span className="text-text-muted text-sm">Total</span>
                  <div className="flex items-center gap-3">
                    <span className="text-danger line-through text-sm">N20,000</span>
                    <span className="text-gold font-bold font-mono text-lg">N5,000</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required 
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
                    value={formData.whatsapp}
                    onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full p-4 bg-surface-2 border border-[#333] rounded text-text-main focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <button type="submit" className="w-full p-4 bg-gold text-black font-bold rounded hover:bg-gold-light transition-colors mt-4 flex items-center justify-center gap-2">
                  Pay N5,000 Securely <ArrowRight size={18} />
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-[#333] text-center">
                <p className="text-sm text-text-muted mb-4">Prefer manual transfer?</p>
                <div className="bg-surface-2 border border-[#333] p-5 rounded text-sm text-left">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text-muted">Bank:</span>
                    <span className="font-bold">opay Bank</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-text-muted">Account Name:</span>
                    <span className="font-bold text-gold">Emmanuel Ifenna</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-text-muted">Account Number:</span>
                    <span className="font-mono text-lg font-bold">7033570538</span>
                  </div>
                  <p className="text-xs text-text-muted text-center mb-3">After transfer, click the button below to send your proof of payment on WhatsApp.</p>
                  <a 
                    href={getManualTransferLink()} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-3 bg-[#25D366] text-white font-bold rounded hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    I have transferred
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
              <CheckCircle2 size={64} className="text-[#25D366] mx-auto mb-4" />
              <h3 className="text-gold font-heading text-2xl font-bold mb-2">Payment Successful!</h3>
              <p className="text-text-muted mb-8">Click the button below to send your payment reference and get instant access to your bundle.</p>
              
              <a 
                href={getWhatsAppLink()} 
                target="_blank" 
                rel="noreferrer"
                className="w-full p-4 bg-[#25D366] text-white font-bold rounded hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Get Access on WhatsApp
              </a>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
