// src/screens/auth/SignInScreen.js
import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/authSlice';
import { authService } from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Colors, Spacing, Radius } from '../../constants/theme';

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(s => s.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!email.includes('@')) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignIn = async () => {
    if (!validate()) return;
    dispatch(loginStart());
    try {
      const data = await authService.signIn(email, password);
      dispatch(loginSuccess(data.user));
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back 👋</Text>
          <Text style={styles.subtitle}>Sign in to DayDue</Text>
        </View>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠ {error}</Text>
          </View>
        )}

        <Input
          label="Email"
          placeholder="you@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errors.email}
        />
        <Input
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />

        <TouchableOpacity style={styles.forgotWrap}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        <Button title="Sign In" onPress={handleSignIn} loading={loading} style={styles.btn} />

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.switchLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  content: { padding: Spacing.xl, paddingTop: 60 },
  header: { marginBottom: 32 },
  greeting: { fontSize: 28, fontWeight: '800', color: Colors.text },
  subtitle: { fontSize: 15, color: Colors.textMuted, marginTop: 6 },
  errorBox: {
    backgroundColor: '#EF444415',
    borderWidth: 1,
    borderColor: '#EF444433',
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: 16,
  },
  errorText: { fontSize: 13, color: Colors.red },
  forgotWrap: { alignSelf: 'flex-end', marginBottom: 20 },
  forgot: { fontSize: 13, color: Colors.orange },
  btn: { marginTop: 4 },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  switchText: { fontSize: 14, color: Colors.textMuted },
  switchLink: { fontSize: 14, color: Colors.orangeLight, fontWeight: '700' },
});

export default SignInScreen;
