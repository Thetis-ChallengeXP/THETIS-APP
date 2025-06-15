import styled from 'styled-components/native';

interface TrendProps {
  trend?: 'up' | 'down' | 'neutral';
}

interface SelectedProps {
  selected: boolean;
}

interface SecondaryProps {
  secondary?: boolean;
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #fff;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;

const StockInfoCard = styled.View`
  margin: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StockBasicInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LogoContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f0f0f0;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const LogoImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const StockSymbol = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;

const StockName = styled.Text`
  font-size: 14px;
  color: #666;
`;

const PriceInfo = styled.View`
  align-items: flex-end;
`;

const StockPrice = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;

const ChangeText = styled.Text<TrendProps>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ trend }) => {
    switch (trend) {
      case 'up':
        return '#4CAF50';
      case 'down':
        return '#F44336';
      case 'neutral':
        return '#666';
      default:
        return '#666';
    }
  }};
`;

const ChartContainer = styled.View`
  margin: 0 16px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
`;

const ChartImage = styled.Image`
  width: 100%;
  height: 150px;
`;

const TimeframeSelector = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px;
`;

const TimeframeOption = styled.TouchableOpacity<SelectedProps>`
  padding: 6px 12px;
  border-radius: 16px;
  background-color: ${({ selected }) => (selected ? '#e3f2fd' : 'transparent')};
`;

const TimeframeText = styled.Text<SelectedProps>`
  font-size: 14px;
  color: ${({ selected }) => (selected ? '#2196F3' : '#666')};
  font-weight: ${({ selected }) => (selected ? '600' : '400')};
`;

const ActionButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 16px;
  gap: 12px;
`;

const ActionButton = styled.TouchableOpacity<SecondaryProps>`
  flex: 1;
  background-color: ${({ secondary }) => (secondary ? '#fff' : '#2196F3')};
  border: ${({ secondary }) => (secondary ? '1px solid #2196F3' : 'none')};
  border-radius: 8px;
  padding: 14px;
  align-items: center;
`;

const ActionButtonText = styled.Text<SecondaryProps>`
  color: ${({ secondary }) => (secondary ? '#2196F3' : '#fff')};
  font-size: 16px;
  font-weight: 600;
`;

const StockDetailsContainer = styled.View`
  margin: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin-bottom: 12px;
`;

const StockDescription = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 20px;
  margin-bottom: 16px;
`;

const StockMetricsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const MetricItem = styled.View`
  width: 48%;
  margin-bottom: 12px;
`;

const MetricLabel = styled.Text`
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
`;

const MetricValue = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;

export const StockDetailStyled = {
  Container,
  Header,
  HeaderTitle,
  StockInfoCard,
  StockBasicInfo,
  LogoContainer,
  LogoImage,
  StockSymbol,
  StockName,
  PriceInfo,
  StockPrice,
  ChangeText,
  ChartContainer,
  ChartImage,
  TimeframeSelector,
  TimeframeOption,
  TimeframeText,
  ActionButtonsContainer,
  ActionButton,
  ActionButtonText,
  StockDetailsContainer,
  SectionTitle,
  StockDescription,
  StockMetricsContainer,
  MetricItem,
  MetricLabel,
  MetricValue,
};
