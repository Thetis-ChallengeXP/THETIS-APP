export interface StockAnalysis {
  recomendacao: string;
  confianca: string;
  motivo: string;
  preco_alvo?: number;
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
  userId: string;
  username: string;
  email: string;
  phone: string;
  cpf: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: UserResponse;
}

export interface RegisterResponse {
  message: string;
  token: string;
  user: UserResponse;
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

export interface StockRecommendation {
  symbol: string;
  current_price: number;
  score: number;
  analysis: StockAnalysis;
}

export interface TopStock {
  symbol: string;
  current_price: number;
  price_change_24h: number;
  price_change_7d: number;
  volume_trend: number;
  score: number;
  analysis: StockAnalysis;
}

export interface InvestorProfile {
  demographic: {
    ageRange: string;
    emergencyReserve: string;
    workSituation: string;
    monthlyIncome: string;
    investmentPercentage: string;
  };
  experience: {
    usedProducts: string[];
    techComfort: string;
    experience: string;
    informationSource: string;
  };
  goals: {
    mainGoals: string[];
    timeHorizon: string;
    liquidityPreference: string;
    riskTolerance: string;
  };
  preferences: {
    trackingFrequency: string;
    educationInterest: string;
  };
  userId: string;
}

export interface AWSRecommendationsResponse {
  timestamp: string;
  top_recommendations: StockRecommendation[];
}

export interface AWSTopStocksResponse {
  timestamp: string;
  top_stocks: TopStock[];
}

export interface ChatMessageRequest {
  message: string;
  conversationHistory?: Array<{
    role: 'user' | 'model';
    parts: Array<{ text: string }>;
  }>;
}

export interface ChatMessageResponse {
  success: boolean;
  message: string;
  timestamp: string;
}
