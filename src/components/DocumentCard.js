// src/components/DocumentCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Radius, Spacing } from '../constants/theme';
import { getDaysLeft, getDocumentStatus, getStatusColor, formatCurrency } from '../utils/helpers';
import { CATEGORIES } from '../constants/theme';

const DocumentCard = ({ doc, onPress, showCategory = false }) => {
  const status = getDocumentStatus(doc);
  const days = getDaysLeft(doc.dueDate);
  const statusColor = getStatusColor(status, Colors);
  const catInfo = CATEGORIES.find(c => c.name === doc.category);

  const daysLabel = doc.paid
    ? '✓ Paid'
    : days < 0
    ? `${Math.abs(days)}d overdue`
    : `${days}d left`;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.82} style={styles.container}>
      <View style={styles.iconWrap}>
        <Text style={styles.emoji}>{catInfo?.emoji || '📄'}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{doc.title}</Text>
        <Text style={styles.sub} numberOfLines={1}>
          {showCategory ? doc.category : doc.owner}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{formatCurrency(doc.amount, doc.currency)}</Text>
        <Text style={[styles.days, { color: statusColor }]}>{daysLabel}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.xl,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: '#FF8C0015',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  emoji: { fontSize: 20 },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600', color: Colors.text },
  sub: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  right: { alignItems: 'flex-end' },
  amount: { fontSize: 14, fontWeight: '700', color: Colors.text },
  days: { fontSize: 11, marginTop: 2 },
});

export default DocumentCard;
