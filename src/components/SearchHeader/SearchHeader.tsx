import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SectionHeaderContainer, SectionTitle, SeeMoreText } from './styled';

interface SectionHeaderProps {
  title: string;
  onSeeMorePress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onSeeMorePress }) => (
  <SectionHeaderContainer>
    <SectionTitle>{title}</SectionTitle>
    <TouchableOpacity onPress={onSeeMorePress}>
      <SeeMoreText>Ver mais</SeeMoreText>
    </TouchableOpacity>
  </SectionHeaderContainer>
);

export default SectionHeader;
