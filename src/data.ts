import { MemoryItem, Order, AuditLog } from './types';
import { subDays, subHours, subMinutes } from 'date-fns';

export const mockMemory: MemoryItem[] = [
  {
    id: 'mem-1',
    name: 'Cooking Gas (6kg Refill)',
    lastVendor: 'TotalEnergies Kilimani',
    price: 1500,
    deliveryMethod: 'Boda Delivery',
    frequency: 'Every 3 weeks',
    confidence: 0.95,
  },
  {
    id: 'mem-2',
    name: 'Mineral Water (18L Refill)',
    lastVendor: 'Aquamist Ngong Road',
    price: 500,
    deliveryMethod: 'Vendor Van',
    frequency: 'Every 2 weeks',
    confidence: 0.88,
  },
  {
    id: 'mem-3',
    name: 'Pishori Rice (5kg)',
    lastVendor: 'Naivas Westlands',
    price: 1250,
    deliveryMethod: 'Glovo',
    frequency: 'Monthly',
    confidence: 0.92,
  },
  {
    id: 'mem-4',
    name: 'Safaricom Airtime',
    lastVendor: 'M-Pesa Paybill',
    price: 1000,
    deliveryMethod: 'Direct Top-up',
    frequency: 'Weekly',
    confidence: 0.99,
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    item: 'Cooking Gas (6kg Refill)',
    vendor: 'TotalEnergies Kilimani',
    price: 1500,
    deliveryFee: 150,
    platformFee: 50,
    total: 1700,
    status: 'delivered',
    type: 'repeat',
    createdAt: subDays(new Date(), 21),
    updatedAt: subDays(new Date(), 21),
  },
  {
    id: 'ord-002',
    item: 'Fresh Groceries',
    vendor: 'Zucchini Lavington',
    price: 3200,
    deliveryFee: 200,
    platformFee: 50,
    total: 3450,
    status: 'out_for_delivery',
    type: 'new',
    createdAt: subHours(new Date(), 2),
    updatedAt: subMinutes(new Date(), 15),
  }
];

export const mockLogs: AuditLog[] = [
  {
    id: 'log-1',
    action: 'Agent Initialization',
    details: 'System booted. Loaded user context for Nairobi region.',
    timestamp: subHours(new Date(), 24),
    status: 'info',
  },
  {
    id: 'log-2',
    action: 'Web Search',
    details: 'Queried Glovo API for "Fresh Groceries Lavington"',
    timestamp: subHours(new Date(), 2),
    status: 'success',
  },
  {
    id: 'log-3',
    action: 'Price Comparison',
    details: 'Compared Zucchini (3200 KSH) vs Chandarana (3400 KSH). Selected Zucchini.',
    timestamp: subHours(new Date(), 2),
    status: 'success',
  },
  {
    id: 'log-4',
    action: 'M-Pesa STK Push',
    details: 'Requested 3450 KSH from user phone +2547******12',
    timestamp: subHours(new Date(), 1),
    status: 'pending',
  },
  {
    id: 'log-5',
    action: 'Payment Confirmed',
    details: 'Received M-Pesa callback for 3450 KSH.',
    timestamp: subMinutes(new Date(), 58),
    status: 'success',
  }
];
