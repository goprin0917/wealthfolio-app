export const AssetType = {
  STOCK: "Stock",
  CRYPTO: "Crypto",
  FUND: "Fund",
  BOND: "Bond",
  CASH: "Cash",
} as const;

export type AssetType = (typeof AssetType)[keyof typeof AssetType];

export const Currency = {
  USD: "USD",
  PHP: "PHP",
} as const;

export type Currency = (typeof Currency)[keyof typeof Currency];

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  quantity: number;
  averagePrice: number; // Cost basis per unit in USD
  currentPrice: number; // Live price in USD
  priceChange24h: number; // Percentage
  allocation?: number; // Calculated field
}

export interface Transaction {
  id: string;
  assetId: string;
  type: "BUY" | "SELL";
  quantity: number;
  price: number; // Price at transaction time
  date: string;
}

export interface PortfolioStats {
  totalValue: number;
  totalCost: number;
  totalPnL: number;
  roi: number;
  dailyChange: number;
}

export interface RiskProfile {
  score: number; // 0-100
  label: "Conservative" | "Moderate" | "Aggressive";
  description: string;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
}
