import styled from 'styled-components/native';

const TabContainer = styled.View`
  flex-direction: row;
  padding: 0 16px;
  margin-bottom: 16px;
  width: 100%;
`;

const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: 8px 16px;
  margin-right: 8px;
  border-radius: 20px;
  background-color: ${({ active }) => (active ? '#e6f2ff' : 'transparent')};
`;

const TabText = styled.Text<{ active: boolean }>`
  color: ${({ active }) => (active ? '#007aff' : '#888')};
  font-weight: ${({ active }) => (active ? '600' : '500')};
  font-size: 14px;
`;

export const TabsStyled = {
  TabContainer,
  TabButton,
  TabText,
};
