// src/screens/DocumentDetailScreen.js
import React, { useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllDocuments, markAsPaid, deleteDocument } from '../store/documentsSlice';
import {
  getDaysLeft, getDocumentStatus, getStatusLabel, getStatusColor,
  formatCurrency, formatDate,
} from '../utils/helpers';
import { Colors, Spacing, Radius, CATEGORIES } from '../constants/theme';
import Button from '../components/Button';
import Badge from '../components/Badge';

const DetailRow = ({ label, value, valueColor }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailKey}>{label}</Text>
    <Text style={[styles.detailVal, valueColor && { color: valueColor }]}>{value}</Text>
  </View>
);

const DocumentDetailScreen = ({ route, navigation }) => {
  const { docId } = route.params;
  const dispatch = useDispatch();
  const docs = useSelector(selectAllDocuments);
  const doc = useMemo(() => docs.find(d => d.id === docId), [docs, docId]);

  if (!doc) {
    return (
      <View style={styles.center}>
        <Text style={{ color: Colors.textMuted }}>Document not found.</Text>
      </View>
    );
  }

  const days = getDaysLeft(doc.dueDate);
  const status = getDocumentStatus(doc);
  const statusLabel = getStatusLabel(status);
  const catInfo = CATEGORIES.find(c => c.name === doc.category);

  const badgeVariant =
    status === 'paid' ? 'green' :
    status === 'overdue' || status === 'critical' ? 'red' : 'orange';

  const daysColor =
    doc.paid ? Colors.green :
    days < 0 ? Colors.red :
    days <= 7 ? Colors.red :
    days <= 14 ? Colors.orangeLight : Colors.text;

  const handleMarkPaid = () => {
    Alert.alert(
      'Mark as Paid',
      `Mark "${doc.title}" as paid?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => dispatch(markAsPaid(doc.id)),
        },
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Document',
      `Are you sure you want to delete "${doc.title}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteDocument(doc.id));
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Document Details</Text>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
          <Text style={styles.deleteIcon}>🗑</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.heroLeft}>
              <Text style={styles.heroEmoji}>{catInfo?.emoji || '📄'}</Text>
              <View>
                <Text style={styles.heroTitle} numberOfLines={2}>{doc.title}</Text>
                <Text style={styles.heroOwner}>👤 {doc.owner}</Text>
              </View>
            </View>
            <Badge label={statusLabel} variant={badgeVariant} />
          </View>

          <View style={styles.heroAmtRow}>
            <Text style={styles.heroAmt}>{formatCurrency(doc.amount, doc.currency)}</Text>
            <Text style={styles.heroDue}>Due: {formatDate(doc.dueDate)}</Text>
          </View>

          <View style={styles.daysRow}>
            <Text style={[styles.daysBig, { color: daysColor }]}>
              {doc.paid ? '✓' : Math.abs(days)}
            </Text>
            <View>
              <Text style={styles.daysLabel}>
                {doc.paid ? 'Paid' : days < 0 ? 'days overdue' : 'days left'}
              </Text>
              {!doc.paid && (
                <Text style={styles.daysHint}>
                  {days <= 0 ? 'Payment overdue!' : days <= 7 ? 'Pay very soon!' : days <= 14 ? 'Upcoming soon' : 'You have time'}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.detailCard}>
          <Text style={styles.sectionLabel}>Details</Text>
          <DetailRow label="Document ID" value={doc.id} />
          <DetailRow label="Category" value={`${catInfo?.emoji} ${doc.category}`} />
          <DetailRow label="Payment Type" value={doc.paymentType} />
          <DetailRow label="Start Date" value={formatDate(doc.startDate)} />
          <DetailRow label="Due Date" value={formatDate(doc.dueDate)} valueColor={daysColor} />
          {doc.lastPaid && (
            <DetailRow label="Last Paid" value={formatDate(doc.lastPaid)} />
          )}
          <DetailRow label="Reminder" value={`⏰ ${doc.reminder}`} />
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {!doc.paid ? (
            <Button
              title="✓ Mark as Paid"
              onPress={handleMarkPaid}
              style={styles.actionBtn}
            />
          ) : (
            <View style={styles.paidBanner}>
              <Text style={styles.paidBannerText}>✓ This document has been marked as paid</Text>
            </View>
          )}
          <Button
            title="Edit Document"
            variant="outline"
            onPress={() => navigation.navigate('AddDocument', { editDoc: doc })}
            style={[styles.actionBtn, { marginTop: 10 }]}
          />
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: 52,
    paddingBottom: 16,
  },
  backBtn: { padding: 4 },
  backArrow: { fontSize: 22, color: Colors.orangeLight },
  topTitle: { fontSize: 18, fontWeight: '700', color: Colors.text },
  deleteBtn: { padding: 4 },
  deleteIcon: { fontSize: 18 },

  heroCard: {
    marginHorizontal: Spacing.xl,
    marginBottom: 16,
    backgroundColor: '#1A1200',
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: '#FF8C0033',
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  heroLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, marginRight: 12 },
  heroEmoji: { fontSize: 28 },
  heroTitle: { fontSize: 18, fontWeight: '800', color: Colors.text, maxWidth: 180 },
  heroOwner: { fontSize: 12, color: Colors.textMuted, marginTop: 3 },
  heroAmtRow: { marginBottom: 16 },
  heroAmt: { fontSize: 34, fontWeight: '800', color: Colors.orangeLight },
  heroDue: { fontSize: 12, color: Colors.textMuted, marginTop: 3 },
  daysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 16,
  },
  daysBig: { fontSize: 52, fontWeight: '800', lineHeight: 56 },
  daysLabel: { fontSize: 14, color: Colors.textMuted, fontWeight: '600' },
  daysHint: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },

  detailCard: {
    marginHorizontal: Spacing.xl,
    marginBottom: 16,
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  sectionLabel: {
    fontSize: 11, fontWeight: '700', color: Colors.textMuted,
    textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  detailKey: { fontSize: 13, color: Colors.textMuted },
  detailVal: { fontSize: 13, fontWeight: '600', color: Colors.text, maxWidth: 200, textAlign: 'right' },

  actions: { paddingHorizontal: Spacing.xl },
  actionBtn: {},
  paidBanner: {
    backgroundColor: '#22C55E18',
    borderWidth: 1,
    borderColor: '#22C55E33',
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  paidBannerText: { fontSize: 13, color: Colors.green, fontWeight: '600' },
});

export default DocumentDetailScreen;
