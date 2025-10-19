import { BASE_URL_PROFILE_INVESTOR } from '@env';
import axios from 'axios';

export interface InvestorProfileRequest {
  demographic: {
    ageRange: string;
    monthlyIncome: string;
    workSituation: string;
    investmentPercentage: string;
    emergencyReserve: string;
  };
  experience: {
    experience: string;
    usedProducts: string[];
    informationSource: string;
    techComfort: string;
  };
  goals: {
    mainGoals: string[];
    timeHorizon: string;
    riskTolerance: string;
    liquidityPreference: string;
  };
  preferences: {
    trackingFrequency: string;
    educationInterest: string;
  };
}

export const profileService = {
  createInvestorProfile: async (data: InvestorProfileRequest, token: string) => {
    // console.log('=== PROFILE SERVICE ===');
    // console.log('URL completa:', `${BASE_URL_PROFILE_INVESTOR}/investor`);
    // console.log('Token recebido:', token);
    // console.log('Token tipo:', typeof token);
    // console.log('Token vazio?', !token || token.trim() === '');
    // console.log('Token tamanho:', token?.length);
    // console.log('Token primeiros 50 chars:', token?.substring(0, 50));
    // console.log('Data sendo enviada:', JSON.stringify(data, null, 2));

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // console.log('Headers que serão enviados:', headers);
    // console.log('Authorization header completo:', headers.Authorization);

    try {
      // console.log('Fazendo requisição POST para:', `${BASE_URL_PROFILE_INVESTOR}/investor`);

      const response = await axios.post(`${BASE_URL_PROFILE_INVESTOR}/investor`, data, { headers });

      // console.log('Resposta bem-sucedida:');
      // console.log('Status:', response.status);
      // console.log('Data:', response.data);
      // console.log('Headers da resposta:', response.headers);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          error.response.data?.message ||
            `Erro ${error.response.status}: ${error.response.statusText}`
        );
      } else if (error.request) {
        throw new Error('Sem resposta do servidor. Verifique sua conexão.');
      } else {
        throw new Error('Erro ao fazer requisição: ' + error.message);
      }
    }
  },
};
