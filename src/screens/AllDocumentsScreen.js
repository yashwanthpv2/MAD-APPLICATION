// src/screens/AllDocumentsScreen.js
import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {
  selectAllDocuments,
  fetchDocuments,
} from '../store/documentsSlice';

import { getDaysLeft } from '../utils/helpers';
import { Colors, Spacing, Radius, CATEGORIES } from '../constants/theme';
import DocumentCard from '../components/DocumentCard';

const FILTERS = ['All', 'Pending', 'Paid', 'Due Soon'];

const AllDocumentsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const docs = useSelector(selectAllDocuments);
  const loading = useSelector(state => state.documents.loading);

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    dispatch(fetchDocuments());
  }, []);

  const filtered = useMemo(() => {
    return docs.filter(doc => {
      const matchSearch =
        !search.trim() ||
        doc.title?.toLowerCase().includes(search.toLowerCase()) ||
        doc.owner?.toLowerCase().includes(search.toLowerCase()) ||
        doc.category?.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        activeFilter === 'All'
          ? true
          : activeFilter === 'Pending'
          ? !doc.paid
          : activeFilter === 'Paid'
          ? doc.paid
          : activeFilter === 'Due Soon'
          ? !doc.paid && getDaysLeft(doc.dueDate) <= 14
          : true;

      const matchCategory =
        activeCategory === 'All'
          ? true
          : doc.category?.toLowerCase().trim() ===
            activeCategory.toLowerCase().trim();

      return matchSearch && matchFilter && matchCategory;
    });
  }, [docs, search, activeFilter, activeCategory]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'white' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>All Documents</Text>
        <Text style={styles.count}>
          {filtered.length} of {docs.length}
        </Text>
      </View>

      {/* 🔥 TOP SECTION (NO GAPS NOW) */}
      <View style={styles.topSection}>
        {/* SEARCH */}
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search documents..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* FILTERS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterChip,
                activeFilter === f && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === f && styles.filterTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* CATEGORY */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.catChip,
              activeCategory === 'All' && styles.catChipActive,
            ]}
            onPress={() => setActiveCategory('All')}
          >
            <Text style={styles.catChipText}>All</Text>
          </TouchableOpacity>

          {CATEGORIES.map(c => (
            <TouchableOpacity
              key={c.name}
              style={[
                styles.catChip,
                activeCategory === c.name && styles.catChipActive,
              ]}
              onPress={() => setActiveCategory(c.name)}
            >
              <Text style={styles.catChipText}>
                {c.emoji} {c.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* LIST */}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(fetchDocuments())}
          />
        }
      >
        {filtered.map(doc => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            onPress={() =>
              navigation.navigate('DocumentDetail', { docId: doc.id })
            }
          />
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddDocument')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

/* =========================
   🎨 STYLES
========================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: 40,
  },

  title: { fontSize: 22, fontWeight: '800', color: Colors.text },
  count: { color: Colors.textMuted },

  /* 🔥 KEY FIX */
  topSection: {
    paddingHorizontal: Spacing.xl,
    marginTop: 10,
  },

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    marginBottom: 6,
  },

  searchInput: { flex: 1, color: Colors.text },

  filterChip: {
    paddingHorizontal: 14,
    height: 36,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.card,
    marginRight: 6,
    marginTop: 4,
    marginBottom: 6,
  },

  filterChipActive: {
    backgroundColor: Colors.orange,
  },

  filterText: { color: Colors.textMuted },
  filterTextActive: { color: 'black' },

  catChip: {
    paddingHorizontal: 12,
    height: 32,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.card,
    marginRight: 6,
    marginTop: 4,
    marginBottom: 10,
  },

  catChipActive: {
    backgroundColor: '#FFA50033',
  },

  catChipText: { color: Colors.textMuted },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fabText: { fontSize: 28, color: 'black' },
});

export default AllDocumentsScreen;