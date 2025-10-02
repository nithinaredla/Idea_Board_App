const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// Get all ideas
app.get('/api/ideas', async (req, res) => {
  const ideas = await prisma.idea.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(ideas);
});

// Create new idea
app.post('/api/ideas', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.length === 0 || text.length > 280) {
      return res.status(400).json({ error: 'Text required (1–280 chars).' });
    }
    const idea = await prisma.idea.create({ data: { text } });
    res.status(201).json(idea);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Upvote
app.post('/api/ideas/:id/upvote', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

  try {
    const idea = await prisma.idea.update({
      where: { id },
      data: { upvotes: { increment: 1 } },
    });
    res.json(idea);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend running on port ${port}`));
