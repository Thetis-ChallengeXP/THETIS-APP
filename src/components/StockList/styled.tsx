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
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const LogoImage = styled.Image<{ width?: number; height?: number }>`
  width: ${(props) => props.width || 40}px;
  height: ${(props) => props.height || 40}px;
`;

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
  margin-bottom: 12px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const TrendLineGraph = styled.Image`
  width: 60px;
  height: 24px;
  margin-bottom: 4px;
`;

const PriceContainer = styled.View`
  align-items: flex-end;
  flex: 1;
`;

const StockPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const StatusBadge = styled.View<{ trend?: 'up' | 'down' | 'neutral' }>`
  background-color: ${({ trend }) => {
    switch (trend) {
      case 'up':
        return '#d0f0d0';
      case 'down':
        return '#ffcdd2';
      case 'neutral':
        return '#fff3cd';
      default:
        return '#f5f5f5';
    }
  }};
  padding: 4px 8px;
  border-radius: 8px;
  margin-top: 4px;
`;

const StatusText = styled.Text<{ trend?: 'up' | 'down' | 'neutral' }>`
  color: ${({ trend }) => {
    switch (trend) {
      case 'up':
        return '#2e7d32';
      case 'down':
        return '#c62828';
      case 'neutral':
        return '#f57c00';
      default:
        return '#424242';
    }
  }};
  font-size: 12px;
  font-weight: 500;
`;

const ChangeText = styled.Text<{ trend: 'up' | 'down' | 'neutral' }>`
  font-size: 12px;
  margin-top: 4px;
  color: ${({ trend }) => {
    switch (trend) {
      case 'up':
        return '#4caf50';
      case 'down':
        return '#f44336';
      case 'neutral':
        return '#ff9800';
      default:
        return '#757575';
    }
  }};
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
