import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import styled from 'styled-components/native';

const LoadingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin: 10px 0;
`;

const LoadingText = styled.Text`
  margin-left: 12px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

interface RecommendationsLoadingProps {
  message?: string;
}

export const RecommendationsLoading: React.FC<RecommendationsLoadingProps> = ({
  message = 'Carregando suas recomendações personalizadas...',
}) => {
  return (
    <LoadingContainer>
      <ActivityIndicator size="small" color="#1E88E5" />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
};

const ErrorContainer = styled.View`
  padding: 20px;
  background-color: #ffebee;
  border-radius: 12px;
  margin: 10px 0;
  border-left-width: 4px;
  border-left-color: #f44336;
`;

const ErrorText = styled.Text`
  color: #c62828;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const RetryText = styled.Text`
  color: #1976d2;
  font-size: 12px;
  text-decoration: underline;
`;

interface RecommendationsErrorProps {
  error: string;
  onRetry?: () => void;
}

export const RecommendationsError: React.FC<RecommendationsErrorProps> = ({ error, onRetry }) => {
  return (
    <ErrorContainer>
      <ErrorText>Erro ao carregar recomendações</ErrorText>
      <Text style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>{error}</Text>
      {onRetry && <RetryText onPress={onRetry}>Tentar novamente</RetryText>}
    </ErrorContainer>
  );
};
