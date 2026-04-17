// src/utils/helpers.js
import { differenceInDays, format, isAfter } from 'date-fns';

export const getDaysLeft = dueDate => {
  return differenceInDays(new Date(dueDate), new Date());
};

export const getDocumentStatus = doc => {
  if (doc.paid) return 'paid';
  const days = getDaysLeft(doc.dueDate);
  if (days < 0) return 'overdue';
  if (days <= 7) return 'critical';
  if (days <= 14) return 'due_soon';
  return 'upcoming';
};

export const getStatusLabel = status => ({
  paid: '✓ Paid',
  overdue: '⚠ Overdue',
  critical: '🔴 Due Soon',
  due_soon: '⏳ Due Soon',
  upcoming: '📅 Upcoming',
}[status] || 'Unknown');

export const getStatusColor = (status, colors) => ({
  paid: colors.green,
  overdue: colors.red,
  critical: colors.red,
  due_soon: colors.orangeLight,
  upcoming: colors.textMuted,
}[status] || colors.textMuted);

export const formatDate = date => {
  try { return format(new Date(date), 'dd MMM yyyy'); }
  catch { return '—'; }
};

export const formatCurrency = (amount, currency = '₹') => {
  if (!amount) return `${currency}0`;
  return `${currency}${Number(amount).toLocaleString('en-IN')}`;
};

export const getTotalPending = docs =>
  docs.filter(d => !d.paid).reduce((sum, d) => sum + (d.amount || 0), 0);

export const getAlertCount = docs =>
  docs.filter(d => !d.paid && getDaysLeft(d.dueDate) <= 14).length;

export const generateDocId = () =>
  'DOC' + Date.now().toString().slice(-6);

export const getInitials = name => {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
};

export const validateDocForm = fields => {
  const errors = {};
  if (!fields.title?.trim()) errors.title = 'Document title is required';
  if (!fields.owner?.trim()) errors.owner = 'Owner name is required';
  if (!fields.dueDate) errors.dueDate = 'Due date is required';
  if (fields.amount && isNaN(Number(fields.amount))) errors.amount = 'Amount must be a number';
  if (fields.startDate && fields.dueDate && isAfter(new Date(fields.startDate), new Date(fields.dueDate))) {
    errors.dueDate = 'Due date must be after start date';
  }
  return errors;
};
