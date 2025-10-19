import { useEffect, useState, useCallback } from 'react';
import { recommendationsService, StockRecommendation, TopStock } from '../services/apiService';

interface UseRecommendationsState {
  recommendations: StockRecommendation[];
  recommendationsLoading: boolean;
  recommendationsError: string | null;

  topStocks: TopStock[];
  topStocksLoading: boolean;
  topStocksError: string | null;

  investorProfile: any | null;
  refetchRecommendations: () => Promise<void>;
  refetchTopStocks: () => Promise<void>;
  refetchAll: () => Promise<void>;
}

export const useRecommendations = (): UseRecommendationsState => {
  const [recommendations, setRecommendations] = useState<StockRecommendation[]>([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);
  const [recommendationsError, setRecommendationsError] = useState<string | null>(null);

  const [topStocks, setTopStocks] = useState<TopStock[]>([]);
  const [topStocksLoading, setTopStocksLoading] = useState(true);
  const [topStocksError, setTopStocksError] = useState<string | null>(null);

  const [investorProfile, setInvestorProfile] = useState<any | null>(null);

  const fetchRecommendations = useCallback(async () => {
    try {
      setRecommendationsLoading(true);
      setRecommendationsError(null);

      const recommendationsData = await recommendationsService.getRecommendations();

      setRecommendations(recommendationsData);
    } catch (err: any) {
      setRecommendationsError(err.message || 'Erro ao buscar recomendações');
      setRecommendations([]);
    } finally {
      setRecommendationsLoading(false);
    }
  }, []);

  const fetchTopStocks = useCallback(async () => {
    try {
      setTopStocksLoading(true);
      setTopStocksError(null);

      const topStocksData = await recommendationsService.getTopStocks();

      setTopStocks(topStocksData);
    } catch (err: any) {
      setTopStocksError(err.message || 'Erro ao buscar top stocks');
      setTopStocks([]);
    } finally {
      setTopStocksLoading(false);
    }
  }, []);

  const fetchAll = useCallback(async () => {
    await Promise.all([fetchRecommendations(), fetchTopStocks()]);
  }, [fetchRecommendations, fetchTopStocks]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    recommendations,
    recommendationsLoading,
    recommendationsError,

    topStocks,
    topStocksLoading,
    topStocksError,

    investorProfile,
    refetchRecommendations: fetchRecommendations,
    refetchTopStocks: fetchTopStocks,
    refetchAll: fetchAll,
  };
};
