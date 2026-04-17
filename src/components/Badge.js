// src/components/Badge.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius } from '../constants/theme';

const Badge = ({ label, variant = 'orange' }) => {
  const variants = {
    orange: { bg: '#FF8C0022', text: Colors.orangeLight },
    green:  { bg: '#22C55E22', text: Colors.green },
    red:    { bg: '#EF444422', text: Colors.red },
    blue:   { bg: '#3B82F622', text: Colors.blue },
    muted:  { bg: '#88888822', text: Colors.textMuted },
  };
  const v = variants[variant] || variants.orange;

  return (
    <View style={[styles.badge, { backgroundColor: v.bg }]}>
      <Text style={[styles.text, { color: v.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  text: { fontSize: 11, fontWeight: '700' },
});

export default Badge;
