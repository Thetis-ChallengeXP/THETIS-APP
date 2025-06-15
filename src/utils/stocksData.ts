export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: string;
  change?: string;
  status?: string;
  trend: 'up' | 'down' | 'neutral';
}

export const portfolioStocks: Stock[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple',
    price: 'R$59.35',
    change: '+3.04%',
    trend: 'up',
  },
  {
    id: '2',
    symbol: 'AAPL',
    name: 'Apple',
    price: 'R$59.35',
    change: '+3.04%',
    trend: 'up',
  },
  {
    id: '3',
    symbol: 'AAPL',
    name: 'Apple',
    price: 'R$59.35',
    change: '+3.04%',
    trend: 'up',
  },
];

export const trendingStocks: Stock[] = [
  {
    id: '4',
    symbol: 'AAPL',
    name: 'Apple',
    price: 'R$59.35',
    status: 'Positivo',
    trend: 'up',
  },
  {
    id: '5',
    symbol: 'AAPL',
    name: 'Apple',
    price: 'R$59.35',
    status: 'Neutro',
    trend: 'neutral',
  },
  {
    id: '6',
    symbol: 'AAPL',
    name: 'Apple',
    price: 'R$59.35',
    status: 'Negativo',
    trend: 'down',
  },
];

export const allStocks: Stock[] = [
  {
    id: '7',
    symbol: 'AAPL',
    name: 'Apple',
    price: 'R$59.35',
    status: 'Positivo',
    trend: 'up',
  },
  {
    id: '8',
    symbol: 'AAPL',
    name: 'Apple',
    price: 'R$59.35',
    status: 'Positivo',
    trend: 'up',
  },
];
