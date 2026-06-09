const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'sessions.json');

app.use(cors());
app.use(express.json());

// Load all sessions
app.get('/sessions', (req, res) => {
    if (!fs.existsSync(DATA_FILE)) return res.json({});
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    res.json(JSON.parse(data));
});

// Save a session
app.post('/sessions/:name', (req, res) => {
    let sessions = {};
    if (fs.existsSync(DATA_FILE)) {
        sessions = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
    sessions[req.params.name] = req.body;
    fs.writeFileSync(DATA_FILE, JSON.stringify(sessions, null, 2));
    res.json({ success: true });
});

// Delete a session
app.delete('/sessions/:name', (req, res) => {
    if (!fs.existsSync(DATA_FILE)) return res.json({ success: true });
    let sessions = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    delete sessions[req.params.name];
    fs.writeFileSync(DATA_FILE, JSON.stringify(sessions, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));