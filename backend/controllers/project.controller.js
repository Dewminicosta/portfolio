import Project from '../models/project.js';

// Default seed data
const defaultProjects = [
  {
    title: 'SwapNest',
    description: 'A full-stack volunteer management platform with real-time scheduling, inventory tracking, and admin dashboard. Built with MERN stack featuring role-based access control and automated notifications.',
    category: 'MERN Stack',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    github: 'https://github.com/Dewminicosta/swapnest',
    live: 'https://swapnest-demo.vercel.app'
  },
  {
    title: 'E-Commerce Dashboard',
    description: 'Analytics dashboard for e-commerce platforms with real-time sales tracking, inventory management, and customer insights. Features interactive charts and data visualization.',
    category: 'React / UI',
    tags: ['React', 'Chart.js', 'Tailwind CSS', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    github: 'https://github.com/Dewminicosta/ecommerce-dashboard',
    live: 'https://ecommerce-dashboard.vercel.app'
  },
  {
    title: 'Task Management API',
    description: 'RESTful API for task management with authentication, team collaboration features, and real-time updates. Includes comprehensive documentation and testing suite.',
    category: 'Backend',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Jest'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    github: 'https://github.com/Dewminicosta/task-api',
    live: ''
  }
];

// GET /api/project - Get all projects (seeds if empty)
export const getProjects = async (req, res) => {
  try {
    let projects = await Project.find().sort({ createdAt: -1 }); // newest first
    if (projects.length === 0) {
      projects = await Project.create(defaultProjects);
      // Sort again to be consistent
      projects = await Project.find().sort({ createdAt: -1 });
    }
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/project - Add a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, category, tags, image, github, live } = req.body;
    const project = await Project.create({ title, description, category, tags, image, github, live });
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/project/:id - Update a project
export const updateProject = async (req, res) => {
  try {
    const { title, description, category, tags, image, github, live } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, category, tags, image, github, live },
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/project/:id - Delete a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
