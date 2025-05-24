import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { ProfileStyled as Styled } from './styled';
import { useAuth } from '../../contexts/AuthContext';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Settings: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const Profile: React.FC<Props> = ({ navigation }) => {
  const userData = {
    name: useAuth().user?.username,
    email: useAuth().user?.email,
    phone: useAuth().user?.phone,
    profilePicture: null,
  };

  const { logout } = useAuth();

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
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: '#007AFF',
              borderRadius: 15,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Feather
              name="camera"
              size={16}
              color="${({ theme }) => theme.colors.backgroundWhite};FFF"
            />
          </TouchableOpacity>
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

          <Styled.InfoItem>
            <Feather name="phone" mask="99 99999-9999" size={20} color="#007AFF" />
            <Styled.InfoValue>{userData.phone}</Styled.InfoValue>
          </Styled.InfoItem>
        </Styled.InfoContainer>
      </Styled.Content>

      <Styled.BottomButtons>
        <Styled.EditButton onPress={() => 'Edit profile'}>
          <Feather
            name="edit"
            size={20}
            color="${({ theme }) => theme.colors.backgroundWhite};FFF"
          />
          <Text
            style={{ color: '${({ theme }) => theme.colors.backgroundWhite};FFF', marginLeft: 10 }}
          >
            Editar perfil
          </Text>
        </Styled.EditButton>

        <Styled.LogoutButton
          onPress={() => {
            logout();
            navigation.navigate('Login');
          }}
        >
          <Feather name="log-out" size={20} color="#FF3B30" />
          <Text style={{ color: '#FF3B30', marginLeft: 10 }}>Sair</Text>
        </Styled.LogoutButton>
      </Styled.BottomButtons>
    </Styled.Container>
  );
};

export default Profile;
