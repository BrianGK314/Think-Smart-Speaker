import React from 'react';
import { ViewState } from '@/types';
import { Mic, Brain, ShoppingCart, Truck, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const navItems = [
  { id: 'home', label: 'Speaker', icon: Mic },
  { id: 'memory', label: 'Smart Memory', icon: Brain },
  { id: 'commerce', label: 'Commerce Flow', icon: ShoppingCart },
  { id: 'tracker', label: 'Order Tracker', icon: Truck },
  { id: 'logs', label: 'Audit Logs', icon: ShieldAlert },
] as const;

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 border-r bg-zinc-950/50 backdrop-blur-md text-zinc-100 flex flex-col h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <Mic size={18} className="text-zinc-950" />
          </div>
          Sauti.
        </h1>
        <p className="text-xs text-zinc-400 mt-1">Nairobi Smart Speaker</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as ViewState)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              currentView === item.id 
                ? "bg-zinc-800 text-emerald-400 shadow-sm" 
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            )}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800/50 mt-auto">
        <div className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
          <Avatar className="h-10 w-10 border border-zinc-700">
            {/* Real Unsplash image of a Black African person */}
            <AvatarImage src="https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&w=150&q=80" />
            <AvatarFallback>WK</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-200">Wanjiku K.</span>
            <span className="text-xs text-zinc-500">Kilimani, NBO</span>
          </div>
        </div>
      </div>
    </div>
  );
}
