import Experience from '../models/experience.js';

// Default seed data
const defaultExperiences = [
  {
    role: 'Lead Full Stack Engineer',
    company: 'InnovateTech Solutions',
    duration: '2024 - Present',
    description: 'Spearheaded development of scalable web applications using the MERN stack. Designed microservice APIs, optimized MongoDB database performance, and built custom React components using Framer Motion. Mentored junior developers and improved CI/CD deployment pipelines.',
    tags: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker']
  },
  {
    role: 'Senior React Developer',
    company: 'PixelForge Studios',
    duration: '2022 - 2024',
    description: 'Designed and implemented interactive user interfaces for SaaS web portals. Built complex dashboard UIs with support for charting and real-time alerts. Collaborated closely with design team to execute glassmorphism and motion guidelines.',
    tags: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Vite', 'Framer Motion']
  },
  {
    role: 'Software Engineer',
    company: 'AlphaSystems Corp',
    duration: '2020 - 2022',
    description: 'Developed and maintained RESTful APIs using Express.js. Designed database structures, implemented authentication services, and contributed to frontend components. Managed unit tests and codebase updates.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'Jest']
  }
];

// GET /api/experience - Get all experiences
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/experience - Add a new experience
export const createExperience = async (req, res) => {
  try {
    const { role, company, duration, description, tags } = req.body;
    const experience = await Experience.create({ role, company, duration, description, tags });
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/experience/:id - Update an experience
export const updateExperience = async (req, res) => {
  try {
    const { role, company, duration, description, tags } = req.body;
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      { role, company, duration, description, tags },
      { new: true, runValidators: true }
    );
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.status(200).json({ success: true, data: experience });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/experience/:id - Delete an experience
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.status(200).json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
