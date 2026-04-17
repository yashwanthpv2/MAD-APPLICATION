// src/screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Radius } from '../constants/theme';
import { Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const tagOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 60 }),
        Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      Animated.timing(tagOpacity, { toValue: 1, duration: 400, useNativeDriver: true, delay: 200 }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ alignItems: 'center', transform: [{ scale }], opacity }}>
        <LinearGradient
          colors={['#ffffff', '#FFA500']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoBox}
        >
          <Image
            source={require('../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </LinearGradient>
        <Text style={styles.appName}>DayDue</Text>
      </Animated.View>
      <Animated.View style={{ opacity: tagOpacity, alignItems: 'center' }}>
        <Text style={styles.tagline}>We Remind. You Relax.</Text>
        <View style={styles.dotRow}>
          {[0, 1, 2].map(i => (
            <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
          ))}
        </View>
        <View style={styles.btnWrap}>
          <LinearGradient
            colors={['#FF8C00', '#FFA500']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.getStarted}
          >
            <Text
              style={styles.btnText}
              onPress={() => navigation.navigate('SignIn')}
            >
              Get Started →
            </Text>
          </LinearGradient>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  logoBox: {
    width: 96,
    height: 96,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoImage: { width: 90, height: 90 },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    color: Colors.textMuted,
    letterSpacing: 0.4,
    marginTop: 4,
  },
  dotRow: { flexDirection: 'row', gap: 6, marginTop: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#333' },
  dotActive: { width: 24, backgroundColor: Colors.orange },
  btnWrap: { marginTop: 32, width: 260 },
  getStarted: {
    borderRadius: Radius.lg,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnText: { color: Colors.black, fontSize: 16, fontWeight: '700' },
});

export default SplashScreen;
