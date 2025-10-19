import React, { useState } from 'react';
import { TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStyled as Styled } from './styled';
import { userService } from '../../services/apiService';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  InvestorProfile: {
    userToken: string;
    userData?: any;
  };
  Home: undefined;
};

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

const Signup: React.FC<Props> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fieldErrors, setFieldErrors] = useState({
    username: '',
    email: '',
    phone: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatPhone = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 2) return `(${cleaned}`;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const formatCPF = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length <= 9)
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  };

  const handleSignup = async () => {
    const errors: typeof fieldErrors = {
      username: '',
      email: '',
      phone: '',
      cpf: '',
      password: '',
      confirmPassword: '',
    };
    let hasError = false;

    if (!username.trim()) {
      errors.username = 'Nome de usuário é obrigatório.';
      hasError = true;
    }
    if (!email.trim()) {
      errors.email = 'Email é obrigatório.';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email inválido.';
      hasError = true;
    }

    const cleanedPhone = phone.replace(/\D/g, '');
    if (!cleanedPhone) {
      errors.phone = 'Telefone é obrigatório.';
      hasError = true;
    } else if (cleanedPhone.length < 10) {
      errors.phone = 'Telefone inválido.';
      hasError = true;
    }

    const cleanedCpf = cpf.replace(/\D/g, '');
    if (!cleanedCpf) {
      errors.cpf = 'CPF é obrigatório.';
      hasError = true;
    } else if (cleanedCpf.length !== 11) {
      errors.cpf = 'CPF inválido.';
      hasError = true;
    }

    if (!password) {
      errors.password = 'Senha é obrigatória.';
      hasError = true;
    } else if (password.length < 6) {
      errors.password = 'A senha deve ter pelo menos 6 caracteres.';
      hasError = true;
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirmação de senha é obrigatória.';
      hasError = true;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem.';
      hasError = true;
    }

    setFieldErrors(errors);
    if (hasError) return;

    setLoading(true);
    setError(null);

    try {
      const response = await userService.register({
        username,
        email,
        phone: cleanedPhone,
        cpf: cleanedCpf,
        password,
      });

      // console.log('=== REGISTER SUCCESS ===');
      // console.log('Token recebido:', response.token);
      // console.log('Usuário:', response.user);

      // Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!');

      setTimeout(() => {
        navigation.replace('InvestorProfile', {
          userToken: response.token,
          userData: response.user,
        });
      }, 100);
    } catch (err: any) {
      // console.log('Erro no cadastro:', err);
      setError(err.message || 'Erro ao cadastrar usuário');
      // Alert.alert('Erro', err.message || 'Erro ao cadastrar usuário');
    } finally {
      setLoading(false);
    }
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

      <Styled.ContentSection
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Styled.TabContainer>
          <Styled.TabButton onPress={() => navigation.navigate('Login')}>
            <Styled.TabText>Entrar</Styled.TabText>
          </Styled.TabButton>
          <Styled.TabButton active>
            <Styled.TabText active>Cadastrar</Styled.TabText>
          </Styled.TabButton>
        </Styled.TabContainer>

        <Styled.InputContainer>
          <Styled.InputWrapper>
            <Styled.InputIcon name="person-outline" />
            <Styled.StyledInput
              placeholder="Nome de usuário"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setFieldErrors({ ...fieldErrors, username: '' });
              }}
            />
          </Styled.InputWrapper>
          {fieldErrors.username && <Styled.ErrorText>{fieldErrors.username}</Styled.ErrorText>}

          <Styled.InputWrapper>
            <Styled.InputIcon name="mail-outline" />
            <Styled.StyledInput
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setFieldErrors({ ...fieldErrors, email: '' });
              }}
              autoCapitalize="none"
            />
          </Styled.InputWrapper>
          {fieldErrors.email && <Styled.ErrorText>{fieldErrors.email}</Styled.ErrorText>}

          <Styled.InputWrapper>
            <Styled.InputIcon name="call-outline" />
            <Styled.StyledInput
              placeholder="Telefone"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(text) => {
                setPhone(formatPhone(text));
                setFieldErrors({ ...fieldErrors, phone: '' });
              }}
            />
          </Styled.InputWrapper>
          {fieldErrors.phone && <Styled.ErrorText>{fieldErrors.phone}</Styled.ErrorText>}

          <Styled.InputWrapper>
            <Styled.InputIcon name="person-outline" />
            <Styled.StyledInput
              placeholder="CPF"
              keyboardType="numeric"
              value={cpf}
              onChangeText={(text) => {
                setCpf(formatCPF(text));
                setFieldErrors({ ...fieldErrors, cpf: '' });
              }}
            />
          </Styled.InputWrapper>
          {fieldErrors.cpf && <Styled.ErrorText>{fieldErrors.cpf}</Styled.ErrorText>}

          <Styled.InputWrapper>
            <Styled.InputIcon name="lock-closed-outline" />
            <Styled.StyledInput
              placeholder="Senha"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setFieldErrors({ ...fieldErrors, password: '' });
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Styled.InputIcon name={showPassword ? 'eye-outline' : 'eye-off-outline'} />
            </TouchableOpacity>
          </Styled.InputWrapper>
          {fieldErrors.password && <Styled.ErrorText>{fieldErrors.password}</Styled.ErrorText>}

          <Styled.InputWrapper>
            <Styled.InputIcon name="lock-closed-outline" />
            <Styled.StyledInput
              placeholder="Confirmar senha"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setFieldErrors({ ...fieldErrors, confirmPassword: '' });
              }}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Styled.InputIcon name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} />
            </TouchableOpacity>
          </Styled.InputWrapper>
          {fieldErrors.confirmPassword && (
            <Styled.ErrorText>{fieldErrors.confirmPassword}</Styled.ErrorText>
          )}
        </Styled.InputContainer>

        <Styled.LoginButton onPress={handleSignup} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Styled.LoginButtonText>Cadastrar</Styled.LoginButtonText>
          )}
        </Styled.LoginButton>
      </Styled.ContentSection>
    </Styled.Container>
  );
};

export default Signup;
