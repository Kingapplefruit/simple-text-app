require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// to see if db connected
prisma.$connect()
  .then(() => {
    console.log("✅ Successfully connected to Supabase database.");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:");
    console.error(err);
    process.exit(1); // exit if connection fails
  });
// api endpoint to recieve req from frontend (dont change at all)
app.post('/submit', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const saved = await prisma.text.create({ data: { content: text } });
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save text' });
  }
});

// dont change listening on all ports
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
