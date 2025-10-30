import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const Splash: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.elastic(1.2),
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Login');
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim, rotateAnim]);

  return (
    <Container>
      <AnimatedLogo
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          tintColor: 'white',
        }}
        source={require('../../images/thetis_logo.png')}
        resizeMode="contain"
      />
      <AnimatedTitle
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        THETIS
      </AnimatedTitle>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #1e88e5;
  align-items: center;
  justify-content: center;
`;

const AnimatedLogo = styled(Animated.Image)`
  width: 160px;
  height: 160px;
`;

const AnimatedTitle = styled(Animated.Text)`
  color: white;
  font-size: 36px;
  font-weight: bold;
  margin-top: 12px;
  letter-spacing: 2px;
`;

export default Splash;
