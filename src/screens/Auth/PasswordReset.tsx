import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Alert, ActivityIndicator, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStyled as Styled } from './styled';
import { userService } from '../../services/apiService';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  PasswordReset: undefined;
};

type PasswordResetScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PasswordReset'>;

interface Props {
  navigation: PasswordResetScreenNavigationProp;
}

const PasswordReset: React.FC<Props> = ({ navigation }) => {
  const [step, setStep] = useState<'request' | 'confirm'>('request');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    setLoading(true);
    try {
      await userService.requestPasswordReset({ email });
      Alert.alert(
        'Email enviado!',
        'Verifique sua caixa de entrada e insira o código de recuperação.',
        [{ text: 'OK', onPress: () => setStep('confirm') }]
      );
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async () => {
    if (!token.trim() || !newPassword || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await userService.confirmPasswordReset({ token, newPassword });
      Alert.alert(
        'Senha alterada!',
        'Sua senha foi alterada com sucesso. Você pode fazer login agora.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderRequestStep = () => (
    <>
      <Styled.InputContainer>
        <Styled.InputWrapper>
          <Styled.InputIcon name="mail-outline" />
          <Styled.StyledInput
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </Styled.InputWrapper>
      </Styled.InputContainer>

      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ color: '#666', fontSize: 14, textAlign: 'center', marginBottom: 20 }}>
          Digite seu email para receber um código de recuperação de senha
        </Text>
      </View>

      <Styled.LoginButton onPress={handleRequestReset} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Styled.LoginButtonText>Enviar código</Styled.LoginButtonText>
        )}
      </Styled.LoginButton>
    </>
  );

  const renderConfirmStep = () => (
    <>
      <Styled.InputContainer>
        <Styled.InputWrapper>
          <Styled.InputIcon name="key-outline" />
          <Styled.StyledInput
            placeholder="Código de recuperação"
            placeholderTextColor="#888"
            value={token}
            onChangeText={setToken}
            autoCapitalize="none"
          />
        </Styled.InputWrapper>

        <Styled.InputWrapper>
          <Styled.InputIcon name="lock-closed-outline" />
          <Styled.StyledInput
            placeholder="Nova senha"
            placeholderTextColor="#888"
            secureTextEntry={!showPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Styled.InputIcon name={showPassword ? 'eye-outline' : 'eye-off-outline'} />
          </TouchableOpacity>
        </Styled.InputWrapper>

        <Styled.InputWrapper>
          <Styled.InputIcon name="lock-closed-outline" />
          <Styled.StyledInput
            placeholder="Confirmar nova senha"
            placeholderTextColor="#888"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Styled.InputIcon name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} />
          </TouchableOpacity>
        </Styled.InputWrapper>
      </Styled.InputContainer>

      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ color: '#666', fontSize: 14, textAlign: 'center', marginBottom: 20 }}>
          Digite o código enviado para seu email e sua nova senha
        </Text>
      </View>

      <Styled.LoginButton onPress={handleConfirmReset} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Styled.LoginButtonText>Alterar senha</Styled.LoginButtonText>
        )}
      </Styled.LoginButton>

      <TouchableOpacity
        onPress={() => setStep('request')}
        style={{ marginTop: 15, alignItems: 'center' }}
      >
        <Text style={{ color: '#1E88E5', fontSize: 14 }}>Não recebeu o código? Reenviar</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <Styled.Container>
      <Styled.TopSection>
        <Styled.Logo source={require('../../images/thetis_logo.png')} />
        <Styled.WavyBottom />
      </Styled.TopSection>

      <Styled.ContentSection>
        <Styled.TabContainer>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}></TouchableOpacity>
          <Styled.TabButton active>
            <Styled.TabText active>Recuperar Senha</Styled.TabText>
          </Styled.TabButton>
        </Styled.TabContainer>

        {step === 'request' ? renderRequestStep() : renderConfirmStep()}

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{ marginTop: 30, alignItems: 'center' }}
        >
          <Text style={{ color: '#999', fontSize: 14 }}>
            Lembrou da senha? <Text style={{ color: '#1E88E5' }}>Fazer login</Text>
          </Text>
        </TouchableOpacity>
      </Styled.ContentSection>
    </Styled.Container>
  );
};

export default PasswordReset;
