import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components/native";
import Input from "../../components/Input/Input";
import { Ionicons } from "@expo/vector-icons";
import { AuthStyled as Styled } from "./styled";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Signup"
>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

const Signup: React.FC<Props> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Styled.Container>
      <Styled.TopSection>
        <Styled.Logo source={require("../../images/thetis_logo.png")} />
        <Styled.WavyBottom />
      </Styled.TopSection>

      <Styled.ContentSection>
        <Styled.TabContainer>
          <Styled.TabButton onPress={() => navigation.navigate("Login")}>
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
              placeholder="Usuario novo"
              placeholderTextColor="#888"
            />
          </Styled.InputWrapper>

          <Styled.InputWrapper>
            <Styled.InputIcon name="mail-outline" />
            <Styled.StyledInput
              placeholder="usuario@gmail.com"
              placeholderTextColor="#888"
              keyboardType="email-address"
            />
          </Styled.InputWrapper>

          <Styled.InputWrapper>
            <Styled.InputIcon name="call-outline" />
            <Styled.StyledInput
              placeholder="(11) 1234-5678"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
            />
          </Styled.InputWrapper>

          <Styled.InputWrapper>
            <Styled.InputIcon name="person-outline" />
            <Styled.StyledInput
              placeholder="123.456.789-99"
              placeholderTextColor="#888"
              keyboardType="numeric"
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
              <Styled.InputIcon
                name={showPassword ? "eye-outline" : "eye-off-outline"}
              />
            </TouchableOpacity>
          </Styled.InputWrapper>

          <Styled.InputWrapper>
            <Styled.InputIcon name="lock-closed-outline" />
            <Styled.StyledInput
              placeholder="Senha123"
              placeholderTextColor="#888"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Styled.InputIcon
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
              />
            </TouchableOpacity>
          </Styled.InputWrapper>
        </Styled.InputContainer>

        <Styled.LoginButton onPress={() => navigation.navigate("Home")}>
          <Styled.LoginButtonText>Entrar</Styled.LoginButtonText>
        </Styled.LoginButton>
      </Styled.ContentSection>
    </Styled.Container>
  );
};

export default Signup;
