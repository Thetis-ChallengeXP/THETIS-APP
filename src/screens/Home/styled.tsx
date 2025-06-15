import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  height: auto;
`;

const Content = styled.View`
  flex: 1;
  width: 100%;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  width: 100%;
`;

const SearchContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 8px 15px;
  margin-right: 10px;
  flex: 1;
`;

const SearchPlaceholder = styled.Text`
  color: #999;
  margin-left: 8px;
  font-size: 14px;
`;

const HeaderActions = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ChatBotButton = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #e3f2fd;
  justify-content: center;
  align-items: center;
`;

const SectionHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 12px;
  width: 100%;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const SeeMoreText = styled.Text`
  color: #007aff;
  font-size: 14px;
`;

const StockListContainer = styled.View`
  padding: 0 16px;
  width: 100%;
`;

export const HomeStyled = {
  Container,
  Content,
  Header,
  SearchContainer,
  SearchPlaceholder,
  HeaderActions,
  ChatBotButton,
  SectionHeaderContainer,
  SectionTitle,
  SeeMoreText,
  StockListContainer,
};
