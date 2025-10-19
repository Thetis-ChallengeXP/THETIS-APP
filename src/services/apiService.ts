import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, AUTH_URL, CHATBOT_URL, AWS_RECOMMENDATIONS_URL, AWS_TOP_STOCKS_URL } from '@env';

import {
  ChatMessageRequest,
  ChatMessageResponse,
  CreateUserRequest,
  LoginRequest,
  LoginResponse,
  RegisterResponse,
  StockRecommendation,
  TopStock,
  UserResponse,
} from './types';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const chatbotApi = axios.create({
  baseURL: CHATBOT_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

const authApi = axios.create({
  baseURL: AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const USER_KEY = 'user_data';

export const authStorage = {
  setUser: async (user: { userId: string; username: string; email: string }) => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Erro ao salvar usuário:', e);
    }
  },
  getUser: async () => {
    try {
      const data = await AsyncStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Erro ao pegar usuário:', e);
      return null;
    }
  },
  clearUser: async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error('Erro ao limpar usuário:', e);
    }
  },
};

export const userService = {
  register: async (userData: CreateUserRequest): Promise<RegisterResponse> => {
    try {
      const response = await authApi.post('/register', userData);
      // console.log('Resposta do cadastro completa:', response.data);

      const { user } = response.data;
      await authStorage.setUser(user);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Erro ao cadastrar usuário');
      } else if (error.request) {
        throw new Error('Sem resposta do servidor. Verifique sua conexão.');
      } else {
        throw new Error('Erro ao fazer requisição');
      }
    }
  },

  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await authApi.post('/login', credentials);
      // console.log('Resposta do login completa:', response.data);

      const { user } = response.data;
      await authStorage.setUser(user);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Credenciais inválidas');
      } else if (error.request) {
        throw new Error('Sem resposta do servidor. Verifique sua conexão.');
      } else {
        throw new Error('Erro ao fazer requisição');
      }
    }
  },

  requestPasswordReset: async (data: { email: string }): Promise<void> => {
    try {
      await api.post('/users/reset/request', data);
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Erro ao solicitar redefinição de senha');
      } else if (error.request) {
        throw new Error('Sem resposta do servidor. Verifique sua conexão.');
      } else {
        throw new Error('Erro ao fazer requisição');
      }
    }
  },

  confirmPasswordReset: async (data: { token: string; newPassword: string }): Promise<void> => {
    try {
      await api.post('/users/reset/confirm', data);
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Erro ao redefinir senha');
      } else if (error.request) {
        throw new Error('Sem resposta do servidor. Verifique sua conexão.');
      } else {
        throw new Error('Erro ao fazer requisição');
      }
    }
  },
};

export const recommendationsService = {
  getRecommendations: async (): Promise<StockRecommendation[]> => {
    try {
      const user = await authStorage.getUser();
      if (!user?.userId) {
        throw new Error('Usuário não autenticado');
      }

      // console.log('Fazendo requisição para AWS Recomendações com userId:', user.userId);

      const response = await axios.get(`${AWS_RECOMMENDATIONS_URL}?userId=${user.userId}`);

      // console.log('Resposta completa da AWS (recomendações):', response.data);

      if (response.data && response.data.top_recommendations) {
        // console.log('Recomendações encontradas:', response.data.top_recommendations.length);
        return response.data.top_recommendations;
      }

      throw new Error('Formato de resposta da AWS inválido');
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || `Erro HTTP: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('Sem resposta do servidor AWS. Verifique sua conexão.');
      } else {
        throw new Error(error.message || 'Erro ao fazer requisição para AWS');
      }
    }
  },

  getTopStocks: async (): Promise<TopStock[]> => {
    try {
      // console.log('Fazendo requisição para AWS Top Stocks...');

      const response = await axios.get(AWS_TOP_STOCKS_URL);

      // console.log('Resposta completa da AWS (top stocks):', response.data);

      if (response.data?.top_stocks) {
        return response.data.top_stocks;
      } else if (response.data?.top_recommendations) {
        return response.data.top_recommendations;
      } else if (Array.isArray(response.data)) {
        return response.data;
      }

      throw new Error('Formato de resposta da AWS inválido');
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || `Erro HTTP: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('Sem resposta do servidor AWS. Verifique sua conexão.');
      } else {
        throw new Error(error.message || 'Erro ao fazer requisição para AWS');
      }
    }
  },
};

export const chatbotService = {
  sendMessage: async (
    message: string,
    conversationHistory?: Array<{
      role: 'user' | 'model';
      parts: Array<{ text: string }>;
    }>
  ): Promise<ChatMessageResponse> => {
    try {
      // console.log('Enviando mensagem para o chatbot:', message);

      const requestData: ChatMessageRequest = {
        message,
        conversationHistory: conversationHistory || [],
      };

      const response = await chatbotApi.post('/message', requestData);

      // console.log('Resposta do chatbot recebida:', response.data);

      return response.data;
    } catch (error: any) {
      console.error('Erro no chatbot:', error);

      if (error.response) {
        const errorMessage =
          error.response.data?.details || error.response.data?.error || 'Erro ao enviar mensagem';
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('Sem resposta do servidor. Verifique sua conexão.');
      } else {
        throw new Error('Erro ao fazer requisição');
      }
    }
  },

  checkHealth: async (): Promise<boolean> => {
    try {
      const response = await chatbotApi.get('/health');
      return response.data.success;
    } catch (error) {
      console.error('Chatbot indisponível:', error);
      return false;
    }
  },

  resetConversation: async (): Promise<void> => {
    try {
      await chatbotApi.post('/reset');
    } catch (error) {
      console.error('Erro ao resetar conversa:', error);
    }
  },
};

export { StockRecommendation, TopStock, CreateUserRequest, LoginRequest, UserResponse };
