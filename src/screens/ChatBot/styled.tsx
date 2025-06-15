import styled from 'styled-components/native';

interface MessageProps {
  isUser: boolean;
}

interface ButtonProps {
  disabled?: boolean;
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f8f9fa;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const BackText = styled.Text`
  color: #1e88e5;
  font-size: 16px;
  font-weight: 500;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const MessagesContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const MessageWrapper = styled.View<MessageProps>`
  margin-bottom: 16px;
  align-items: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.View<MessageProps>`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 20px;
  background-color: ${(props) => (props.isUser ? '#1E88E5' : '#fff')};
`;

const MessageHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const MessageTime = styled.Text<MessageProps>`
  font-size: 11px;
  color: ${(props) => (props.isUser ? 'rgba(255,255,255,0.7)' : '#999')};
  margin-left: 6px;
`;

const MessageText = styled.Text<MessageProps>`
  font-size: 16px;
  line-height: 22px;
  color: ${(props) => (props.isUser ? '#fff' : '#333')};
`;

const LoadingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LoadingText = styled.Text`
  font-size: 14px;
  color: #666;
  margin-left: 8px;
  font-style: italic;
`;

const InputContainer = styled.View`
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
  padding: 12px 16px;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
  background-color: #f0f0f0;
  border-radius: 25px;
  padding: 8px 12px;
  min-height: 50px;
`;

const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #333;
  max-height: 100px;
  margin-right: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const SendButton = styled.View<ButtonProps>`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${(props) => (props.disabled ? '#f0f0f0' : '#e3f2fd')};
  justify-content: center;
  align-items: center;
`;

export const ChatBotStyled = {
  Container,
  Header,
  BackText,
  HeaderTitle,
  MessagesContainer,
  MessageWrapper,
  MessageBubble,
  MessageHeader,
  MessageTime,
  MessageText,
  LoadingContainer,
  LoadingText,
  InputContainer,
  InputWrapper,
  TextInput,
  SendButton,
};
