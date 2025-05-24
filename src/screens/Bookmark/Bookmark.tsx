import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BookmarkStyled as Styled } from './styled';
import { MagnifyingGlassIcon, BellIcon } from 'react-native-heroicons/outline';
import { ArrowUpRightIcon } from 'react-native-heroicons/solid';
import BookmarkItem from '../../components/BookmarkItem/BookmarkItem';
import { bookmarkItems } from '../../utils/bookmarksData';
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
  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Header>
          <Styled.SearchContainer>
            <MagnifyingGlassIcon color="#999" size={20} />
            <Styled.SearchPlaceholder>Procurar...</Styled.SearchPlaceholder>
          </Styled.SearchContainer>
          <TouchableOpacity>
            <BellIcon color="#000" size={24} />
          </TouchableOpacity>
        </Styled.Header>

        <TabBar />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <SectionHeader title="Geral" onSeeMorePress={() => 'Ver mais geral'} />

          <SectionHeader title="Todos" onSeeMorePress={() => 'Ver mais todos'} />
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
