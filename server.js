const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/candidate_profile', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Profile Schema
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  education: [{
    institution: String,
    degree: String,
    year: String
  }],
  skills: [String],
  projects: [{
    title: String,
    description: String,
    links: [String]
  }],
  work: [{
    company: String,
    position: String,
    duration: String,
    description: String
  }],
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  }
}, { timestamps: true });

// Add text index for search
profileSchema.index({ 
  name: 'text', 
  'education.institution': 'text',
  'education.degree': 'text',
  skills: 'text', 
  'projects.title': 'text',
  'projects.description': 'text',
  'work.company': 'text',
  'work.position': 'text'
});

const Profile = mongoose.model('Profile', profileSchema);

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Create profile
app.post('/api/profile', async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get profile
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update profile
app.put('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { 
      new: true, 
      upsert: true,
      runValidators: true 
    });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get projects by skill
app.get('/api/projects/skill/:skill', async (req, res) => {
  try {
    const skill = req.params.skill;
    const profile = await Profile.findOne({ 
      skills: { $regex: skill, $options: 'i' } 
    }, { projects: 1, name: 1 });
    
    if (!profile) {
      return res.status(404).json({ error: 'No projects found for this skill' });
    }
    
    res.json({
      skill: skill,
      projects: profile.projects,
      candidate: profile.name
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get top skills
app.get('/api/skills/top', async (req, res) => {
  try {
    const profile = await Profile.findOne({}, { skills: 1 });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    // For simplicity, return all skills (in a real app, you might rank by project count)
    res.json({
      skills: profile.skills,
      count: profile.skills.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search endpoint
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }
    
    const profile = await Profile.findOne({
      $text: { $search: q }
    });
    
    if (!profile) {
      return res.status(404).json({ error: 'No results found' });
    }
    
    res.json({
      query: q,
      results: profile
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const profile = await Profile.findOne({}, { projects: 1, name: 1 });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json({
      projects: profile.projects,
      candidate: profile.name
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;