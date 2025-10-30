import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyledNewsList as Styled } from './styled';
import { Feather } from '@expo/vector-icons';

interface NewsItem {
  id: string;
  title: string;
  company: string;
  symbol: string;
  companyCode: string;
  time: string;
}

interface NewsListProps {
  news: NewsItem[];
  onNewsPress?: (newsId: string) => void;
}

const NewsList: React.FC<NewsListProps> = ({ news, onNewsPress }) => {
  return (
    <>
      {news.map((item) => (
        <TouchableOpacity key={item.id} onPress={() => onNewsPress && onNewsPress(item.id)}>
          <Styled.NewsItem>
            <Styled.NewsContent>
              <Styled.NewsTitle numberOfLines={2}>{item.title}</Styled.NewsTitle>

              <Styled.CompanyInfo>
                <Styled.Company>{item.company}</Styled.Company>
                <Styled.CompanyDetails>
                  {item.symbol} • {item.companyCode} • {item.time}
                </Styled.CompanyDetails>
              </Styled.CompanyInfo>
            </Styled.NewsContent>

            <Styled.ArrowContainer>
              <Feather name="chevron-right" size={20} color="#007AFF" />
            </Styled.ArrowContainer>
          </Styled.NewsItem>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default NewsList;
