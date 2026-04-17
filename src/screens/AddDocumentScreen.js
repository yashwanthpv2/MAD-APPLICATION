// src/screens/AddDocumentScreen.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addDocument, updateDocument } from '../store/documentsSlice';
import { generateDocId, validateDocForm } from '../utils/helpers';
import { Colors, Spacing, Radius, CATEGORIES, CURRENCIES, REMINDERS } from '../constants/theme';
import Input from '../components/Input';
import Button from '../components/Button';

const AddDocumentScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const editDoc = route.params?.editDoc;
  const defaultCategory = route.params?.defaultCategory || 'Vehicle';
  const isEdit = !!editDoc;

  const [title, setTitle] = useState(editDoc?.title || '');
  const [owner, setOwner] = useState(editDoc?.owner || '');
  const [category, setCategory] = useState(editDoc?.category || defaultCategory);
  const [startDate, setStartDate] = useState(
    editDoc?.startDate ? editDoc.startDate.slice(0, 10) : ''
  );
  const [dueDate, setDueDate] = useState(
    editDoc?.dueDate ? editDoc.dueDate.slice(0, 10) : ''
  );
  const [amount, setAmount] = useState(editDoc?.amount?.toString() || '');
  const [currency, setCurrency] = useState(editDoc?.currency || '₹');
  const [reminder, setReminder] = useState(editDoc?.reminder || '30 days before');
  const [paymentType, setPaymentType] = useState(editDoc?.paymentType || 'Annual');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const paymentTypes = ['Monthly', 'Quarterly', 'Annual', 'One-time'];

  const handleSave = async () => {
    const validationErrors = validateDocForm({ title, owner, dueDate, startDate, amount });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 500)); // simulate API

    const docData = {
      id: isEdit ? editDoc.id : generateDocId(),
      title: title.trim(),
      owner: owner.trim(),
      category,
      startDate: startDate ? new Date(startDate).toISOString() : new Date().toISOString(),
      dueDate: new Date(dueDate).toISOString(),
      amount: parseFloat(amount) || 0,
      currency,
      reminder,
      paymentType,
      paid: isEdit ? editDoc.paid : false,
      lastPaid: isEdit ? editDoc.lastPaid : null,
      createdAt: isEdit ? editDoc.createdAt : new Date().toISOString(),
    };

    if (isEdit) {
      dispatch(updateDocument(docData));
    } else {
      dispatch(addDocument(docData));
    }

    setLoading(false);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{isEdit ? 'Edit Document' : 'Add Document'}</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Input
            label="Document Title"
            placeholder="e.g. Car Insurance – Honda City"
            value={title}
            onChangeText={v => { setTitle(v); setErrors(e => ({ ...e, title: null })); }}
            error={errors.title}
            autoCapitalize="words"
          />

          <Input
            label="Owner Name"
            placeholder="e.g. Rahul Sharma"
            value={owner}
            onChangeText={v => { setOwner(v); setErrors(e => ({ ...e, owner: null })); }}
            error={errors.owner}
            autoCapitalize="words"
          />

          {/* Category Selector */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Category</Text>
            <View style={styles.chipRow}>
              {CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat.name}
                  style={[styles.chip, category === cat.name && styles.chipActive]}
                  onPress={() => setCategory(cat.name)}
                >
                  <Text style={[styles.chipText, category === cat.name && styles.chipTextActive]}>
                    {cat.emoji} {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Date Row */}
          <View style={styles.twoCol}>
            <View style={styles.colItem}>
              <Input
                label="Start Date"
                placeholder="YYYY-MM-DD"
                value={startDate}
                onChangeText={v => { setStartDate(v); setErrors(e => ({ ...e, startDate: null })); }}
                error={errors.startDate}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.colItem}>
              <Input
                label="Due Date *"
                placeholder="YYYY-MM-DD"
                value={dueDate}
                onChangeText={v => { setDueDate(v); setErrors(e => ({ ...e, dueDate: null })); }}
                error={errors.dueDate}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Amount + Currency */}
          <View style={styles.twoCol}>
            <View style={[styles.colItem, { flex: 2 }]}>
              <Input
                label="Amount"
                placeholder="0.00"
                value={amount}
                onChangeText={v => { setAmount(v); setErrors(e => ({ ...e, amount: null })); }}
                error={errors.amount}
                keyboardType="decimal-pad"
              />
            </View>
            <View style={[styles.colItem, { flex: 1 }]}>
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Currency</Text>
                <View style={styles.currencyRow}>
                  {CURRENCIES.map(c => (
                    <TouchableOpacity
                      key={c}
                      style={[styles.currencyBtn, currency === c && styles.currencyActive]}
                      onPress={() => setCurrency(c)}
                    >
                      <Text style={[styles.currencyText, currency === c && styles.currencyTextActive]}>
                        {c}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Payment Type */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Payment Type</Text>
            <View style={styles.chipRow}>
              {paymentTypes.map(pt => (
                <TouchableOpacity
                  key={pt}
                  style={[styles.chip, paymentType === pt && styles.chipActive]}
                  onPress={() => setPaymentType(pt)}
                >
                  <Text style={[styles.chipText, paymentType === pt && styles.chipTextActive]}>
                    {pt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Reminder */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Reminder ⏰</Text>
            <View style={styles.chipRow}>
              {REMINDERS.map(r => (
                <TouchableOpacity
                  key={r}
                  style={[styles.chip, reminder === r && styles.chipActive]}
                  onPress={() => setReminder(r)}
                >
                  <Text style={[styles.chipText, reminder === r && styles.chipTextActive]}>
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Button
            title={isEdit ? 'Save Changes' : 'Save Document'}
            onPress={handleSave}
            loading={loading}
            style={{ marginTop: 8 }}
          />

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: 52,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  closeBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.card,
    alignItems: 'center', justifyContent: 'center',
  },
  closeText: { fontSize: 16, color: Colors.textMuted },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.xl },
  fieldGroup: { marginBottom: Spacing.md },
  fieldLabel: {
    fontSize: 12, fontWeight: '500', color: Colors.textMuted,
    textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.cardBorder,
    backgroundColor: Colors.inputBg,
  },
  chipActive: { backgroundColor: '#FF8C0022', borderColor: Colors.orange },
  chipText: { fontSize: 12, fontWeight: '600', color: Colors.textMuted },
  chipTextActive: { color: Colors.orangeLight },
  twoCol: { flexDirection: 'row', gap: 10 },
  colItem: { flex: 1 },
  currencyRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  currencyBtn: {
    width: 36, height: 36,
    borderRadius: Radius.sm, borderWidth: 1,
    borderColor: Colors.cardBorder, backgroundColor: Colors.inputBg,
    alignItems: 'center', justifyContent: 'center',
  },
  currencyActive: { backgroundColor: '#FF8C0022', borderColor: Colors.orange },
  currencyText: { fontSize: 14, color: Colors.textMuted, fontWeight: '600' },
  currencyTextActive: { color: Colors.orangeLight },
});

export default AddDocumentScreen;
