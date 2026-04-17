import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

/* =========================
   🔥 ASYNC THUNKS (API)
========================= */

// GET all documents
export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async () => {
    const data = await api.get('/documents');
    return data;
  }
);

// ADD document
export const createDocument = createAsyncThunk(
  'documents/createDocument',
  async (doc) => {
    const data = await api.post('/documents', doc);
    return data;
  }
);

// MARK AS PAID
export const markDocumentPaid = createAsyncThunk(
  'documents/markPaid',
  async (id) => {
    await api.put(`/documents/${id}`);
    return id;
  }
);

// DELETE document
export const removeDocument = createAsyncThunk(
  'documents/removeDocument',
  async (id) => {
    await api.delete(`/documents/${id}`);
    return id;
  }
);

/* =========================
   🔥 SLICE
========================= */

const documentsSlice = createSlice({
  name: 'documents',

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ===== FETCH ===== */
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchDocuments.rejected, (state) => {
        state.loading = false;
      })

      /* ===== ADD ===== */
      .addCase(createDocument.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      /* ===== MARK PAID ===== */
      .addCase(markDocumentPaid.fulfilled, (state, action) => {
        const doc = state.items.find(d => d.id === action.payload);
        if (doc) {
          doc.paid = true;
          doc.lastPaid = new Date().toISOString();
        }
      })

      /* ===== DELETE ===== */
      .addCase(removeDocument.fulfilled, (state, action) => {
        state.items = state.items.filter(d => d.id !== action.payload);
      });
  },
});

/* =========================
   🔥 SELECTORS
========================= */

export const selectAllDocuments = (state) => state.documents.items;

export const selectPendingDocuments = (state) =>
  state.documents.items.filter(d => !d.paid);

export const selectAlerts = (state) =>
  state.documents.items.filter(d => {
    if (d.paid) return false;
    const days = Math.ceil((new Date(d.dueDate) - new Date()) / 86400000);
    return days <= 14;
  });

export default documentsSlice.reducer;