import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { HomeStyled as Styled } from './styled';
import { MagnifyingGlassIcon, BellIcon, ChatBubbleLeftIcon } from 'react-native-heroicons/outline';
import StockList from '../../components/StockList/StockList';
import TabBar from '../../components/TabBar/TabBar';
import { Text } from 'react-native';
import SectionHeader from '../../components/SearchHeader/SearchHeader';
import {
  convertAWSRecommendationsToStocks,
  convertAWSTopStocksToStocks,
  Stock,
} from '../../utils/stocksData';
import { useRecommendations } from '../../utils/useRecommendations';
import {
  RecommendationsLoading,
  RecommendationsError,
} from '../../components/RecommendationsError/RecommendationsError';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: {
    userToken: string;
    userData: {
      userId: string;
      username: string;
      email: string;
    };
  };
  ChatBot: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const Home: React.FC<Props> = ({ navigation }) => {
  const [userRecommendations, setUserRecommendations] = useState<Stock[]>([]);
  const [trendingStocks, setTrendingStocks] = useState<Stock[]>([]);

  const {
    recommendations,
    recommendationsLoading,
    recommendationsError,
    refetchRecommendations,

    topStocks,
    topStocksLoading,
    topStocksError,
    refetchTopStocks,
  } = useRecommendations();

  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      const convertedRecommendations = convertAWSRecommendationsToStocks(recommendations);
      setUserRecommendations(convertedRecommendations);
      // console.log('Recomendações personalizadas convertidas:', convertedRecommendations);
    }
  }, [recommendations]);

  useEffect(() => {
    if (topStocks && topStocks.length > 0) {
      const convertedTopStocks = convertAWSTopStocksToStocks(topStocks);
      setTrendingStocks(convertedTopStocks);
      // console.log('Top stocks tendenciosas convertidas:', convertedTopStocks);
    }
  }, [topStocks]);

  const handleRetryRecommendations = () => {
    // console.log('Tentando buscar recomendações personalizadas novamente...');
    refetchRecommendations();
  };

  const handleRetryTopStocks = () => {
    // console.log('Tentando buscar top stocks novamente...');
    refetchTopStocks();
  };

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Header>
          <Styled.SearchContainer>
            <MagnifyingGlassIcon color="#999" size={20} />
            <Styled.SearchPlaceholder>Procurar...</Styled.SearchPlaceholder>
          </Styled.SearchContainer>

          <Styled.HeaderActions>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChatBot')}
              style={{ marginRight: 12 }}
            >
              <Styled.ChatBotButton>
                <ChatBubbleLeftIcon color="#1E88E5" size={20} />
              </Styled.ChatBotButton>
            </TouchableOpacity>

            <TouchableOpacity>
              <BellIcon color="#000" size={24} />
            </TouchableOpacity>
          </Styled.HeaderActions>
        </Styled.Header>

        <TabBar />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: '100%', paddingBottom: 20 }}
        >
          <SectionHeader title="Para você" onSeeMorePress={() => 'Ver mais'} />
          <Styled.StockListContainer>
            {recommendationsLoading ? (
              <RecommendationsLoading />
            ) : recommendationsError ? (
              <RecommendationsError
                error={recommendationsError}
                onRetry={handleRetryRecommendations}
              />
            ) : userRecommendations.length > 0 ? (
              <StockList stocks={userRecommendations} showStatus={true} />
            ) : (
              <Text style={{ fontFamily: 'sans-serif' }}>
                Nenhuma recomendação personalizada disponível no momento
              </Text>
            )}
          </Styled.StockListContainer>

          <SectionHeader title="Tendências" onSeeMorePress={() => 'Ver mais tendências'} />
          <Styled.StockListContainer>
            {topStocksLoading ? (
              <RecommendationsLoading />
            ) : topStocksError ? (
              <RecommendationsError error={topStocksError} onRetry={handleRetryTopStocks} />
            ) : trendingStocks.length > 0 ? (
              <StockList stocks={trendingStocks} showStatus={true} />
            ) : (
              <Text style={{ fontFamily: 'sans-serif' }}>Nenhuma tendência disponível no momento</Text>
            )}
          </Styled.StockListContainer>
        </ScrollView>
      </Styled.Content>
    </Styled.Container>
  );
};

export default Home;
