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

type NavigationProp = StackNavigationProp<RootStackParamList, 'InvestorProfileStep2'>;

interface ProfileData {
  experience: string;
  usedProducts: string[];
  informationSource: string;
  techComfort: string;
}

interface Props {
  navigation: NavigationProp;
  profileData: ProfileData;
  updateProfileData: (field: keyof ProfileData, value: any) => void;
}

const InvestorProfileStep2: React.FC<Props> = ({ navigation, profileData, updateProfileData }) => {
  const validateStep = () => {
    return profileData.experience;
  };

  const handleNext = () => {
    if (validateStep()) {
      navigation.navigate('InvestorProfileStep3');
    }
  };

  const handlePrevious = () => {
    navigation.navigate('InvestorProfileStep1');
  };

  const toggleMultiSelect = (value: string) => {
    const currentArray = profileData.usedProducts;
    if (currentArray.includes(value)) {
      updateProfileData(
        'usedProducts',
        currentArray.filter((item) => item !== value)
      );
    } else {
      updateProfileData('usedProducts', [...currentArray, value]);
    }
  };

  const renderProgressBar = () => (
    <ProfileStyled.ProgressContainer>
      <ProfileStyled.ProgressStep completed={true}>
        <ProfileStyled.ProgressStepText completed={true}>1</ProfileStyled.ProgressStepText>
      </ProfileStyled.ProgressStep>
      <ProfileStyled.ProgressLine completed={true} />
      <ProfileStyled.ProgressStep active={true}>
        <ProfileStyled.ProgressStepText active={true}>2</ProfileStyled.ProgressStepText>
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
          <ProfileStyled.HeaderTitle>Experiência</ProfileStyled.HeaderTitle>
          <ProfileStyled.HeaderSubtitle>
            Conte-nos sobre sua experiência com investimentos
          </ProfileStyled.HeaderSubtitle>
        </ProfileStyled.HeaderContainer>

        {renderProgressBar()}

        <ProfileStyled.SectionContainer>
          <ProfileStyled.SectionTitle>🎓 Conhecimento e Experiência</ProfileStyled.SectionTitle>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>Seu nível de experiência?</ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {['Iniciante', 'Intermediário', 'Avançado'].map((level) => (
                <ProfileStyled.OptionButton
                  key={level}
                  selected={profileData.experience === level}
                  onPress={() => updateProfileData('experience', level)}
                >
                  <ProfileStyled.OptionText selected={profileData.experience === level}>
                    {level}
                  </ProfileStyled.OptionText>
                </ProfileStyled.OptionButton>
              ))}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>
              Produtos já utilizados? (múltipla escolha)
            </ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {[
                'Poupança',
                'CDB',
                'Fundos de Investimento',
                'Ações',
                'Títulos Públicos',
                'Criptomoedas',
                'Outros',
              ].map((product) => (
                <ProfileStyled.OptionButton
                  key={product}
                  selected={profileData.usedProducts.includes(product)}
                  onPress={() => toggleMultiSelect(product)}
                >
                  <ProfileStyled.OptionText selected={profileData.usedProducts.includes(product)}>
                    {product}
                  </ProfileStyled.OptionText>
                </ProfileStyled.OptionButton>
              ))}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>
              De onde obtém informações sobre investimentos?
            </ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {[
                'YouTube',
                'Cursos online',
                'Assessor de investimentos',
                'Autodidata',
                'Livros',
                'Outros',
              ].map((source) => (
                <ProfileStyled.OptionButton
                  key={source}
                  selected={profileData.informationSource === source}
                  onPress={() => updateProfileData('informationSource', source)}
                >
                  <ProfileStyled.OptionText selected={profileData.informationSource === source}>
                    {source}
                  </ProfileStyled.OptionText>
                </ProfileStyled.OptionButton>
              ))}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.QuestionContainer>
            <ProfileStyled.QuestionText>Conforto com tecnologia (1-5)?</ProfileStyled.QuestionText>
            <ProfileStyled.OptionsContainer>
              {['1 - Muito baixo', '2 - Baixo', '3 - Médio', '4 - Alto', '5 - Muito alto'].map(
                (comfort) => (
                  <ProfileStyled.OptionButton
                    key={comfort}
                    selected={profileData.techComfort === comfort}
                    onPress={() => updateProfileData('techComfort', comfort)}
                  >
                    <ProfileStyled.OptionText selected={profileData.techComfort === comfort}>
                      {comfort}
                    </ProfileStyled.OptionText>
                  </ProfileStyled.OptionButton>
                )
              )}
            </ProfileStyled.OptionsContainer>
          </ProfileStyled.QuestionContainer>

          <ProfileStyled.NavigationContainer>
            <ProfileStyled.SecondaryButton onPress={handlePrevious}>
              <ProfileStyled.SecondaryButtonText>Voltar</ProfileStyled.SecondaryButtonText>
            </ProfileStyled.SecondaryButton>

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

export default InvestorProfileStep2;
