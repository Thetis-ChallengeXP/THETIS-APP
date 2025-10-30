import React, { useState } from 'react';
import { Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStyled as Styled } from '../../styled';
import { ProfileStyled } from '../styled';
import { profileService, InvestorProfileRequest } from '../../../../services/apiProfileInvestor';

type RootStackParamList = {
  Signup: undefined;
  InvestorProfileStep1: undefined;
  InvestorProfileStep2: undefined;
  InvestorProfileStep3: undefined;
  Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'InvestorProfileStep3'>;

interface ProfileData {
  mainGoals: string[];
  timeHorizon: string;
  riskTolerance: string;
  liquidityPreference: string;
  trackingFrequency: string;
  educationInterest: string;
}

interface FullProfileData {
  ageRange: string;
  monthlyIncome: string;
  workSituation: string;
  investmentPercentage: string;
  emergencyReserve: string;
  experience: string;
  usedProducts: string[];
  informationSource: string;
  techComfort: string;
}

interface Props {
  navigation: NavigationProp;
  profileData: ProfileData;
  fullProfileData: FullProfileData;
  updateProfileData: (field: keyof ProfileData, value: any) => void;
  token: string;
}

const InvestorProfileStep3: React.FC<Props> = ({
  navigation,
  profileData,
  fullProfileData,
  updateProfileData,
  token,
}) => {
  const [loading, setLoading] = useState(false);

  const validateStep = () => {
    return profileData.mainGoals.length > 0 && profileData.timeHorizon && profileData.riskTolerance;
  };

  const handlePrevious = () => {
    navigation.navigate('InvestorProfileStep2');
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);

    const completeProfileData: InvestorProfileRequest = {
      demographic: {
        ageRange: fullProfileData.ageRange,
        monthlyIncome: fullProfileData.monthlyIncome,
        workSituation: fullProfileData.workSituation,
        investmentPercentage: fullProfileData.investmentPercentage,
        emergencyReserve: fullProfileData.emergencyReserve,
      },
      experience: {
        experience: fullProfileData.experience,
        usedProducts: fullProfileData.usedProducts,
        informationSource: fullProfileData.informationSource,
        techComfort: fullProfileData.techComfort,
      },
      goals: {
        mainGoals: profileData.mainGoals,
        timeHorizon: profileData.timeHorizon,
        riskTolerance: profileData.riskTolerance,
        liquidityPreference: profileData.liquidityPreference,
      },
      preferences: {
        trackingFrequency: profileData.trackingFrequency,
        educationInterest: profileData.educationInterest,
      },
    };

    try {
      await profileService.createInvestorProfile(completeProfileData, token);
      Alert.alert(
        'Sucesso!',
        'Perfil configurado com sucesso! Agora você terá recomendações personalizadas.'
      );

      setTimeout(() => {
        navigation.replace('Login');
      }, 1000);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao criar perfil.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMultiSelect = (value: string) => {
    const currentArray = profileData.mainGoals;
    if (currentArray.includes(value)) {
      updateProfileData(
        'mainGoals',
        currentArray.filter((item) => item !== value)
      );
    } else {
      updateProfileData('mainGoals', [...currentArray, value]);
    }
  };

  const renderProgressBar = () => (
    <ProfileStyled.ProgressContainer>
      <ProfileStyled.ProgressStep completed>
        <ProfileStyled.ProgressStepText completed>1</ProfileStyled.ProgressStepText>
      </ProfileStyled.ProgressStep>
      <ProfileStyled.ProgressLine completed />
      <ProfileStyled.ProgressStep completed>
        <ProfileStyled.ProgressStepText completed>2</ProfileStyled.ProgressStepText>
      </ProfileStyled.ProgressStep>
      <ProfileStyled.ProgressLine completed />
      <ProfileStyled.ProgressStep active>
        <ProfileStyled.ProgressStepText active>3</ProfileStyled.ProgressStepText>
      </ProfileStyled.ProgressStep>
    </ProfileStyled.ProgressContainer>
  );

  return (
    <Styled.Container>
      <Styled.ContentSection
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ProfileStyled.HeaderContainer>
          <ProfileStyled.HeaderTitle>Objetivos</ProfileStyled.HeaderTitle>
          <ProfileStyled.HeaderSubtitle>
            Quais são seus objetivos e preferências?
          </ProfileStyled.HeaderSubtitle>
        </ProfileStyled.HeaderContainer>

        {renderProgressBar()}

        <ProfileStyled.SectionContainer>
          <ProfileStyled.SectionTitle>🎯 Objetivos e Preferências</ProfileStyled.SectionTitle>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>
              Principais objetivos? (múltipla escolha)
            </ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {[
                'Reserva de emergência',
                'Aposentadoria',
                'Compra de imóvel',
                'Renda extra',
                'Educação dos filhos',
                'Viagem',
                'Outros',
              ].map((goal) => (
                <ProfileStyled.OptionButton
                  key={goal}
                  selected={profileData.mainGoals.includes(goal)}
                  onPress={() => toggleMultiSelect(goal)}
                >
                  <ProfileStyled.OptionText selected={profileData.mainGoals.includes(goal)}>
                    {goal}
                  </ProfileStyled.OptionText>
                </ProfileStyled.OptionButton>
              ))}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>Horizonte temporal?</ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {['Curto prazo (até 2 anos)', 'Médio prazo (2-5 anos)', 'Longo prazo (5+ anos)'].map(
                (horizon) => (
                  <ProfileStyled.OptionButton
                    key={horizon}
                    selected={profileData.timeHorizon === horizon}
                    onPress={() => updateProfileData('timeHorizon', horizon)}
                  >
                    <ProfileStyled.OptionText selected={profileData.timeHorizon === horizon}>
                      {horizon}
                    </ProfileStyled.OptionText>
                  </ProfileStyled.OptionButton>
                )
              )}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>Perfil de risco?</ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {['Conservador', 'Moderado', 'Arriscado'].map((risk) => (
                <ProfileStyled.OptionButton
                  key={risk}
                  selected={profileData.riskTolerance === risk}
                  onPress={() => updateProfileData('riskTolerance', risk)}
                >
                  <ProfileStyled.OptionText selected={profileData.riskTolerance === risk}>
                    {risk}
                  </ProfileStyled.OptionText>
                </ProfileStyled.OptionButton>
              ))}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>Preferência de liquidez?</ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {[
                'Preciso de acesso rápido',
                'Posso deixar aplicado por um tempo',
                'Não preciso de liquidez',
              ].map((liquidity) => (
                <ProfileStyled.OptionButton
                  key={liquidity}
                  selected={profileData.liquidityPreference === liquidity}
                  onPress={() => updateProfileData('liquidityPreference', liquidity)}
                >
                  <ProfileStyled.OptionText
                    selected={profileData.liquidityPreference === liquidity}
                  >
                    {liquidity}
                  </ProfileStyled.OptionText>
                </ProfileStyled.OptionButton>
              ))}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>Frequência de acompanhamento?</ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {['Diariamente', 'Semanalmente', 'Mensalmente', 'Apenas quando necessário'].map(
                (freq) => (
                  <ProfileStyled.OptionButton
                    key={freq}
                    selected={profileData.trackingFrequency === freq}
                    onPress={() => updateProfileData('trackingFrequency', freq)}
                  >
                    <ProfileStyled.OptionText selected={profileData.trackingFrequency === freq}>
                      {freq}
                    </ProfileStyled.OptionText>
                  </ProfileStyled.OptionButton>
                )
              )}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>
              Interesse em educação financeira?
            </ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {[
                'Sim, tenho muito interesse',
                'Sim, tenho pouco interesse',
                'Não tenho interesse',
              ].map((education) => (
                <ProfileStyled.OptionButton
                  key={education}
                  selected={profileData.educationInterest === education}
                  onPress={() => updateProfileData('educationInterest', education)}
                >
                  <ProfileStyled.OptionText selected={profileData.educationInterest === education}>
                    {education}
                  </ProfileStyled.OptionText>
                </ProfileStyled.OptionButton>
              ))}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.NavigationContainer>
            <ProfileStyled.SecondaryButton onPress={handlePrevious}>
              <ProfileStyled.SecondaryButtonText>Voltar</ProfileStyled.SecondaryButtonText>
            </ProfileStyled.SecondaryButton>

            <ProfileStyled.NextButton
              onPress={handleSubmit}
              disabled={!validateStep() || loading}
              style={{ opacity: validateStep() ? 1 : 0.5, width: '100%' }}
            >
              {loading ? (
                <ProfileStyled.NextButtonText>Carregando...</ProfileStyled.NextButtonText>
              ) : (
                <ProfileStyled.NextButtonText>Finalizar Perfil</ProfileStyled.NextButtonText>
              )}
            </ProfileStyled.NextButton>
          </ProfileStyled.NavigationContainer>
        </ProfileStyled.SectionContainer>
      </Styled.ContentSection>
    </Styled.Container>
  );
};

export default InvestorProfileStep3;
