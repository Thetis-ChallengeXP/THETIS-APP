import styled from 'styled-components/native';

const ContentSection = styled.ScrollView`
  flex: 1;
  padding: 20px;
  margin-top: 20px;
  background-color: #fff;
`;

const ContainerButtons = styled.ScrollView`
  flex: 1;
  padding: 20px;
  margin-top: 20px;
  background-color: #fff;
`;

const HeaderContainer = styled.View`
  margin-bottom: 30px;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #1e88e5;
  margin-bottom: 8px;
  text-align: center;
`;

const HeaderSubtitle = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
  padding: 0 20px;
`;

const SectionContainer = styled.View`
  margin-bottom: 30px;
  flex: 1;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 25px;
  padding-left: 5px;
  text-align: center;
`;

const QuestionContainer = styled.View`
  margin-bottom: 25px;
`;

const QuestionText = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
  font-weight: 500;
`;

const OptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const OptionButton = styled.TouchableOpacity<{ selected?: boolean }>`
  background-color: ${(props) => (props.selected ? '#1e88e5' : '#f5f5f5')};
  border-radius: 20px;
  padding: 10px 16px;
  margin: 2px;
  border: 1px solid ${(props) => (props.selected ? '#1e88e5' : '#e0e0e0')};
  min-height: 40px;
  justify-content: center;
`;

const OptionText = styled.Text<{ selected?: boolean }>`
  color: ${(props) => (props.selected ? '#fff' : '#333')};
  font-weight: ${(props) => (props.selected ? '600' : 'normal')};
  font-size: 14px;
  text-align: center;
`;

const NextButton = styled.TouchableOpacity`
  background-color: #1e88e5;
  border-radius: 25px;
  padding: 15px 5px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  min-height: 50px;
`;

const NextButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const SkipButton = styled.TouchableOpacity`
  position: relative;
  align-items: center;
  padding-bottom: 25px;
`;

const SkipText = styled.Text`
  color: #888;
  font-size: 16px;
  text-decoration: underline;
`;

const ProgressContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0 30px 0;
  padding: 0 20px;
`;

const ProgressStep = styled.View<{ active?: boolean; completed?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.completed ? '#4caf50' : props.active ? '#1e88e5' : '#e0e0e0'};
  align-items: center;
  justify-content: center;
`;

const ProgressStepText = styled.Text<{ active?: boolean; completed?: boolean }>`
  color: ${(props) => (props.completed || props.active ? '#fff' : '#666')};
  font-weight: bold;
  font-size: 16px;
`;

const ProgressLine = styled.View<{ completed?: boolean }>`
  width: 60px;
  height: 3px;
  background-color: ${(props) => (props.completed ? '#4caf50' : '#e0e0e0')};
  margin: 0 10px;
  border-radius: 2px;
`;

const NavigationContainer = styled.View`
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  padding: 0 5px;
  gap: 15px;
`;

const SecondaryButton = styled.TouchableOpacity`
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  padding: 15px 30px;
  flex: 0.35;
  align-items: center;
  justify-content: center;
  min-height: 50px;
`;

const SecondaryButtonText = styled.Text`
  color: #666;
  font-size: 16px;
  font-weight: 600;
`;

const StepIndicator = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const StepIndicatorText = styled.Text`
  color: #888;
  font-size: 14px;
  font-weight: 500;
`;

export const ProfileStyled = {
  ContentSection,
  ContainerButtons,
  HeaderContainer,
  HeaderTitle,
  HeaderSubtitle,
  SectionContainer,
  SectionTitle,
  QuestionContainer,
  QuestionText,
  OptionsContainer,
  OptionButton,
  OptionText,
  NextButton,
  NextButtonText,
  SkipButton,
  SkipText,
  ProgressContainer,
  ProgressStep,
  ProgressStepText,
  ProgressLine,
  NavigationContainer,
  SecondaryButton,
  SecondaryButtonText,
  StepIndicator,
  StepIndicatorText,
};
