const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/candidate_profile');

// Profile Schema (same as in server.js)
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

// Sample data - Replace with your real information
const sampleProfile = {
  name: "Abhineet Mathur",
  email: "abhineet.mathur@example.com",
  education: [
    {
      institution: "Manipal University Jaipur",
      degree: "Bachelor of Computer Science",
      year: "2022"
    }
  ],
  skills: [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "MongoDB",
    "Express.js",
    "HTML",
    "CSS",
    "Git",
    "Docker"
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce application with user authentication, payment integration, and admin dashboard",
      links: ["https://github.com/abhineetmathur/ecommerce", "https://myecommerce.vercel.app"]
    },
    {
      title: "Task Management App",
      description: "React-based task management application with drag-and-drop functionality and real-time updates",
      links: ["https://github.com/abhineetmathur/taskapp", "https://mytasks.netlify.app"]
    },
    {
      title: "Weather Dashboard",
      description: "Python Flask application that displays weather data with interactive charts and forecasting",
      links: ["https://github.com/abhineetmathur/weather-dashboard"]
    }
  ],
  work: [
    {
      company: "StartupXYZ",
      position: "Frontend Developer",
      duration: "2022 - Present",
      description: "Developed responsive web applications using React and TypeScript. Collaborated with design team to implement pixel-perfect UIs."
    },
    {
      company: "Tech Solutions Inc",
      position: "Junior Full Stack Developer",
      duration: "2021 - 2022",
      description: "Built REST APIs using Node.js and Express. Worked on database optimization and implemented automated testing."
    }
  ],
  links: {
    github: "https://github.com/abhineetmathur",
    linkedin: "https://www.linkedin.com/in/03abhi",
    portfolio: "https://abhineetmathur.dev"
  }
};

async function seedDatabase() {
  try {
    // Clear existing data
    await Profile.deleteMany({});
    console.log('Cleared existing profiles');
    
    // Insert sample data
    const profile = new Profile(sampleProfile);
    await profile.save();
    console.log('Sample profile created successfully');
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();