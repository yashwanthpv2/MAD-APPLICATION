// src/screens/ProfileScreen.js
import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { selectAllDocuments } from '../store/documentsSlice';
import {
  getTotalPending, getAlertCount, getInitials, formatCurrency,
} from '../utils/helpers';
import { Colors, Spacing, Radius } from '../constants/theme';
import Button from '../components/Button';

const PrefRow = ({ icon, label, sub, value, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={onPress ? 0.75 : 1}
    style={styles.prefRow}
  >
    <View style={styles.prefLeft}>
      <Text style={styles.prefIcon}>{icon}</Text>
      <View>
        <Text style={styles.prefLabel}>{label}</Text>
        {sub && <Text style={styles.prefSub}>{sub}</Text>}
      </View>
    </View>
    <Text style={styles.prefValue}>{value}</Text>
  </TouchableOpacity>
);

const StatBox = ({ label, value, color }) => (
  <View style={styles.statBox}>
    <Text style={[styles.statVal, color && { color }]}>{value}</Text>
    <Text style={styles.statLbl}>{label}</Text>
  </View>
);

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(s => s.auth.user);
  const docs = useSelector(selectAllDocuments);

  const totalDocs = docs.length;
  const pending = getTotalPending(docs);
  const alerts = getAlertCount(docs);
  const paidDocs = docs.filter(d => d.paid).length;
  const initials = user ? getInitials(user.name) : '??';

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => dispatch(logout()) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar & Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓ Verified Account</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsCard}>
          <StatBox label="Total Docs" value={totalDocs} />
          <View style={styles.statDivider} />
          <StatBox label="Paid" value={paidDocs} color={Colors.green} />
          <View style={styles.statDivider} />
          <StatBox label="Alerts" value={alerts} color={Colors.red} />
          <View style={styles.statDivider} />
          <StatBox label="Pending" value={formatCurrency(pending)} color={Colors.orangeLight} />
        </View>

        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <PrefRow
            icon="🔔"
            label="Notifications"
            sub="Push & email reminders"
            value={<Text style={{ color: Colors.green, fontWeight: '700', fontSize: 13 }}>ON</Text>}
          />
          <PrefRow
            icon="🌙"
            label="Dark Theme"
            sub="Always enabled"
            value={<Text style={{ color: Colors.green, fontWeight: '700', fontSize: 13 }}>ON</Text>}
          />
          <PrefRow
            icon="💱"
            label="Default Currency"
            value={<Text style={{ color: Colors.textMuted, fontSize: 13 }}>₹ INR</Text>}
          />
          <PrefRow
            icon="🌍"
            label="Language"
            value={<Text style={{ color: Colors.textMuted, fontSize: 13 }}>English</Text>}
            style={{ borderBottomWidth: 0 }}
          />
        </View>

        {/* Account */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <PrefRow
            icon="🔒"
            label="Change Password"
            value={<Text style={{ color: Colors.orangeLight, fontSize: 13 }}>›</Text>}
            onPress={() => Alert.alert('Coming Soon', 'Password change will be available soon.')}
          />
          <PrefRow
            icon="📤"
            label="Export Data"
            value={<Text style={{ color: Colors.orangeLight, fontSize: 13 }}>›</Text>}
            onPress={() => Alert.alert('Coming Soon', 'Data export will be available soon.')}
          />
          <PrefRow
            icon="⭐"
            label="Rate DayDue"
            value={<Text style={{ color: Colors.orangeLight, fontSize: 13 }}>›</Text>}
            onPress={() => Alert.alert('Thank you!', 'We appreciate your support!')}
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>DayDue v1.0.0</Text>
          <Text style={styles.appInfoText}>We Remind. You Relax. 🧡</Text>
        </View>

        {/* Logout */}
        <View style={{ paddingHorizontal: Spacing.xl, marginBottom: 40 }}>
          <Button
            title="Logout"
            variant="danger"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: 52,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.text },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: Spacing.xl,
  },
  avatarCircle: {
    width: 80, height: 80,
    borderRadius: 40,
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: { fontSize: 30, fontWeight: '800', color: Colors.black },
  userName: { fontSize: 20, fontWeight: '800', color: Colors.text },
  userEmail: { fontSize: 13, color: Colors.textMuted, marginTop: 4 },
  verifiedBadge: {
    marginTop: 10,
    backgroundColor: '#22C55E18',
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#22C55E33',
  },
  verifiedText: { fontSize: 12, color: Colors.green, fontWeight: '600' },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.xl,
    marginBottom: 24,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
  },
  statBox: { flex: 1, alignItems: 'center', paddingVertical: 6 },
  statVal: { fontSize: 16, fontWeight: '800', color: Colors.text },
  statLbl: { fontSize: 10, color: Colors.textMuted, marginTop: 2 },
  statDivider: { width: 1, height: 36, backgroundColor: Colors.cardBorder },
  sectionTitle: {
    fontSize: 11, fontWeight: '700', color: Colors.textMuted,
    textTransform: 'uppercase', letterSpacing: 0.8,
    paddingHorizontal: Spacing.xl, marginBottom: 10,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.xl,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  prefLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  prefIcon: { fontSize: 18, width: 28 },
  prefLabel: { fontSize: 14, color: Colors.text, fontWeight: '500' },
  prefSub: { fontSize: 11, color: Colors.textMuted, marginTop: 1 },
  prefValue: {},
  appInfo: { alignItems: 'center', paddingVertical: 16, gap: 4 },
  appInfoText: { fontSize: 12, color: Colors.textMuted },
});

export default ProfileScreen;
