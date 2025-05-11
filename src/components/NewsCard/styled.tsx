import styled from 'styled-components/native';

const Container = styled.View`
  width: 280px;
  height: 180px;
  border-radius: 12px;
  margin-right: 12px;
  overflow: hidden;
  background-color: #fff;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 120px;
  justify-content: space-between;
  padding: 12px;
  flex-direction: row;
`;

const LogoContainer = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const StatusBadge = styled.View<{ status: string }>`
  background-color: ${({ status }) =>
    status === 'positivo' ? '#d0f0d0' : status === 'negativo' ? '#ffcdd2' : '#e0e0e0'};
  padding: 4px 8px;
  border-radius: 8px;
  align-self: flex-start;
`;

const StatusText = styled.Text`
  color: #333;
  font-size: 12px;
  font-weight: 500;
`;

const InfoContainer = styled.View`
  padding: 8px 12px;
`;

const CompanyInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const Symbol = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #333;
`;

const CompanyCode = styled.Text`
  font-size: 12px;
  color: #666;
`;

const Dot = styled.Text`
  font-size: 12px;
  color: #999;
  margin: 0 4px;
`;

const Time = styled.Text`
  font-size: 12px;
  color: #999;
`;

const Title = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  line-height: 18px;
`;

export const StyledNewsCard = {
  Container,
  ImageBackground,
  LogoContainer,
  LogoText,
  StatusBadge,
  StatusText,
  InfoContainer,
  CompanyInfo,
  Symbol,
  CompanyCode,
  Dot,
  Time,
  Title,
};
