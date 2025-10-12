import { StockRecommendation, TopStock } from '../services/apiService';

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: string;
  change?: string;
  status?: string;
  trend: 'up' | 'down' | 'neutral';
}

const stockNamesMap: Record<string, string> = {
  AAPL: 'Apple Inc.',
  MSFT: 'Microsoft Corporation',
  AMZN: 'Amazon.com Inc.',
  TSLA: 'Tesla Inc.',
  NVDA: 'NVIDIA Corporation',
  GOOGL: 'Alphabet Inc.',
};

export const convertAWSRecommendationsToStocks = (
  recommendations: StockRecommendation[]
): Stock[] => {
  if (!recommendations || !Array.isArray(recommendations)) {
    return [];
  }

  const converted = recommendations.map((rec, index) => {
    const recText = rec.analysis?.recomendacao?.toUpperCase() || '';

    const trend: 'up' | 'down' | 'neutral' =
      recText.includes('COMPRAR') || recText.includes('COMPRA') || recText === 'BUY'
        ? 'up'
        : recText.includes('VENDER') || recText.includes('VENDA') || recText === 'SELL'
          ? 'down'
          : 'neutral';

    const status = trend === 'up' ? 'Positivo' : trend === 'down' ? 'Negativo' : 'Neutro';

    const stockName = stockNamesMap[rec.symbol] || `${rec.symbol} Inc.`;

    return {
      id: `aws-rec-${index}`,
      symbol: rec.symbol,
      name: stockName,
      price: `$${rec.current_price?.toFixed(2) || '0.00'}`,
      status,
      trend,
    };
  });

  return converted;
};

export const convertAWSTopStocksToStocks = (topStocks: TopStock[]): Stock[] => {
  if (!topStocks || !Array.isArray(topStocks)) {
    console.error('Top stocks inválidas:', topStocks);
    return [];
  }

  const converted = topStocks.map((stock, index) => {
    const recText = stock.analysis?.recomendacao?.toUpperCase() || '';

    let trend: 'up' | 'down' | 'neutral';
    if (recText.includes('COMPRAR') || recText.includes('COMPRA') || recText === 'BUY') {
      trend = 'up';
    } else if (recText.includes('VENDER') || recText.includes('VENDA') || recText === 'SELL') {
      trend = 'down';
    } else if ((stock as any).price_change_7d > 2) {
      trend = 'up';
    } else if ((stock as any).price_change_7d < -2) {
      trend = 'down';
    } else {
      trend = 'neutral';
    }

    const status = trend === 'up' ? 'Positivo' : trend === 'down' ? 'Negativo' : 'Neutro';
    const stockName = stockNamesMap[stock.symbol] || `${stock.symbol} Inc.`;

    const rawPrice = stock.current_price ?? (stock as any).price ?? (stock as any).close ?? 0;

    const change =
      (stock as any).price_change_7d !== undefined
        ? (stock as any).price_change_7d > 0
          ? `+${(stock as any).price_change_7d.toFixed(2)}%`
          : `${(stock as any).price_change_7d.toFixed(2)}%`
        : undefined;

    return {
      id: `aws-top-${index}`,
      symbol: stock.symbol,
      name: stockName,
      price: `$${Number(rawPrice).toFixed(2)}`,
      change,
      status,
      trend,
    };
  });

  return converted;
};

export const trendingStocks: Stock[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 'R$232.56',
    change: '+3.04%',
    status: 'Positivo',
    trend: 'up',
  },
  {
    id: '2',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 'R$45.20',
    change: '+1.85%',
    status: 'Positivo',
    trend: 'up',
  },
  {
    id: '3',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 'R$125.80',
    change: '+2.15%',
    status: 'Positivo',
    trend: 'up',
  },
  {
    id: '4',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 'R$142.68',
    status: 'Positivo',
    trend: 'up',
  },
  {
    id: '5',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 'R$245.30',
    status: 'Neutro',
    trend: 'neutral',
  },
];
