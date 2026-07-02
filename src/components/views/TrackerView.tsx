import React from 'react';
import { mockOrders } from '@/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const statuses = [
  'pending',
  'searching',
  'confirming_payment',
  'paid',
  'store_contacted',
  'courier_assigned',
  'out_for_delivery',
  'delivered'
] as const;

export function TrackerView() {
  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100 p-8 overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
          <Truck className="text-emerald-500" />
          Delivery Tracker
        </h2>
        <p className="text-zinc-400 mt-1">Live status of your agent-negotiated orders.</p>
      </header>

      <div className="space-y-6 max-w-4xl">
        {mockOrders.map((order) => {
          const currentStatusIndex = statuses.indexOf(order.status as any);
          
          return (
            <Card key={order.id} className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="text-lg text-zinc-100">{order.item}</CardTitle>
                  <p className="text-sm text-zinc-400 mt-1">{order.vendor} • {format(order.createdAt, 'MMM d, h:mm a')}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-medium text-emerald-400 text-lg">KSH {order.total}</p>
                  <Badge variant="outline" className={cn(
                    "mt-1",
                    order.type === 'repeat' ? "border-blue-500/30 text-blue-400" : "border-amber-500/30 text-amber-400"
                  )}>
                    {order.type === 'repeat' ? 'Memory Purchase' : 'Agent Search'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative pt-6 pb-2">
                  <div className="absolute left-[15px] top-6 bottom-4 w-[2px] bg-zinc-800" />
                  
                  <div className="space-y-6 relative">
                    {[
                      { id: 'paid', label: 'Order Paid via M-Pesa' },
                      { id: 'store_contacted', label: 'Store Confirmed Item' },
                      { id: 'courier_assigned', label: 'Courier Assigned (Bolt)' },
                      { id: 'out_for_delivery', label: 'Out for Delivery' },
                      { id: 'delivered', label: 'Delivered' },
                    ].map((step, index) => {
                      const stepIndex = statuses.indexOf(step.id as any);
                      const isCompleted = stepIndex <= currentStatusIndex;
                      const isCurrent = stepIndex === currentStatusIndex;

                      return (
                        <div key={step.id} className="flex gap-4 items-start relative z-10">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2",
                            isCompleted ? "bg-emerald-500/20 border-emerald-500 text-emerald-500" : "bg-zinc-900 border-zinc-700 text-zinc-600"
                          )}>
                            {isCompleted ? <CheckCircle2 size={16} /> : isCurrent ? <Clock size={16} className="animate-pulse text-emerald-500" /> : <Circle size={12} />}
                          </div>
                          <div className="pt-1.5">
                            <p className={cn("text-sm font-medium", isCompleted ? "text-zinc-200" : "text-zinc-500")}>
                              {step.label}
                            </p>
                            {isCurrent && (
                              <p className="text-xs text-emerald-400/80 mt-1">Currently in progress...</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
