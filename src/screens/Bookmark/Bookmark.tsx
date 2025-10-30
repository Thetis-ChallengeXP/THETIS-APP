import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { BookmarkStyled as Styled } from './styled';
import { Feather } from '@expo/vector-icons';
import BookmarkItem from '../../components/BookmarkItem/BookmarkItem';
import StockList from '../../components/StockList/StockList';
import { bookmarkItems } from '../../utils/bookmarksData';
import { useSavedStocks } from '../../contexts/SavedStocksContext';
import TabBar from '../../components/TabBar/TabBar';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Bookmark: undefined;
};

type BookmarkScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Bookmark'>;

interface Props {
  navigation: BookmarkScreenNavigationProp;
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

const Bookmark: React.FC<Props> = ({ navigation }) => {
  const { savedStocks } = useSavedStocks();

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
            title="Ativos salvos"
            onSeeMorePress={() => console.log('Ver mais ativos salvos')}
          />

          {savedStocks.length > 0 ? (
            <View style={{ marginBottom: 20 }}>
              <StockList stocks={savedStocks} showStatus={false} />
            </View>
          ) : (
            <Styled.EmptyStateContainer>
              <Styled.EmptyStateText>
                Nenhum ativo salvo ainda.{'\n'}
                Toque no ícone de bookmark para salvar ações!
              </Styled.EmptyStateText>
            </Styled.EmptyStateContainer>
          )}

          <SectionHeader
            title="Notícias salvas"
            onSeeMorePress={() => console.log('Ver mais notícias')}
          />
          <Styled.BookmarkListContainer>
            {bookmarkItems.map((item) => (
              <BookmarkItem key={item.id} item={item} />
            ))}
          </Styled.BookmarkListContainer>
        </ScrollView>
      </Styled.Content>
    </Styled.Container>
  );
};

export default Bookmark;
