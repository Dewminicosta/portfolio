const defaultProjects = [
  {
    id: 1,
    title: 'Tradely',
    description: 'A premium peer-to-peer barter and trade marketplace platform. Users can list properties or items, message in real-time, propose swaps, and review exchange offers. Complete with user feedback ratings and interactive maps.',
    category: 'MERN Stack',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Mapbox'],
    image: '/src/assets/project_swapnest.png',
    github: 'https://github.com/Dewminicosta/tradely',
    live: 'https://tradely.example.com'
  },
  {
    id: 2,
    title: 'FinFlow Dashboard',
    description: 'A comprehensive SaaS financial analytics dashboard. Integrates Mock Bank APIs to display real-time cash flow metrics, category expenditure details, and automated revenue projections with interactive graphs.',
    category: 'React / UI',
    tags: ['React', 'Framer Motion', 'Vanilla CSS', 'Recharts', 'CSS Grid'],
    image: '/src/assets/project_finflow.png',
    github: 'https://github.com/Dewminicosta/finflow',
    live: 'https://finflow.example.com'
  },
  {
    id: 3,
    title: 'TaskSphere Platform',
    description: 'A secure backend task management API engine supporting JWT role-based access control, request rate-limiting, automated email updates, and full database CRUD audit trails. Extensively tested with Swagger documentation.',
    category: 'Backend',
    tags: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Nodemailer'],
    image: '/src/assets/project_tasksphere.png',
    github: 'https://github.com/Dewminicosta/tasksphere',
    live: 'https://tasksphere-api.example.com'
  }
];

export const getProjects = () => {
  const stored = localStorage.getItem('portfolio_projects');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
  return defaultProjects;
};

export const saveProjects = (projects) => {
  localStorage.setItem('portfolio_projects', JSON.stringify(projects));
};

export const projects = getProjects();
