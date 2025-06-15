import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStyled as Styled } from './styled';
import { useAuth } from '../../contexts/AuthContextStorage';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  PasswordReset: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading, error, user, clearError } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.replace('Home');
    }
  }, [user, navigation]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error, clearError]);

  const handleLogin = async () => {
    if (!usernameOrEmail.trim() || !password) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    try {
      await login({ usernameOrEmail, password });
    } catch (err) {}
  };

  return (
    <Styled.Container>
      <Styled.TopSection>
        <Styled.Logo
          source={require('../../images/thetis_logo.png')}
          style={{ tintColor: 'white' }}
        />
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
              placeholder="Email ou nome de usuário"
              placeholderTextColor="#888"
              keyboardType="email-address"
              value={usernameOrEmail}
              onChangeText={setUsernameOrEmail}
              autoCapitalize="none"
            />
          </Styled.InputWrapper>

          <Styled.InputWrapper>
            <Styled.InputIcon name="lock-closed-outline" />
            <Styled.StyledInput
              placeholder="Senha"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Styled.InputIcon name={showPassword ? 'eye-outline' : 'eye-off-outline'} />
            </TouchableOpacity>
          </Styled.InputWrapper>
        </Styled.InputContainer>

        <Styled.ForgotPasswordContainer>
          <Text style={{ color: '#999', fontSize: 12 }}>Esqueceu a senha?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
            <Text style={{ color: '#1E88E5', fontSize: 12, marginLeft: 5 }}>Recuperar a senha</Text>
          </TouchableOpacity>
        </Styled.ForgotPasswordContainer>

        {error && (
          <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>{error}</Text>
        )}

        <Styled.LoginButton onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Styled.LoginButtonText>Entrar</Styled.LoginButtonText>
          )}
        </Styled.LoginButton>

        {/*test 
        <Styled.LoginButton onPress={() => navigation.navigate('Home')}>
          <Styled.LoginButtonText>Entrar</Styled.LoginButtonText>
        </Styled.LoginButton> */}
      </Styled.ContentSection>
    </Styled.Container>
  );
};

export default Login;
