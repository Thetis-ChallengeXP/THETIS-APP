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
      <Styled.Container
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Styled.ImageBackground source={news.image}>
          <Styled.OverlayContainer>
            <Styled.LogoContainer>
              <Styled.LogoText>{news.symbol.charAt(0)}</Styled.LogoText>
            </Styled.LogoContainer>

            <Styled.StatusBadge status={news.status.toLowerCase()}>
              <Styled.StatusText>{news.status}</Styled.StatusText>
            </Styled.StatusBadge>
          </Styled.OverlayContainer>
        </Styled.ImageBackground>

        <Styled.InfoContainer>
          <Styled.CompanyInfo>
            <Styled.Symbol>{news.symbol}</Styled.Symbol>
            <Styled.Dot>•</Styled.Dot>
            <Styled.CompanyCode>{news.companyCode}</Styled.CompanyCode>
            <Styled.Dot>•</Styled.Dot>
            <Styled.Time>{news.time}</Styled.Time>
          </Styled.CompanyInfo>

          <Styled.Title numberOfLines={3}>{news.title}</Styled.Title>
        </Styled.InfoContainer>
      </Styled.Container>
    </TouchableOpacity>
  );
};

export default NewsCard;
