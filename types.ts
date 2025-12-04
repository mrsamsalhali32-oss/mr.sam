export interface ScanResult {
  url: string;
  riskScore: number; // 0 to 100 (0 is safe, 100 is malicious)
  verdict: 'آمن' | 'مشبوه' | 'خبيث';
  summary: string;
  details: string[];
  recommendation: string;
}

export interface HistoryItem extends ScanResult {
  timestamp: number;
}