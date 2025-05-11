import styled from 'styled-components/native';

const StockCard = styled.View`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StockInfo = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const LogoContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #e6e6e6;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const LogoImage = styled.Image``;

const StockSymbol = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #000;
`;

const StockName = styled.Text`
  color: #777;
  font-size: 12px;
`;

const StockTrend = styled.View`
  width: 60px;
  height: 24px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const TrendLineGraph = styled.Image`
  width: 60px;
  height: 24px;
  resize-mode: contain;
`;

const PriceContainer = styled.View`
  align-items: flex-end;
  flex: 1;
`;

const StockPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const StatusBadge = styled.View`
  background-color: #d0f0d0;
  padding: 4px 8px;
  border-radius: 8px;
  margin-top: 4px;
`;

const StatusText = styled.Text`
  color: #2e7d32;
  font-size: 12px;
  font-weight: 500;
`;

const ChangeText = styled.Text<{ trend: string }>`
  font-size: 12px;
  margin-top: 4px;
  color: ${({ trend }) => (trend === 'up' ? '#4caf50' : '#f44336')};
  font-weight: 500;
`;

export const StyledStock = {
  StockCard,
  StockInfo,
  LogoContainer,
  LogoImage,
  StockSymbol,
  StockName,
  StockTrend,
  TrendLineGraph,
  PriceContainer,
  StockPrice,
  StatusBadge,
  StatusText,
  ChangeText,
};
