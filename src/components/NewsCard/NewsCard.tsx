import React from 'react';
import { TouchableOpacity, ImageSourcePropType } from 'react-native';
import { StyledNewsCard as Styled } from './styled';

interface NewsItem {
  id: string;
  symbol: string;
  company: string;
  companyCode: string;
  time: string;
  title: string;
  image: ImageSourcePropType;
  status: string;
}

interface NewsCardProps {
  news: NewsItem;
  onPress?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Styled.Container>
        <Styled.ImageBackground source={news.image}>
          <Styled.LogoContainer>
            <Styled.LogoText>{news.symbol.charAt(0)}</Styled.LogoText>
          </Styled.LogoContainer>
          
          <Styled.StatusBadge status={news.status.toLowerCase()}>
            <Styled.StatusText>{news.status}</Styled.StatusText>
          </Styled.StatusBadge>
        </Styled.ImageBackground>
        
        <Styled.InfoContainer>
          <Styled.CompanyInfo>
            <Styled.Symbol>{news.symbol}</Styled.Symbol>
            <Styled.Dot>•</Styled.Dot>
            <Styled.CompanyCode>{news.companyCode}</Styled.CompanyCode>
            <Styled.Dot>•</Styled.Dot>
            <Styled.Time>{news.time}</Styled.Time>
          </Styled.CompanyInfo>
          
          <Styled.Title numberOfLines={2}>{news.title}</Styled.Title>
        </Styled.InfoContainer>
      </Styled.Container>
    </TouchableOpacity>
  );
};

export default NewsCard;