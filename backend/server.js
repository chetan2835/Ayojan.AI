const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 5000;

// Firebase Admin SDK Initialization
// Path to your service account key.json file
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoints

// 1. Generate Event Plan with AI
app.post('/api/generate-plan', async (req, res) => {
  const { eventTitle, eventType, estimatedBudget, description, location } = req.body;

  try {
    // The prompt is crucial. We explicitly ask for a clean JSON output.
    const aiPrompt = `As an expert event planner, generate a detailed task list for an event titled "${eventTitle}", of type "${eventType}", located in "${location}", with an estimated budget of ${estimatedBudget}. Provide tasks categorized as 'Planning', 'Logistics', 'Marketing', and 'Finance'. For each task, suggest a responsible 'role' (e.g., 'Finance Head', 'Marketing Lead'), a 'priority' ('High', 'Medium', 'Low'), a unique 'id' (short string), a default 'status' ('Pending'), and a 'title'. The output MUST be a single JSON array of objects, with no extra text, formatting, or comments. Example task object: {"id": "task1", "title": "Secure Venue", "role": "Logistics Lead", "priority": "High", "status": "Pending"}.`;

    const geminiResponse = await axios.post(
      `${process.env.GEMINI_API_ENDPOINT}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: aiPrompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const tasksContent = geminiResponse.data.candidates[0].content.parts[0].text;

    // Sanitize the response string to remove markdown and other unwanted characters
    const cleanTasksContent = tasksContent
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const tasks = JSON.parse(cleanTasksContent);

    // Save the new event to Firestore
    const eventRef = db.collection('events').doc();
    await eventRef.set({
      id: eventRef.id,
      eventTitle,
      eventType,
      estimatedBudget,
      description,
      location,
      tasks,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(200).json({ message: 'Event and plan generated successfully!', eventId: eventRef.id });

  } catch (error) {
    console.error('Error generating event plan:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate plan.' });
  }
});

// 2. Fetch an event by ID
app.get('/api/events/:eventId', async (req, res) => {
  const { eventId } = req.params;
  try {
    const eventDoc = await db.collection('events').doc(eventId).get();
    if (!eventDoc.exists) {
      return res.status(404).json({ error: 'Event not found.' });
    }
    res.status(200).json(eventDoc.data());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event.' });
  }
});

// 3. Update task status (for drag-and-drop)
app.put('/api/events/:eventId/tasks', async (req, res) => {
    const { eventId } = req.params;
    const { tasks } = req.body;
    try {
        await db.collection('events').doc(eventId).update({ tasks });
        res.status(200).json({ message: 'Tasks updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update tasks.' });
    }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});