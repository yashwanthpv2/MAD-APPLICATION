// src/screens/auth/SignUpScreen.js
import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/authSlice';
import { authService } from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Colors, Spacing, Radius } from '../../constants/theme';

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(s => s.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Full name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!email.includes('@')) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;
    dispatch(loginStart());
    try {
      const data = await authService.signUp(name, email, password);
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start managing your documents today</Text>
        </View>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠ {error}</Text>
          </View>
        )}

        <Input
          label="Full Name"
          placeholder="Rahul Sharma"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          error={errors.name}
        />
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
          placeholder="Min 6 characters"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />

        <Button title="Create Account" onPress={handleSignUp} loading={loading} style={styles.btn} />

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.switchLink}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.terms}>
          By signing up, you agree to our{' '}
          <Text style={{ color: Colors.orange }}>Terms & Privacy Policy</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  content: { padding: Spacing.xl, paddingTop: 60 },
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.text },
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
  btn: { marginTop: 8 },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  switchText: { fontSize: 14, color: Colors.textMuted },
  switchLink: { fontSize: 14, color: Colors.orangeLight, fontWeight: '700' },
  terms: { fontSize: 12, color: Colors.textMuted, textAlign: 'center', marginTop: 20, lineHeight: 18 },
});

export default SignUpScreen;
