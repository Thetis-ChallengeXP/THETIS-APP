import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { StockDetailStyled as Styled } from './styled';

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: string;
  change?: string;
  status?: string;
  trend: 'up' | 'down';
}

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  StockDetail: { stock: Stock };
};

type StockDetailRouteProp = RouteProp<RootStackParamList, 'StockDetail'>;
type StockDetailNavigationProp = StackNavigationProp<RootStackParamList, 'StockDetail'>;

interface Props {
  route: StockDetailRouteProp;
  navigation: StockDetailNavigationProp;
}

const StockDetail: React.FC<Props> = ({ route, navigation }) => {
  const { stock } = route.params;

  return (
    <Styled.Container>
      <Styled.Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon color="#000" size={24} />
        </TouchableOpacity>
        <Styled.HeaderTitle>{stock.name}</Styled.HeaderTitle>
        <View style={{ width: 24 }} />
      </Styled.Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Styled.StockInfoCard>
          <Styled.StockBasicInfo>
            <Styled.LogoContainer>
              <Styled.LogoImage source={require('../../images/brands/apple_logo.png')} />
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
          <Styled.ChartImage source={require('../../images/Home/trend-up.png')} />
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
            A Apple Inc. é uma empresa multinacional americana que projeta, desenvolve e vende
            eletrônicos de consumo, software de computador e serviços online. É considerada uma das
            Big Techs, junto com Amazon, Google, Microsoft e Meta.
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
