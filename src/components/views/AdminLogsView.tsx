import React from 'react';
import { mockLogs } from '@/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, Terminal } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function AdminLogsView() {
  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100 p-8 overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
          <ShieldAlert className="text-emerald-500" />
          Audit & Safety Logs
        </h2>
        <p className="text-zinc-400 mt-1">Transparency report on agent reasoning, searches, and payment requests.</p>
      </header>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader className="border-b border-zinc-800/50 pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Terminal size={18} className="text-zinc-400" />
            System Event Stream
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-zinc-900/80 hover:bg-zinc-900/80">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="w-[180px] text-zinc-400">Timestamp</TableHead>
                <TableHead className="w-[200px] text-zinc-400">Action Type</TableHead>
                <TableHead className="text-zinc-400">Details & Reasoning</TableHead>
                <TableHead className="w-[100px] text-right text-zinc-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((log) => (
                <TableRow key={log.id} className="border-zinc-800/50 hover:bg-zinc-800/20">
                  <TableCell className="font-mono text-xs text-zinc-500">
                    {format(log.timestamp, 'MM/dd HH:mm:ss')}
                  </TableCell>
                  <TableCell className="font-medium text-zinc-300">
                    {log.action}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-400">
                    {log.details}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={cn(
                      "capitalize font-mono text-[10px]",
                      log.status === 'success' && "border-emerald-500/30 text-emerald-400",
                      log.status === 'pending' && "border-amber-500/30 text-amber-400",
                      log.status === 'failed' && "border-red-500/30 text-red-400",
                      log.status === 'info' && "border-blue-500/30 text-blue-400",
                    )}>
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
