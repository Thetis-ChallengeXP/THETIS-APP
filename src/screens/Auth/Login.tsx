import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStyled as Styled } from './styled';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Styled.Container>
      <Styled.TopSection>
        <Styled.Logo source={require('../../images/thetis_logo.png')} />
        <Styled.WavyBottom />
      </Styled.TopSection>

      <Styled.ContentSection>
        <Styled.TabContainer>
          <Styled.TabButton active>
            <Styled.TabText active>Entrar</Styled.TabText>
          </Styled.TabButton>
          <Styled.TabButton onPress={() => navigation.navigate('Signup')}>
            <Styled.TabText>Cadastrar</Styled.TabText>
          </Styled.TabButton>
        </Styled.TabContainer>

        <Styled.InputContainer>
          <Styled.InputWrapper>
            <Styled.InputIcon name="mail-outline" />
            <Styled.StyledInput
              placeholder="usuario@gmail.com"
              placeholderTextColor="#888"
              keyboardType="email-address"
            />
          </Styled.InputWrapper>

          <Styled.InputWrapper>
            <Styled.InputIcon name="lock-closed-outline" />
            <Styled.StyledInput
              placeholder="Senha123"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Styled.InputIcon name={showPassword ? 'eye-outline' : 'eye-off-outline'} />
            </TouchableOpacity>
          </Styled.InputWrapper>
        </Styled.InputContainer>

        <Styled.ForgotPasswordContainer>
          <Text style={{ color: '#999', fontSize: 12 }}>Esqueceu a senha?</Text>
          <TouchableOpacity>
            <Text style={{ color: '#1E88E5', fontSize: 12, marginLeft: 5 }}>
              Recuperar a senha?
            </Text>
          </TouchableOpacity>
        </Styled.ForgotPasswordContainer>

        <Styled.LoginButton onPress={() => navigation.navigate('Home')}>
          <Styled.LoginButtonText>Entrar</Styled.LoginButtonText>
        </Styled.LoginButton>
      </Styled.ContentSection>
    </Styled.Container>
  );
};

export default Login;
