import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStyled as Styled } from './styled';
import { MagnifyingGlassIcon, BellIcon, ChatBubbleLeftIcon } from 'react-native-heroicons/outline';
import StockList from '../../components/StockList/StockList';
import TabBar from '../../components/TabBar/TabBar';
import SectionHeader from '../../components/SearchHeader/SearchHeader';
import { allStocks, portfolioStocks, trendingStocks } from '../../utils/stocksData';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  ChatBot: undefined;
};

interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: string;
  change?: string;
  status?: string;
  trend: 'up' | 'down';
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const Home: React.FC<Props> = ({ navigation }) => {
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
              <Styled.ChatBotButton
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
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
            <StockList stocks={portfolioStocks} showStatus={false} />
          </Styled.StockListContainer>

          <SectionHeader title="Tendências" onSeeMorePress={() => 'Ver mais tendências'} />
          <Styled.StockListContainer>
            <StockList stocks={trendingStocks} showStatus={true} />
          </Styled.StockListContainer>

          <SectionHeader title="Todos" onSeeMorePress={() => 'Ver mais todos'} />
          <Styled.StockListContainer>
            <StockList stocks={allStocks} showStatus={true} />
          </Styled.StockListContainer>
        </ScrollView>
      </Styled.Content>
    </Styled.Container>
  );
};

export default Home;
