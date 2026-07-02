import React from 'react';
import { mockMemory } from '@/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Clock, MapPin, Wallet, Truck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function MemoryView() {
  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100 p-8 overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
          <Brain className="text-emerald-500" />
          Smart Memory Context
        </h2>
        <p className="text-zinc-400 mt-1">Items Sauti predicts you regularly purchase based on past history.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMemory.map((item) => (
          <Card key={item.id} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-medium text-zinc-100">{item.name}</CardTitle>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  {Math.round(item.confidence * 100)}% Match
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <MapPin size={16} className="text-zinc-500" />
                    <span>Vendor: <span className="font-medium text-zinc-100">{item.lastVendor}</span></span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Wallet size={16} className="text-zinc-500" />
                    <span>Est. Price: <span className="font-mono text-emerald-400">KSH {item.price.toLocaleString()}</span></span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Truck size={16} className="text-zinc-500" />
                    <span>Fulfillment: <span className="text-zinc-100">{item.deliveryMethod}</span></span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Clock size={16} className="text-zinc-500" />
                    <span>Frequency: <span className="text-zinc-100">{item.frequency}</span></span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <div className="flex justify-between text-xs text-zinc-500 mb-2">
                    <span>Purchase Probability</span>
                    <span>High</span>
                  </div>
                  <Progress value={item.confidence * 100} className="h-1.5 bg-zinc-800" indicatorclassname="bg-emerald-500" />
                </div>
                
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
