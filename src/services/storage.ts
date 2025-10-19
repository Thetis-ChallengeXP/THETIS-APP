import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
}

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

const STORAGE_KEYS = {
  USERS: '@thetis_users',
  CURRENT_USER: '@thetis_current_user',
};

const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

const isValidCPF = (cpf: string): boolean => {
  const cleanCpf = cpf.replace(/\D/g, '');
  return cleanCpf.length === 11;
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const storageService = {
  register: async (userData: CreateUserRequest): Promise<UserResponse> => {
    try {
      // console.log('[STORAGE] Iniciando registro de usuário:', {
      //   username: userData.username,
      //   email: userData.email,
      //   phone: userData.phone,
      //   cpf: userData.cpf,
      //   hasPassword: !!userData.password,
      // });

      if (!userData.username?.trim()) {
        throw new Error('Nome de usuário é obrigatório');
      }

      if (!userData.email?.trim()) {
        throw new Error('Email é obrigatório');
      }

      if (!isValidEmail(userData.email)) {
        throw new Error('Email inválido');
      }

      if (!userData.phone?.trim()) {
        throw new Error('Telefone é obrigatório');
      }

      if (!userData.cpf?.trim()) {
        throw new Error('CPF é obrigatório');
      }

      if (!isValidCPF(userData.cpf)) {
        throw new Error('CPF inválido');
      }

      if (!userData.password) {
        throw new Error('Senha é obrigatória');
      }

      if (userData.password.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }

      const existingUsersJson = await AsyncStorage.getItem(STORAGE_KEYS.USERS);

      const existingUsers: User[] = existingUsersJson ? JSON.parse(existingUsersJson) : [];

      const userExists = existingUsers.find(
        (user) =>
          user.email.toLowerCase() === userData.email.toLowerCase() ||
          user.username.toLowerCase() === userData.username.toLowerCase()
      );

      if (userExists) {
        if (userExists.email.toLowerCase() === userData.email.toLowerCase()) {
          throw new Error('Este email já está cadastrado');
        }
        if (userExists.username.toLowerCase() === userData.username.toLowerCase()) {
          throw new Error('Este nome de usuário já está em uso');
        }
      }

      const cpfExists = existingUsers.find((user) => user.cpf === userData.cpf);
      if (cpfExists) {
        throw new Error('Este CPF já está cadastrado');
      }

      const newUser: User = {
        id: generateId(),
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        cpf: userData.cpf,
        password: userData.password,
      };

      const updatedUsers = [...existingUsers, newUser];
      await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));

      const userResponse: UserResponse = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        cpf: newUser.cpf,
      };

      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userResponse));

      const savedCurrentUser = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);

      return userResponse;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao cadastrar usuário');
    }
  },

  login: async (credentials: LoginRequest): Promise<UserResponse> => {
    try {
      // console.log('[STORAGE] Iniciando login:', {
      //   usernameOrEmail: credentials.usernameOrEmail,
      //   hasPassword: !!credentials.password,
      // });

      if (!credentials.usernameOrEmail?.trim()) {
        throw new Error('Email ou nome de usuário é obrigatório');
      }

      if (!credentials.password) {
        throw new Error('Senha é obrigatória');
      }

      const existingUsersJson = await AsyncStorage.getItem(STORAGE_KEYS.USERS);

      const existingUsers: User[] = existingUsersJson ? JSON.parse(existingUsersJson) : [];

      const user = existingUsers.find(
        (u) =>
          u.email.toLowerCase() === credentials.usernameOrEmail.toLowerCase() ||
          u.username.toLowerCase() === credentials.usernameOrEmail.toLowerCase()
      );

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      if (user.password !== credentials.password) {
        throw new Error('Senha incorreta');
      }

      const userResponse: UserResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        cpf: user.cpf,
      };

      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userResponse));

      const savedCurrentUser = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);

      return userResponse;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer login');
    }
  },

  getCurrentUser: async (): Promise<UserResponse | null> => {
    try {
      const currentUserJson = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);

      const user = currentUserJson ? JSON.parse(currentUserJson) : null;

      return user;
    } catch (error) {
      return null;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);

      const check = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    } catch (error) {
      throw new Error('Erro ao fazer logout');
    }
  },

  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.USERS, STORAGE_KEYS.CURRENT_USER]);
    } catch (error) {
      throw new Error('Erro ao limpar dados');
    }
  },

  getAllUsers: async (): Promise<User[]> => {
    try {
      const usersJson = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
      const users = usersJson ? JSON.parse(usersJson) : [];
      return users;
    } catch (error) {
      return [];
    }
  },

  requestPasswordReset: async (email: string): Promise<void> => {
    try {
      const existingUsersJson = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
      const existingUsers: User[] = existingUsersJson ? JSON.parse(existingUsersJson) : [];

      const user = existingUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        throw new Error('Email não encontrado');
      }

      return Promise.resolve();
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao solicitar redefinição de senha');
    }
  },
};
