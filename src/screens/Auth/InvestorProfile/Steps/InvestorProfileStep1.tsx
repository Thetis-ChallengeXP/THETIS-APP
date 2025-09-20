import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStyled as Styled } from '../../styled';
import { ProfileStyled } from '../styled';

type RootStackParamList = {
  Signup: undefined;
  InvestorProfileStep1: undefined;
  InvestorProfileStep2: undefined;
  InvestorProfileStep3: undefined;
  Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'InvestorProfileStep1'>;

interface ProfileData {
  ageRange: string;
  monthlyIncome: string;
  workSituation: string;
  investmentPercentage: string;
  emergencyReserve: string;
}

interface Props {
  navigation: NavigationProp;
  profileData: ProfileData;
  updateProfileData: (field: keyof ProfileData, value: string) => void;
}

const InvestorProfileStep1: React.FC<Props> = ({ navigation, profileData, updateProfileData }) => {
  const validateStep = () => {
    return profileData.ageRange && profileData.monthlyIncome && profileData.workSituation;
  };

  const handleNext = () => {
    if (validateStep()) {
      navigation.navigate('InvestorProfileStep2');
    }
  };

  const renderProgressBar = () => (
    <ProfileStyled.ProgressContainer>
      <ProfileStyled.ProgressStep active={true}>
        <ProfileStyled.ProgressStepText active={true}>1</ProfileStyled.ProgressStepText>
      </ProfileStyled.ProgressStep>
      <ProfileStyled.ProgressLine />
      <ProfileStyled.ProgressStep>
        <ProfileStyled.ProgressStepText>2</ProfileStyled.ProgressStepText>
      </ProfileStyled.ProgressStep>
      <ProfileStyled.ProgressLine />
      <ProfileStyled.ProgressStep>
        <ProfileStyled.ProgressStepText>3</ProfileStyled.ProgressStepText>
      </ProfileStyled.ProgressStep>
    </ProfileStyled.ProgressContainer>
  );

  return (
    <Styled.Container>
      <Styled.ContentSection
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ProfileStyled.HeaderContainer>
          <ProfileStyled.HeaderTitle>Perfil Financeiro</ProfileStyled.HeaderTitle>
          <ProfileStyled.HeaderSubtitle>
            Vamos conhecer sua situação financeira atual
          </ProfileStyled.HeaderSubtitle>
        </ProfileStyled.HeaderContainer>

        {renderProgressBar()}

        <ProfileStyled.SectionContainer>
          <ProfileStyled.SectionTitle>📊 Informações Básicas</ProfileStyled.SectionTitle>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>Qual sua faixa etária?</ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {['18-25', '26-35', '36-45', '46-60', '60+'].map((range) => (
                <ProfileStyled.OptionButton
                  key={range}
                  selected={profileData.ageRange === range}
                  onPress={() => updateProfileData('ageRange', range)}
                >
                  <ProfileStyled.OptionText selected={profileData.ageRange === range}>
                    {range} anos
                  </ProfileStyled.OptionText>
                </ProfileStyled.OptionButton>
              ))}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>Renda mensal aproximada?</ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {[
                'Até R$ 2.000',
                'R$ 2.001 - R$ 5.000',
                'R$ 5.001 - R$ 10.000',
                'R$ 10.001 - R$ 20.000',
                'Acima de R$ 20.000',
              ].map((income) => (
                <ProfileStyled.OptionButton
                  key={income}
                  selected={profileData.monthlyIncome === income}
                  onPress={() => updateProfileData('monthlyIncome', income)}
                >
                  <ProfileStyled.OptionText selected={profileData.monthlyIncome === income}>
                    {income}
                  </ProfileStyled.OptionText>
                </ProfileStyled.OptionButton>
              ))}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>Situação profissional?</ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {['CLT', 'PJ', 'Autônomo', 'Empresário', 'Aposentado', 'Estudante'].map(
                (situation) => (
                  <ProfileStyled.OptionButton
                    key={situation}
                    selected={profileData.workSituation === situation}
                    onPress={() => updateProfileData('workSituation', situation)}
                  >
                    <ProfileStyled.OptionText selected={profileData.workSituation === situation}>
                      {situation}
                    </ProfileStyled.OptionText>
                  </ProfileStyled.OptionButton>
                )
              )}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>
              Quanto da renda investe mensalmente?
            </ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {['0-10%', '10-30%', 'Acima de 30%'].map((percentage) => (
                <ProfileStyled.OptionButton
                  key={percentage}
                  selected={profileData.investmentPercentage === percentage}
                  onPress={() => updateProfileData('investmentPercentage', percentage)}
                >
                  <ProfileStyled.OptionText
                    selected={profileData.investmentPercentage === percentage}
                  >
                    {percentage}
                  </ProfileStyled.OptionText>
                </ProfileStyled.OptionButton>
              ))}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>Reserva de emergência?</ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {['Não tenho', 'Parcial (1-3 meses)', 'Completa (6+ meses)'].map((reserve) => (
                <ProfileStyled.OptionButton
                  key={reserve}
                  selected={profileData.emergencyReserve === reserve}
                  onPress={() => updateProfileData('emergencyReserve', reserve)}
                >
                  <ProfileStyled.OptionText selected={profileData.emergencyReserve === reserve}>
                    {reserve}
                  </ProfileStyled.OptionText>
                </ProfileStyled.OptionButton>
              ))}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.NavigationContainer>
            <ProfileStyled.NextButton
              onPress={handleNext}
              disabled={!validateStep()}
              style={{
                opacity: validateStep() ? 1 : 0.5,
                width: '100%',
              }}
            >
              <ProfileStyled.NextButtonText>Próximo</ProfileStyled.NextButtonText>
            </ProfileStyled.NextButton>
          </ProfileStyled.NavigationContainer>
          <ProfileStyled.SkipButton onPress={() => navigation.navigate('Login')}>
            <ProfileStyled.SkipText>Pular por agora</ProfileStyled.SkipText>
          </ProfileStyled.SkipButton>
        </ProfileStyled.SectionContainer>
      </Styled.ContentSection>
    </Styled.Container>
  );
};

export default InvestorProfileStep1;
