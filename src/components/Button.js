// src/components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Radius, Spacing, Gradients } from '../constants/theme';

const Button = ({
  title,
  onPress,
  variant = 'primary', // primary | outline | ghost | danger
  size = 'md',         // sm | md | lg
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  const sizeStyles = {
    sm: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: Radius.md },
    md: { paddingVertical: 14, paddingHorizontal: 20, borderRadius: Radius.lg },
    lg: { paddingVertical: 18, paddingHorizontal: 24, borderRadius: Radius.xl },
  };

  const textSizes = { sm: 13, md: 15, lg: 17 };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.82}
        style={[{ opacity: isDisabled ? 0.55 : 1, borderRadius: Radius.lg }, style]}
      >
        <LinearGradient
          colors={Gradients.orange}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, sizeStyles[size]]}
        >
          {loading ? (
            <ActivityIndicator color={Colors.black} size="small" />
          ) : (
            <View style={styles.row}>
              {icon && <View style={styles.iconWrap}>{icon}</View>}
              <Text style={[styles.primaryText, { fontSize: textSizes[size] }, textStyle]}>{title}</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const outlineColor = variant === 'danger' ? Colors.red : Colors.orange;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.82}
      style={[
        styles.base,
        sizeStyles[size],
        variant === 'outline' || variant === 'danger'
          ? { borderWidth: 1, borderColor: outlineColor, backgroundColor: 'transparent' }
          : { backgroundColor: 'transparent' },
        { opacity: isDisabled ? 0.55 : 1 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={outlineColor} size="small" />
      ) : (
        <View style={styles.row}>
          {icon && <View style={styles.iconWrap}>{icon}</View>}
          <Text style={[
            styles.outlineText,
            { fontSize: textSizes[size], color: outlineColor },
            textStyle,
          ]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    marginRight: 8,
  },
  primaryText: {
    color: Colors.black,
    fontWeight: '700',
  },
  outlineText: {
    fontWeight: '600',
  },
});

export default Button;
