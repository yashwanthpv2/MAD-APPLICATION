// src/screens/DashboardScreen.js
import React, { useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectAllDocuments } from '../store/documentsSlice';
import {
  getDaysLeft, getDocumentStatus, getStatusColor,
  getTotalPending, getAlertCount, formatCurrency, formatDate, getInitials,
} from '../utils/helpers';
import { Colors, Spacing, Radius, CATEGORIES } from '../constants/theme';
import Card from '../components/Card';
import DocumentCard from '../components/DocumentCard';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const docs = useSelector(selectAllDocuments);
  const user = useSelector(s => s.auth.user);

  const pending = useMemo(() => getTotalPending(docs), [docs]);
  const alerts = useMemo(() => getAlertCount(docs), [docs]);
  const upcoming = useMemo(() =>
    [...docs]
      .filter(d => !d.paid)
      .sort((a, b) => getDaysLeft(a.dueDate) - getDaysLeft(b.dueDate))
      .slice(0, 5),
    [docs]
  );

  const initials = user ? getInitials(user.name) : '??';
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning ☀️';
    if (h < 17) return 'Good afternoon 🌤';
    return 'Good evening 🌙';
  })();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { flex: 1 }]}>
            <Text style={styles.statVal}>{alerts}</Text>
            <Text style={styles.statLbl}>🔔 Active Alerts</Text>
          </View>
          <View style={{ width: 10 }} />
          <View style={[styles.statBox, { flex: 1 }]}>
            <Text style={[styles.statVal, { color: Colors.orangeLight }]}>
              {formatCurrency(pending)}
            </Text>
            <Text style={styles.statLbl}>💰 Pending Total</Text>
          </View>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.catGrid}>
          {CATEGORIES.map(cat => {
            const count = docs.filter(d => d.category === cat.name).length;
            const catAlerts = docs.filter(d =>
              d.category === cat.name && !d.paid && getDaysLeft(d.dueDate) <= 14
            ).length;
            return (
              <TouchableOpacity
                key={cat.name}
                style={styles.catCard}
                onPress={() => navigation.navigate('Category', { category: cat.name })}
                activeOpacity={0.8}
              >
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
                <Text style={styles.catName}>{cat.name}</Text>
                <Text style={styles.catCount}>{count} item{count !== 1 ? 's' : ''}</Text>
                {catAlerts > 0 && (
                  <View style={styles.alertDot}>
                    <Text style={styles.alertDotText}>{catAlerts}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Next Deadlines */}
        <Text style={styles.sectionTitle}>Next Deadlines</Text>
        {upcoming.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎉</Text>
            <Text style={styles.emptyText}>All caught up! No pending documents.</Text>
          </View>
        ) : (
          upcoming.map(doc => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              showCategory
              onPress={() => navigation.navigate('DocumentDetail', { docId: doc.id })}
            />
          ))
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddDocument')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: 52,
    paddingBottom: 16,
  },
  greeting: { fontSize: 13, color: Colors.textMuted },
  userName: { fontSize: 22, fontWeight: '800', color: Colors.text, marginTop: 2 },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 15, fontWeight: '700', color: Colors.black },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    marginBottom: 24,
  },
  statBox: {
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  statVal: { fontSize: 22, fontWeight: '800', color: Colors.orange },
  statLbl: { fontSize: 11, color: Colors.textMuted, marginTop: 3 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: Spacing.xl,
    marginBottom: 12,
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.xl,
    gap: 10,
    marginBottom: 24,
  },
  catCard: {
    width: '47%',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    position: 'relative',
  },
  catEmoji: { fontSize: 24, marginBottom: 6 },
  catName: { fontSize: 13, fontWeight: '700', color: Colors.text },
  catCount: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  alertDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertDotText: { fontSize: 10, color: Colors.white, fontWeight: '700' },
  emptyState: { alignItems: 'center', padding: 32 },
  emptyEmoji: { fontSize: 40, marginBottom: 10 },
  emptyText: { fontSize: 14, color: Colors.textMuted, textAlign: 'center' },
  fab: {
    position: 'absolute',
    bottom: 88,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  fabText: { fontSize: 28, color: Colors.black, fontWeight: '700', lineHeight: 32 },
});

export default DashboardScreen;
