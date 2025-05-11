import React, { useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

interface InputProps {
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  icon: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  icon,
  value,
  onChangeText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = secureTextEntry;

  return (
    <InputWrapper isFocused={isFocused}>
      <InputIcon name={icon} />
      <StyledInput
        placeholder={placeholder}
        placeholderTextColor="#888"
        secureTextEntry={isPassword && !showPassword}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <InputIcon name={showPassword ? "eye-outline" : "eye-off-outline"} />
        </TouchableOpacity>
      )}
    </InputWrapper>
  );
};

const InputWrapper = styled.View<{ isFocused: boolean }>`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => (props.isFocused ? "#1E88E5" : "#E0E0E0")};
  margin-bottom: 15px;
`;

const InputIcon = styled(Ionicons)`
  font-size: 20px;
  color: #1e88e5;
  margin-right: 10px;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  padding: 10px 0;
  color: #333;
  font-size: 16px;
`;

export default Input;
