import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../routes';
import { Alert } from 'react-native';

import InvestorProfileStep1 from './InvestorProfileStep1';
import InvestorProfileStep2 from './InvestorProfileStep2';
import InvestorProfileStep3 from './InvestorProfileStep3';

export type InvestorProfileStackParamList = {
  InvestorProfileStep1: undefined;
  InvestorProfileStep2: undefined;
  InvestorProfileStep3: undefined;
};

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
  mainGoals: string[];
  timeHorizon: string;
  riskTolerance: string;
  liquidityPreference: string;
  trackingFrequency: string;
  educationInterest: string;
}

const Stack = createStackNavigator<InvestorProfileStackParamList>();
type Props = StackScreenProps<RootStackParamList, 'InvestorProfile'>;

const InvestorProfileController: React.FC<Props> = ({ navigation: externalNavigation, route }) => {
  const [profileData, setProfileData] = useState<FullProfileData>({
    ageRange: '',
    monthlyIncome: '',
    workSituation: '',
    investmentPercentage: '',
    emergencyReserve: '',
    experience: '',
    usedProducts: [],
    informationSource: '',
    techComfort: '',
    mainGoals: [],
    timeHorizon: '',
    riskTolerance: '',
    liquidityPreference: '',
    trackingFrequency: '',
    educationInterest: '',
  });

  const userToken = route?.params?.userToken;
  const userData = route?.params?.userData;

  useEffect(() => {
    // console.log('=== INVESTOR PROFILE CONTROLLER ===');
    // console.log('Route params completos:', route?.params);
    // console.log('Token recebido no controller:', userToken);
    // console.log('Token tipo:', typeof userToken);
    // console.log('Token está vazio?', !userToken || userToken.trim() === '');
    // console.log('Token tamanho:', userToken?.length);
    // console.log('User data:', userData);

    if (!userToken) {
      // console.log('TOKEN NÃO ENCONTRADO NO CONTROLLER!');
      Alert.alert('Erro', 'Token de autenticação não encontrado. Faça login novamente.', [
        { text: 'OK', onPress: () => externalNavigation.navigate('Login') },
      ]);
    }
  }, [userToken, userData, route]);

  const updateProfileData = (field: keyof FullProfileData, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  if (!userToken) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName="InvestorProfileStep1" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InvestorProfileStep1">
        {({ navigation }) => (
          <InvestorProfileStep1
            navigation={{
              ...navigation,
              navigate: (screen: string) => {
                if (screen === 'Login') {
                  externalNavigation.navigate('Login');
                } else {
                  navigation.navigate(screen as keyof InvestorProfileStackParamList);
                }
              },
            }}
            profileData={{
              ageRange: profileData.ageRange,
              monthlyIncome: profileData.monthlyIncome,
              workSituation: profileData.workSituation,
              investmentPercentage: profileData.investmentPercentage,
              emergencyReserve: profileData.emergencyReserve,
            }}
            updateProfileData={updateProfileData}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="InvestorProfileStep2">
        {({ navigation }) => (
          <InvestorProfileStep2
            navigation={{
              ...navigation,
              navigate: (screen: string) => {
                if (screen === 'Login') {
                  externalNavigation.navigate('Login');
                } else {
                  navigation.navigate(screen as keyof InvestorProfileStackParamList);
                }
              },
            }}
            profileData={{
              experience: profileData.experience,
              usedProducts: profileData.usedProducts,
              informationSource: profileData.informationSource,
              techComfort: profileData.techComfort,
            }}
            updateProfileData={updateProfileData}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="InvestorProfileStep3">
        {({ navigation }) => (
          <InvestorProfileStep3
            navigation={{
              ...navigation,
              navigate: (screen: string) => {
                if (screen === 'Login') {
                  externalNavigation.navigate('Login');
                } else {
                  navigation.navigate(screen as keyof InvestorProfileStackParamList);
                }
              },
            }}
            profileData={{
              mainGoals: profileData.mainGoals,
              timeHorizon: profileData.timeHorizon,
              riskTolerance: profileData.riskTolerance,
              liquidityPreference: profileData.liquidityPreference,
              trackingFrequency: profileData.trackingFrequency,
              educationInterest: profileData.educationInterest,
            }}
            fullProfileData={profileData}
            updateProfileData={updateProfileData}
            token={userToken}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default InvestorProfileController;
