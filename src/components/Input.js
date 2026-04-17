// src/components/Input.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Radius, Spacing } from '../constants/theme';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  keyboardType,
  editable = true,
  multiline,
  numberOfLines,
  style,
  rightElement,
  autoCapitalize = 'none',
  autoCorrect = false,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry;

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputContainer,
        focused && styles.focused,
        error && styles.errorBorder,
        !editable && styles.disabled,
      ]}>
        <TextInput
          style={[styles.input, multiline && { height: numberOfLines * 24, textAlignVertical: 'top' }]}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType || 'default'}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={styles.eyeBtn}>
            <Text style={{ color: Colors.textMuted, fontSize: 13 }}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
        {rightElement && <View style={styles.rightWrap}>{rightElement}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: Spacing.md },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textMuted,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingHorizontal: Spacing.md,
  },
  focused: { borderColor: Colors.orange },
  errorBorder: { borderColor: Colors.red },
  disabled: { opacity: 0.6 },
  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 14,
    color: Colors.text,
  },
  eyeBtn: { padding: 8 },
  rightWrap: { marginLeft: 8 },
  errorText: { fontSize: 11, color: Colors.red, marginTop: 4 },
});

export default Input;
