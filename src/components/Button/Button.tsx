import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  text: string;
  onPress?: () => void;
  color: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onPress, color,  textColor = "#fff" }) => (
  <TouchableOpacity
    style={{
      backgroundColor: color,
      padding: 15,
      borderRadius: 40,
      alignItems: "center",
      marginBottom: 15,
    }}
    onPress={onPress}
  >
    <Text style={{ color: textColor, fontWeight: "bold", fontSize: 16 }}>
      {text}
    </Text>
  </TouchableOpacity>
);

export { Button };
