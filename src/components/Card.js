// src/components/Card.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Radius, Spacing, Shadows } from '../constants/theme';

const Card = ({ children, style, onPress, noPadding = false }) => {
  const content = (
    <View style={[styles.card, noPadding && { padding: 0 }, style]}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.82}>
        {content}
      </TouchableOpacity>
    );
  }
  return content;
};

export const GradientCard = ({ children, style }) => (
  <View style={[styles.gradientCard, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Shadows.card,
  },
  gradientCard: {
    backgroundColor: '#1A1200',
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: '#FF8C0033',
  },
});

export default Card;
