export type ViewState = 'home' | 'memory' | 'commerce' | 'tracker' | 'logs';

export interface MemoryItem {
  id: string;
  name: string;
  lastVendor: string;
  price: number;
  deliveryMethod: string;
  frequency: string;
  confidence: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface AuditLog {
  id: string;
  action: string;
  details: string;
  timestamp: Date;
  status: 'success' | 'pending' | 'failed' | 'info';
}

export interface Order {
  id: string;
  item: string;
  vendor: string;
  price: number;
  deliveryFee: number;
  platformFee: number;
  total: number;
  status: 'pending' | 'searching' | 'confirming_payment' | 'paid' | 'store_contacted' | 'courier_assigned' | 'out_for_delivery' | 'delivered';
  type: 'repeat' | 'new';
  createdAt: Date;
  updatedAt: Date;
}
