import express from 'express';
import { db } from '../firebase-admin.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all entries for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.uid;
    const entriesRef = db.collection('entries').where('userId', '==', userId);
    const snapshot = await entriesRef.get();
    const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new entry
router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { type, date, amount, category } = req.body;
    const newEntry = {
      userId,
      type,
      date,
      amount,
      category,
      createdAt: new Date().toISOString(),
    };
    const docRef = await db.collection('entries').add(newEntry);
    res.json({ id: docRef.id, ...newEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;