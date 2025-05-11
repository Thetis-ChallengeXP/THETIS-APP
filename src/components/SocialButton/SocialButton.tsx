import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface SocialButtonProps {
  platform: string;
  color: string;
  icon: any;
}

const SocialButton: React.FC<SocialButtonProps> = ({ platform, color, icon }) => (
  <TouchableOpacity
    style={{
      backgroundColor: color,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 15,
    }}
  >
    <FontAwesome
      name={icon}
      size={20}
      color="${({ theme }) => theme.colors.backgroundWhite};"
      style={{ marginRight: 10 }}
    />
    <Text
      style={{
        color: '${({ theme }) => theme.colors.backgroundWhite};',
        fontWeight: 'bold',
        fontSize: 16,
      }}
    >
      {platform}
    </Text>
  </TouchableOpacity>
);

export { SocialButton };
