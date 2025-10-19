import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatBotStyled as Styled } from './styled';
import { PaperAirplaneIcon } from 'react-native-heroicons/outline';
import { UserIcon } from 'react-native-heroicons/solid';
import { useAuth } from '../../contexts/AuthContextStorage';
import { chatbotService } from '../../services/apiService';

type RootStackParamList = {
  ChatBot: undefined;
  Home: undefined;
};

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface GeminiHistoryItem {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

type ChatBotScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatBot'>;

interface Props {
  navigation: ChatBotScreenNavigationProp;
}

const ChatBot: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Olá${user ? `, ${user.username}` : ''}! Sou o assistente virtual do Projeto Thetis. Posso ajudá-lo com dúvidas sobre a plataforma Thetis e temas relacionados a investimentos. Como posso ajudá-lo hoje?`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<GeminiHistoryItem[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'none' },
      });
    });

    return () => {
      unsubscribe();
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'flex',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      });
    };
  }, [navigation]);

  useEffect(() => {
    if (!user) {
      Alert.alert('Acesso Restrito', 'Você precisa estar logado para usar o assistente virtual.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  }, [user, navigation]);

  useEffect(() => {
    const checkChatbotHealth = async () => {
      try {
        const isHealthy = await chatbotService.checkHealth();
        if (!isHealthy) {
          console.warn('Chatbot pode estar indisponível');
        }
      } catch (error) {
        console.error('Erro ao verificar saúde do chatbot:', error);
      }
    };

    if (user) {
      checkChatbotHealth();
    }
  }, [user]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await chatbotService.sendMessage(userMessage.text, conversationHistory);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      setConversationHistory((prev) => [
        ...prev,
        {
          role: 'user',
          parts: [{ text: userMessage.text }],
        },
        {
          role: 'model',
          parts: [{ text: response.message }],
        },
      ]);

      // console.log('Mensagem enviada e histórico atualizado');
    } catch (error: any) {
      // console.error('Erro ao enviar mensagem:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);

      Alert.alert(
        'Erro',
        error.message ||
          'Não foi possível conectar com o assistente. Verifique se o back-end está rodando na porta 3000.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetConversation = async () => {
    Alert.alert(
      'Resetar Conversa',
      'Deseja iniciar uma nova conversa? O histórico atual será perdido.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Resetar',
          style: 'destructive',
          onPress: async () => {
            try {
              await chatbotService.resetConversation();
              setConversationHistory([]);
              setMessages([
                {
                  id: Date.now().toString(),
                  text: `Olá${user ? `, ${user.username}` : ''}! Conversa reiniciada. Como posso ajudá-lo?`,
                  isUser: false,
                  timestamp: new Date(),
                },
              ]);
              // console.log('Conversa resetada');
            } catch (error) {
              // console.error('Erro ao resetar conversa:', error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f8f9fa' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 60}
    >
      <Styled.Header style={{ paddingTop: insets.top }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Styled.BackText>← Voltar</Styled.BackText>
        </TouchableOpacity>
        <Styled.HeaderTitle>Assistente Thetis</Styled.HeaderTitle>
        <TouchableOpacity onPress={resetConversation}>
          <Text style={{ color: '#1E88E5', fontSize: 14 }}>Resetar</Text>
        </TouchableOpacity>
      </Styled.Header>

      <Styled.MessagesContainer>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 20,
              paddingHorizontal: 16,
            }}
          >
            <Image
              source={require('../../images/chatbot/icon.png')}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1E88E5',
                textAlign: 'center',
                marginBottom: 5,
              }}
            >
              Assistente Thetis
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                textAlign: 'center',
                lineHeight: 20,
              }}
            >
              Seu assistente virtual para dúvidas sobre investimentos e a plataforma Thetis
            </Text>
          </View>

          {messages.map((message) => (
            <Styled.MessageWrapper key={message.id} isUser={message.isUser}>
              <Styled.MessageBubble
                isUser={message.isUser}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <Styled.MessageHeader>
                  {message.isUser ? (
                    <UserIcon size={16} color="#fff" />
                  ) : (
                    <Image
                      source={require('../../images/chatbot/icon.png')}
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                      }}
                      resizeMode="contain"
                    />
                  )}
                  <Styled.MessageTime isUser={message.isUser}>
                    {formatTime(message.timestamp)}
                  </Styled.MessageTime>
                </Styled.MessageHeader>
                <Styled.MessageText isUser={message.isUser}>{message.text}</Styled.MessageText>
              </Styled.MessageBubble>
            </Styled.MessageWrapper>
          ))}

          {isLoading && (
            <Styled.MessageWrapper isUser={false}>
              <Styled.MessageBubble
                isUser={false}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <Styled.LoadingContainer>
                  <ActivityIndicator size="small" color="#1E88E5" />
                  <Styled.LoadingText>Assistente digitando...</Styled.LoadingText>
                </Styled.LoadingContainer>
              </Styled.MessageBubble>
            </Styled.MessageWrapper>
          )}
        </ScrollView>
      </Styled.MessagesContainer>

      <Styled.InputContainer
        style={{
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 16,
        }}
      >
        <Styled.InputWrapper>
          <Styled.TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
            editable={!isLoading}
            textAlignVertical="top"
          />
          <TouchableOpacity onPress={sendMessage} disabled={!inputText.trim() || isLoading}>
            <Styled.SendButton disabled={!inputText.trim() || isLoading}>
              <PaperAirplaneIcon
                size={20}
                color={!inputText.trim() || isLoading ? '#ccc' : '#1E88E5'}
              />
            </Styled.SendButton>
          </TouchableOpacity>
        </Styled.InputWrapper>
      </Styled.InputContainer>
    </KeyboardAvoidingView>
  );
};

export default ChatBot;
