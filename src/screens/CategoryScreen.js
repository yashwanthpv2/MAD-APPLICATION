// src/screens/CategoryScreen.js
import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAllDocuments } from '../store/documentsSlice';
import {
  getDaysLeft, getTotalPending, getAlertCount, formatCurrency,
} from '../utils/helpers';
import { Colors, Spacing, Radius, CATEGORIES } from '../constants/theme';
import DocumentCard from '../components/DocumentCard';
import Button from '../components/Button';

const CategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const allDocs = useSelector(selectAllDocuments);
  const catInfo = CATEGORIES.find(c => c.name === category);
  const docs = useMemo(() => allDocs.filter(d => d.category === category), [allDocs, category]);
  const pending = useMemo(() => getTotalPending(docs), [docs]);
  const alertCount = useMemo(() => getAlertCount(docs), [docs]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{catInfo?.emoji} {category}</Text>
          <Text style={styles.sub}>{docs.length} document{docs.length !== 1 ? 's' : ''}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryVal}>{docs.length}</Text>
            <Text style={styles.summaryLbl}>Items</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryVal, { color: Colors.orangeLight }]}>
              {formatCurrency(pending)}
            </Text>
            <Text style={styles.summaryLbl}>Pending</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryVal, { color: Colors.red }]}>{alertCount}</Text>
            <Text style={styles.summaryLbl}>Alerts</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Documents</Text>

        {docs.length === 0 ? (
          <View style={styles.empty}>
            <Text style={{ fontSize: 40 }}>{catInfo?.emoji}</Text>
            <Text style={styles.emptyText}>No {category} documents yet</Text>
          </View>
        ) : (
          docs.map(doc => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              onPress={() => navigation.navigate('DocumentDetail', { docId: doc.id })}
            />
          ))
        )}

        <View style={{ paddingHorizontal: Spacing.xl, marginTop: 8, marginBottom: 40 }}>
          <Button
            title={`+ Add ${category} Document`}
            variant="outline"
            onPress={() => navigation.navigate('AddDocument', { defaultCategory: category })}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: 52,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: { padding: 4 },
  backArrow: { fontSize: 22, color: Colors.orangeLight },
  title: { fontSize: 20, fontWeight: '800', color: Colors.text },
  sub: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.xl,
    marginBottom: 24,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryVal: { fontSize: 22, fontWeight: '800', color: Colors.text },
  summaryLbl: { fontSize: 11, color: Colors.textMuted, marginTop: 3 },
  divider: { width: 1, backgroundColor: Colors.cardBorder },
  sectionTitle: {
    fontSize: 11, fontWeight: '700', color: Colors.textMuted,
    textTransform: 'uppercase', letterSpacing: 0.8,
    paddingHorizontal: Spacing.xl, marginBottom: 12,
  },
  empty: { alignItems: 'center', padding: 40, gap: 12 },
  emptyText: { fontSize: 14, color: Colors.textMuted },
});

export default CategoryScreen;
