import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStyled as Styled } from './styled';
import { authStorage } from '../../services/apiService';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  PasswordReset: undefined;
  ChatBot: undefined;
  Home: undefined;
  StockDetail: {
    stock: {
      id: string;
      symbol: string;
      name: string;
      price: string;
      change?: string;
      status?: string;
      trend: 'up' | 'down';
    };
  };
  Settings: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

interface UserData {
  userId: string;
  username: string;
  email: string;
}

const Profile: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await authStorage.getUser();
      setUser(storedUser);
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await authStorage.clearUser();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (!user) {
    return <Text>Carregando...</Text>;
  }

  const userData = {
    name: user.username,
    email: user.email,
    phone: '',
    profilePicture: null,
  };

  return (
    <Styled.Container>
      <Styled.Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Styled.HeaderTitle>Perfil</Styled.HeaderTitle>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Feather name="settings" size={24} color="#007AFF" />
        </TouchableOpacity>
      </Styled.Header>

      <Styled.Content>
        <Styled.ProfileImageContainer>
          {userData.profilePicture ? (
            <Image
              source={{ uri: userData.profilePicture }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
          ) : (
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: '#E0E0E0',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Feather name="user" size={60} color="#BDBDBD" />
            </View>
          )}
        </Styled.ProfileImageContainer>

        <Styled.NameText>{userData.name}</Styled.NameText>

        <Styled.InfoContainer>
          <Styled.InfoLabel>Informações pessoais</Styled.InfoLabel>

          <Styled.InfoItem>
            <Feather name="user" size={20} color="#007AFF" />
            <Styled.InfoValue>{userData.name}</Styled.InfoValue>
          </Styled.InfoItem>

          <Styled.InfoItem>
            <Feather name="mail" size={20} color="#007AFF" />
            <Styled.InfoValue>{userData.email}</Styled.InfoValue>
          </Styled.InfoItem>
        </Styled.InfoContainer>
      </Styled.Content>

      <Styled.BottomButtons>
        <Styled.EditButton onPress={() => console.log('Editar perfil')}>
          <Feather name="edit" size={20} color="#FFF" />
          <Text style={{ color: '#FFF', marginLeft: 10 }}>Editar perfil</Text>
        </Styled.EditButton>

        <Styled.LogoutButton onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#FF3B30" />
          <Text style={{ color: '#FF3B30', marginLeft: 10 }}>Sair</Text>
        </Styled.LogoutButton>
      </Styled.BottomButtons>
    </Styled.Container>
  );
};

export default Profile;
