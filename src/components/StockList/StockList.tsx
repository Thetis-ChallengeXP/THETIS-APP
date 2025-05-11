import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyledStock as Styled } from './styled';

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

type StockNavigationProp = StackNavigationProp<RootStackParamList>;

interface StockListProps {
  stocks: Stock[];
  showStatus?: boolean;
}

const StockList: React.FC<StockListProps> = ({ stocks, showStatus = false }) => {
  const navigation = useNavigation<StockNavigationProp>();

  const handleStockPress = (stock: Stock) => {
    navigation.navigate('StockDetail', { stock });
  };

  return (
    <>
      {stocks.map((stock) => (
        <TouchableOpacity key={stock.id} onPress={() => handleStockPress(stock)}>
          <Styled.StockCard>
            <Styled.StockInfo>
              <Styled.LogoContainer>
                <Styled.LogoImage source={require('../../images/brands/apple_logo.png')} />
              </Styled.LogoContainer>
              <View>
                <Styled.StockSymbol>{stock.symbol}</Styled.StockSymbol>
                <Styled.StockName>{stock.name}</Styled.StockName>
              </View>
            </Styled.StockInfo>

            <Styled.StockTrend>
              {stock.trend === 'up' ? (
                <Styled.TrendLineGraph source={require('../../images/Home/trend-up.png')} />
              ) : (
                <Styled.TrendLineGraph source={require('../../images/Home/trend-down.png')} />
              )}
            </Styled.StockTrend>

            <Styled.PriceContainer>
              <Styled.StockPrice>{stock.price}</Styled.StockPrice>
              {showStatus ? (
                <Styled.StatusBadge>
                  <Styled.StatusText>{stock.status}</Styled.StatusText>
                </Styled.StatusBadge>
              ) : (
                <Styled.ChangeText trend={stock.trend}>{stock.change}</Styled.ChangeText>
              )}
            </Styled.PriceContainer>
          </Styled.StockCard>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default StockList;
