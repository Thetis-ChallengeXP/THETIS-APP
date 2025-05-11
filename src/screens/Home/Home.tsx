import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStyled as Styled } from './styled';
import { MagnifyingGlassIcon, BellIcon } from 'react-native-heroicons/outline';
import StockList from '../../components/StockList/StockList';
import TabBar from '../../components/TabBar/TabBar';
import SectionHeader from '../../components/SearchHeader/SearchHeader';
import { allStocks, portfolioStocks, trendingStocks } from '../../utils/stocksData';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
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
          <TouchableOpacity>
            <BellIcon color="#000" size={24} />
          </TouchableOpacity>
        </Styled.Header>

        <TabBar />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: '100%', paddingBottom: 20 }}
        >
          <SectionHeader
            title="Portifólio"
            onSeeMorePress={() => console.log('Ver mais portfólio')}
          />
          <Styled.StockListContainer>
            <StockList stocks={portfolioStocks} showStatus={false} />
          </Styled.StockListContainer>

          <SectionHeader
            title="Tendências"
            onSeeMorePress={() => console.log('Ver mais tendências')}
          />
          <Styled.StockListContainer>
            <StockList stocks={trendingStocks} showStatus={true} />
          </Styled.StockListContainer>

          <SectionHeader title="Todos" onSeeMorePress={() => console.log('Ver mais todos')} />
          <Styled.StockListContainer>
            <StockList stocks={allStocks} showStatus={true} />
          </Styled.StockListContainer>
        </ScrollView>
      </Styled.Content>
    </Styled.Container>
  );
};

export default Home;
