import React from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ArrowLeftIcon, BellIcon } from 'react-native-heroicons/outline';
import { BookmarkIcon } from 'react-native-heroicons/outline';
import { BookmarkIcon as BookmarkSolidIcon } from 'react-native-heroicons/solid';
import { StockDetailStyled as Styled } from './styled';
import { useSavedStocks } from '../../contexts/SavedStocksContext';

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: string;
  change?: string;
  status?: string;
  trend: 'up' | 'down' | 'neutral';
}

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  StockDetail: { stock: Stock };
  BookMark: undefined;
};

type StockDetailRouteProp = RouteProp<RootStackParamList, 'StockDetail'>;
type StockDetailNavigationProp = StackNavigationProp<RootStackParamList, 'StockDetail'>;

interface Props {
  route: StockDetailRouteProp;
  navigation: StockDetailNavigationProp;
}

const companyDescriptions: Record<string, string> = {
  AAPL: 'A Apple Inc. é uma empresa americana que projeta, fabrica e vende produtos eletrônicos de consumo, software e serviços online. É uma das Big Techs, conhecida pelo iPhone, iPad e MacBook.',
  MSFT: 'A Microsoft Corporation é uma empresa multinacional de tecnologia focada em software, hardware e serviços em nuvem. É conhecida pelo sistema operacional Windows e pela plataforma Azure.',
  NVDA: 'A NVIDIA Corporation é líder mundial em processamento gráfico e inteligência artificial. Suas GPUs são amplamente usadas em jogos, computação científica e data centers.',
  AMZN: 'A Amazon.com, Inc. é uma das maiores empresas de comércio eletrônico e computação em nuvem do mundo, fundada por Jeff Bezos. Oferece produtos e serviços via Amazon Web Services (AWS).',
  TSLA: 'A Tesla, Inc. é uma empresa americana de veículos elétricos e energia limpa fundada por Elon Musk. É referência em inovação automotiva e desenvolvimento de baterias e energia solar.',
};

const companyLogos: Record<string, any> = {
  AAPL: require('../../images/brands/apple_logo.png'),
  MSFT: require('../../images/brands/msft_logo.png'),
  NVDA: require('../../images/brands/nvda_logo.png'),
  AMZN: require('../../images/brands/amzn_logo.png'),
  TSLA: require('../../images/brands/tsla_logo.png'),
};

const StockDetail: React.FC<Props> = ({ route, navigation }) => {
  const { stock } = route.params;
  const { saveStock, unsaveStock, isStockSaved } = useSavedStocks();

  const getTrendImage = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return require('../../images/Home/trend-up.png');
      case 'down':
        return require('../../images/Home/trend-down.png');
      case 'neutral':
        return require('../../images/Home/trend-neutral.png');
      default:
        return require('../../images/Home/trend-neutral.png');
    }
  };

  const handleBookmarkPress = () => {
    if (isStockSaved(stock.id)) {
      unsaveStock(stock.id);
      Alert.alert('Removido', 'Ação removida dos salvos');
    } else {
      saveStock(stock);
      Alert.alert('Salvo!', 'Ação salva com sucesso!');
    }
  };

  return (
    <Styled.Container>
      <Styled.Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon color="#000" size={24} />
        </TouchableOpacity>
        <Styled.HeaderTitle>{stock.name}</Styled.HeaderTitle>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity style={{ padding: 4 }}>
            <BellIcon color="#000" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBookmarkPress} style={{ padding: 4 }}>
            {isStockSaved(stock.id) ? (
              <BookmarkSolidIcon color="#007AFF" size={24} />
            ) : (
              <BookmarkIcon color="#000" size={24} />
            )}
          </TouchableOpacity>
        </View>
      </Styled.Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Styled.StockInfoCard>
          <Styled.StockBasicInfo>
            <Styled.LogoContainer>
              <Styled.LogoImage
                source={companyLogos[stock.symbol] || companyLogos['AAPL']}
                resizeMode="contain"
              />
            </Styled.LogoContainer>
            <View>
              <Styled.StockSymbol>{stock.symbol}</Styled.StockSymbol>
              <Styled.StockName>{stock.name}</Styled.StockName>
            </View>
          </Styled.StockBasicInfo>

          <Styled.PriceInfo>
            <Styled.StockPrice>{stock.price}</Styled.StockPrice>
            <Styled.ChangeText trend={stock.trend}>
              {stock.change || (stock.trend === 'up' ? '+0.00%' : '-0.00%')}
            </Styled.ChangeText>
          </Styled.PriceInfo>
        </Styled.StockInfoCard>

        <Styled.ChartContainer>
          <Styled.ChartImage source={getTrendImage(stock.trend)} />
          <Styled.TimeframeSelector>
            <Styled.TimeframeOption selected={false}>
              <Styled.TimeframeText selected={false}>1sem</Styled.TimeframeText>
            </Styled.TimeframeOption>
            <Styled.TimeframeOption selected={false}>
              <Styled.TimeframeText selected={false}>1m</Styled.TimeframeText>
            </Styled.TimeframeOption>
            <Styled.TimeframeOption selected={true}>
              <Styled.TimeframeText selected={true}>6m</Styled.TimeframeText>
            </Styled.TimeframeOption>
            <Styled.TimeframeOption selected={false}>
              <Styled.TimeframeText selected={false}>12m</Styled.TimeframeText>
            </Styled.TimeframeOption>
            <Styled.TimeframeOption selected={false}>
              <Styled.TimeframeText selected={false}>Todos</Styled.TimeframeText>
            </Styled.TimeframeOption>
          </Styled.TimeframeSelector>
        </Styled.ChartContainer>

        <Styled.ActionButtonsContainer>
          <Styled.ActionButton>
            <Styled.ActionButtonText>Comprar</Styled.ActionButtonText>
          </Styled.ActionButton>
          <Styled.ActionButton secondary>
            <Styled.ActionButtonText secondary>Vender</Styled.ActionButtonText>
          </Styled.ActionButton>
        </Styled.ActionButtonsContainer>

        <Styled.StockDetailsContainer>
          <Styled.SectionTitle>Sobre {stock.name}</Styled.SectionTitle>
          <Styled.StockDescription>
            {companyDescriptions[stock.symbol] ||
              'Descrição não disponível para esta empresa no momento.'}
          </Styled.StockDescription>

          <Styled.StockMetricsContainer>
            <Styled.MetricItem>
              <Styled.MetricLabel>Valor de mercado</Styled.MetricLabel>
              <Styled.MetricValue>R$ 2.23T</Styled.MetricValue>
            </Styled.MetricItem>
            <Styled.MetricItem>
              <Styled.MetricLabel>P/L</Styled.MetricLabel>
              <Styled.MetricValue>27.95</Styled.MetricValue>
            </Styled.MetricItem>
            <Styled.MetricItem>
              <Styled.MetricLabel>Dividendo</Styled.MetricLabel>
              <Styled.MetricValue>0.60%</Styled.MetricValue>
            </Styled.MetricItem>
            <Styled.MetricItem>
              <Styled.MetricLabel>Volume</Styled.MetricLabel>
              <Styled.MetricValue>59.85M</Styled.MetricValue>
            </Styled.MetricItem>
          </Styled.StockMetricsContainer>
        </Styled.StockDetailsContainer>
      </ScrollView>
    </Styled.Container>
  );
};

export default StockDetail;
