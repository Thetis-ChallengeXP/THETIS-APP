import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NewspaperStyled as Styled } from './styled';
import { Feather } from '@expo/vector-icons';
import NewsCard from '../../components/NewsCard/NewsCard';
import NewsList from '../../components/NewList/NewList';
import { featuredNews, newsList } from '../../utils/newsData';
import TabBar from '../../components/TabBar/TabBar';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Newspaper: undefined;
};

type NewspaperScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Newspaper'>;

interface Props {
  navigation: NewspaperScreenNavigationProp;
}

const SectionHeader = ({
  title,
  onSeeMorePress,
}: {
  title: string;
  onSeeMorePress?: () => void;
}) => (
  <Styled.SectionHeaderContainer>
    <Styled.SectionTitle>{title}</Styled.SectionTitle>
    <TouchableOpacity onPress={onSeeMorePress}>
      <Styled.SeeMoreText>Ver mais</Styled.SeeMoreText>
    </TouchableOpacity>
  </Styled.SectionHeaderContainer>
);

const Newspaper: React.FC<Props> = ({ navigation }) => {
  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Header>
          <Styled.SearchContainer>
            <Feather name="search" size={20} color="#999" />
            <Styled.SearchPlaceholder>Procurar...</Styled.SearchPlaceholder>
          </Styled.SearchContainer>
          <TouchableOpacity>
            <Feather name="bell" size={22} color="#000" />
          </TouchableOpacity>
        </Styled.Header>

        <TabBar />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <SectionHeader
            title="Mais relevantes"
            onSeeMorePress={() => console.log('Ver mais relevantes')}
          />
          <Styled.FeaturedContainer>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 16, paddingRight: 8, paddingBottom: 8 }}
            >
              {featuredNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </ScrollView>
          </Styled.FeaturedContainer>

          <SectionHeader title="Todos" onSeeMorePress={() => console.log('Ver mais todos')} />
          <Styled.NewsListContainer>
            <NewsList news={newsList} />
          </Styled.NewsListContainer>
        </ScrollView>
      </Styled.Content>
    </Styled.Container>
  );
};

export default Newspaper;
