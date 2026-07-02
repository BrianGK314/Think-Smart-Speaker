import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChatMessage } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, Send, Volume2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const presetCommands = [
  "Order my usual cooking gas.",
  "Buy the cheapest 2kg rice near Kilimani.",
  "Get me airtime worth KSH 500.",
  "Order groceries like last time."
];

export function HomeView() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      role: 'assistant',
      content: 'Sasa Wanjiku! How can I help you in Nairobi today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Simulate an agent response
  const simulateResponse = (userText: string) => {
    setIsSpeaking(true);
    setTimeout(() => {
      let response = "I didn't quite get that, can you repeat?";
      
      if (userText.includes("cooking gas")) {
        response = "I've checked TotalEnergies Kilimani. Your usual 6kg refill is KSH 1,500. Should I request an M-Pesa prompt to your phone to confirm the order?";
      } else if (userText.includes("rice")) {
        response = "I searched near Kilimani. Naivas has 2kg Pishori for KSH 550, but Glovo delivers faster from Quickmart for KSH 570. I'll prepare the Naivas order. Ready for payment?";
      } else if (userText.includes("airtime")) {
        response = "Sending KSH 500 Safaricom airtime to your registered number. Please check your phone for the STK push.";
      } else if (userText.includes("groceries")) {
        response = "I'm looking up your last grocery order from Zucchini. The total with delivery is KSH 3,450. Say 'confirm' to send the M-Pesa prompt.";
      }

      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }]);
      setIsSpeaking(false);
    }, 1500);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date()
    }]);
    setInputValue('');
    simulateResponse(text);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100">
      <header className="px-8 py-6 border-b border-zinc-800/50 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Speaker Simulator</h2>
          <p className="text-zinc-400 mt-1">Interact with your Sauti AI assistant</p>
        </div>
        
        {/* Dynamic Voice Visualizer */}
        <div className="flex items-center gap-2 h-8 w-24 justify-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={cn("w-1.5 rounded-full", isSpeaking ? "bg-emerald-400" : "bg-zinc-700")}
              animate={{
                height: isSpeaking ? ["8px", "24px", "12px", "32px", "8px"] : "8px",
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full p-6 gap-6">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn("flex gap-4", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}
              >
                <Avatar className={cn("h-10 w-10 border", msg.role === 'user' ? "border-zinc-700" : "border-emerald-500 bg-emerald-500/10")}>
                  {msg.role === 'user' ? (
                     <AvatarImage src="https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&w=150&q=80" />
                  ) : (
                    <AvatarFallback className="bg-transparent text-emerald-500"><Volume2 size={20} /></AvatarFallback>
                  )}
                </Avatar>
                
                <div className={cn(
                  "max-w-[80%] rounded-2xl px-5 py-3.5",
                  msg.role === 'user' 
                    ? "bg-zinc-800 text-zinc-100 rounded-tr-sm" 
                    : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 rounded-tl-sm"
                )}>
                  <p className="text-[15px] leading-relaxed">{msg.content}</p>
                  <span className="text-[10px] text-zinc-500 mt-2 block font-mono">
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="space-y-4 pt-4 border-t border-zinc-800/50">
          <div className="flex flex-wrap gap-2">
            {presetCommands.map((cmd, i) => (
              <button
                key={i}
                onClick={() => handleSend(cmd)}
                className="text-xs bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 px-3 py-1.5 rounded-full transition-colors"
              >
                "{cmd}"
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button 
              size="icon" 
              variant="outline" 
              className={cn("h-12 w-12 rounded-full border-zinc-700 bg-zinc-900", isListening && "border-emerald-500 text-emerald-500 animate-pulse")}
              onClick={() => setIsListening(!isListening)}
            >
              <Mic size={20} />
            </Button>
            <div className="relative flex-1">
              <Input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                placeholder="Type your command..."
                className="h-12 bg-zinc-900 border-zinc-700 rounded-full pl-6 pr-12 focus-visible:ring-emerald-500 text-zinc-100"
              />
              <Button 
                size="icon" 
                variant="ghost"
                className="absolute right-1 top-1 h-10 w-10 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400"
                onClick={() => handleSend(inputValue)}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
