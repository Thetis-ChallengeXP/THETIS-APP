import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #1e88e5;
`;

const TopSection = styled.View`
  height: 25%;
  background-color: #1e88e5;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Logo = styled.Image`
  width: 80px;
  height: 80px;
  tint-color: white;
`;

const WavyBottom = styled.View`
  position: absolute;
  bottom: -20px;
  width: 100%;
  height: 40px;
`;

const ContentSection = styled.View`
  flex: 1;
  padding: 20px;
  margin-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #fff;
`;

const TabContainer = styled.View`
  flex-direction: row;
  background-color: #f5f5f5;
  border-radius: 25px;
  height: 44px;
  margin-bottom: 20px;
`;

const TabButton = styled.TouchableOpacity<{ active?: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? '#fff' : 'transparent')};
  border-radius: 25px;
  elevation: ${(props) => (props.active ? 2 : 0)};
`;

const TabText = styled.Text<{ active?: boolean }>`
  color: ${(props) => (props.active ? '#1E88E5' : '#888')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

const InputContainer = styled.View`
  margin-bottom: 20px;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  margin-bottom: 15px;
`;

const InputIcon = styled(Ionicons)`
  font-size: 20px;
  color: #1e88e5;
  margin-right: 10px;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  padding: 10px 0;
  color: #333;
  font-size: 16px;
`;

const ForgotPasswordContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #1e88e5;
  border-radius: 25px;
  padding: 15px;
  align-items: center;
  justify-content: center;
`;

const LoginButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

export const AuthStyled = {
  Container,
  TopSection,
  Logo,
  WavyBottom,
  ContentSection,
  TabContainer,
  TabButton,
  TabText,
  InputWrapper,
  InputIcon,
  StyledInput,
  InputContainer,
  ForgotPasswordContainer,
  LoginButton,
  LoginButtonText,
};
