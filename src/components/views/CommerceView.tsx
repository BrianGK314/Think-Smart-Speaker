import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, CheckCircle2, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@/components/ui/badge';

type Step = 'idle' | 'searching' | 'comparing' | 'confirming' | 'payment' | 'success';

export function CommerceView() {
  const [step, setStep] = useState<Step>('idle');

  const startSimulation = () => {
    setStep('searching');
    setTimeout(() => setStep('comparing'), 2000);
    setTimeout(() => setStep('confirming'), 4500);
  };

  const confirmPayment = () => {
    setStep('payment');
    setTimeout(() => setStep('success'), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100 p-8 overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
          <ShoppingCart className="text-emerald-500" />
          Agentic Commerce Flow
        </h2>
        <p className="text-zinc-400 mt-1">Simulating headless browser search, price comparison, and M-Pesa STK push.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Trigger Purchase Agent</CardTitle>
            <CardDescription className="text-zinc-400">Launch a new search for "2kg Pishori Rice near Kilimani"</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={startSimulation} 
              disabled={step !== 'idle' && step !== 'success'}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Start Agent Simulation
            </Button>

            <div className="mt-8 space-y-6">
              <AnimatePresence>
                {step !== 'idle' && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                  >
                    <div className={`p-2 rounded-full ${step === 'searching' ? 'bg-amber-500/20 text-amber-500 animate-pulse' : 'bg-emerald-500/20 text-emerald-500'}`}>
                      {step === 'searching' ? <Search size={20} /> : <CheckCircle2 size={20} />}
                    </div>
                    <div>
                      <p className="font-medium text-zinc-200">1. Searching Vendors</p>
                      <p className="text-sm text-zinc-500">Querying Naivas, Carrefour, and Quickmart APIs via headless agent...</p>
                    </div>
                  </motion.div>
                )}

                {(step === 'comparing' || step === 'confirming' || step === 'payment' || step === 'success') && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                  >
                    <div className={`p-2 rounded-full ${step === 'comparing' ? 'bg-amber-500/20 text-amber-500 animate-pulse' : 'bg-emerald-500/20 text-emerald-500'}`}>
                      {step === 'comparing' ? <ArrowRight size={20} /> : <CheckCircle2 size={20} />}
                    </div>
                    <div>
                      <p className="font-medium text-zinc-200">2. Comparing Prices & Stock</p>
                      <p className="text-sm text-zinc-500">Found Naivas at KSH 550, Quickmart at KSH 570. Selecting optimal route.</p>
                    </div>
                  </motion.div>
                )}

                {(step === 'confirming' || step === 'payment' || step === 'success') && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                      <AlertCircle size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-200">3. Awaiting Payment Confirmation</p>
                      <p className="text-sm text-zinc-500">Total KSH 650 (incl. delivery). Action required.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence>
          {(step === 'confirming' || step === 'payment' || step === 'success') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-zinc-900 border-emerald-500/30 overflow-hidden relative">
                {step === 'success' && (
                  <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-emerald-400">
                    <CheckCircle2 size={48} className="mb-2" />
                    <p className="font-bold text-lg">Payment Successful</p>
                  </div>
                )}
                <CardHeader className="bg-zinc-950/50 border-b border-zinc-800">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Phone size={18} className="text-emerald-500" /> 
                      Simulated M-Pesa Prompt
                    </CardTitle>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400">STK Push</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Merchant</span>
                      <span className="font-medium">Sauti AI Shopping</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Item Price (Naivas)</span>
                      <span className="font-mono">KSH 550.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Delivery (Boda)</span>
                      <span className="font-mono">KSH 80.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Platform Fee</span>
                      <span className="font-mono">KSH 20.00</span>
                    </div>
                    <div className="pt-4 border-t border-zinc-800 flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="text-emerald-400 font-mono">KSH 650.00</span>
                    </div>

                    <Button 
                      className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500" 
                      onClick={confirmPayment}
                      disabled={step === 'payment' || step === 'success'}
                    >
                      {step === 'payment' ? 'Processing...' : 'Enter PIN to Confirm'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
