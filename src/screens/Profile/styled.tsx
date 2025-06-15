import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

const Container = styled.ScrollView`
  display: flex;
  background-color: #fff;
  height: 100%;
  padding: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const Content = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProfileImageContainer = styled.View`
  position: relative;
  margin-bottom: 20px;
`;

const NameText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
`;

const InfoContainer = styled.View`
  width: 100%;
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
`;

const InfoLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
`;

const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const InfoValue = styled.Text`
  font-size: 16px;
  color: #333;
  margin-left: 15px;
`;

const BottomButtons = styled.View`
  width: 100%;
  margin-top: auto;
  gap: 10px;
`;

const EditButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #007aff;
  padding: 15px;
  border-radius: 8px;
`;

const LogoutButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #ff3b30;
`;

const Title = styled.Text`
  color: #333;
  font-size: 24px;
  margin: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const Highlight = styled.Text``;

const GroupButton = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
`;

export const ProfileStyled = {
  Container,
  Header,
  HeaderTitle,
  Content,
  ProfileImageContainer,
  NameText,
  InfoContainer,
  InfoLabel,
  InfoItem,
  InfoValue,
  BottomButtons,
  EditButton,
  LogoutButton,
  Title,
  Highlight,
  GroupButton,
};
