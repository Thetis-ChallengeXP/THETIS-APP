import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CreateUserRequest {
  username: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  phone: string;
  cpf: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

export interface ChatMessageRequest {
  message: string;
}

export interface ChatMessageResponse {
  message: string;
  success: boolean;
}

export const userService = {
  register: async (userData: CreateUserRequest): Promise<UserResponse> => {
    try {
      const response = await api.post('/users', userData);
      //console.log('data', response.data);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        //console.log('Erro ao cadastrar usuário', error.response);
        throw new Error(error.response.data.message || 'Erro ao cadastrar usuário');
      } else if (error.request) {
        //console.log('Sem resposta do servidor. Verifique sua conexão.');
        throw new Error('Sem resposta do servidor. Verifique sua conexão.');
      } else {
        //console.log('Erro ao fazer requisição');
        throw new Error('Erro ao fazer requisição');
      }
    }
  },

  login: async (credentials: LoginRequest): Promise<UserResponse> => {
    try {
      const response = await api.post('/users/login', credentials);
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

  requestPasswordReset: async (data: PasswordResetRequest): Promise<void> => {
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

  confirmPasswordReset: async (data: PasswordResetConfirm): Promise<void> => {
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

export const chatbotService = {
  sendMessage: async (message: string): Promise<ChatMessageResponse> => {
    try {
      const response = await api.post('/chatbot/message', { message });
      //console.log('data', response.data);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Erro ao enviar mensagem');
      } else if (error.request) {
        throw new Error('Sem resposta do servidor. Verifique sua conexão.');
      } else {
        throw new Error('Erro ao fazer requisição');
      }
    }
  },
};
