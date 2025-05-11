import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { TabsStyled as Styled } from './styled';

interface TabBarProps {
  tabs?: string[];
  defaultActiveTab?: string;
  onTabChange?: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({
  tabs = ['Todos', 'Ações', 'Criptomoedas', 'Renda'],
  defaultActiveTab = 'Todos',
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <Styled.TabContainer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabs.map((tab) => (
          <Styled.TabButton
            key={tab}
            onPress={() => handleTabPress(tab)}
            active={activeTab === tab}
          >
            <Styled.TabText active={activeTab === tab}>{tab}</Styled.TabText>
          </Styled.TabButton>
        ))}
      </ScrollView>
    </Styled.TabContainer>
  );
};

export default TabBar;
