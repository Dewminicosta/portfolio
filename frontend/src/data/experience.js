export const experiences = [
  {
    id: 1,
    role: 'Lead Full Stack Engineer',
    company: 'InnovateTech Solutions',
    duration: '2024 - Present',
    description: 'Spearheaded development of scalable web applications using the MERN stack. Designed microservice APIs, optimized MongoDB database performance, and built custom React components using Framer Motion. Mentored junior developers and improved CI/CD deployment pipelines.',
    tags: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker']
  },
  {
    id: 2,
    role: 'Senior React Developer',
    company: 'PixelForge Studios',
    duration: '2022 - 2024',
    description: 'Designed and implemented interactive user interfaces for SaaS web portals. Built complex dashboard UIs with support for charting and real-time alerts. Collaborated closely with design team to execute glassmorphism and motion guidelines.',
    tags: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Vite', 'Framer Motion']
  },
  {
    id: 3,
    role: 'Software Engineer',
    company: 'AlphaSystems Corp',
    duration: '2020 - 2022',
    description: 'Developed and maintained RESTful APIs using Express.js. Designed database structures, implemented authentication services, and contributed to frontend components. Managed unit tests and codebase updates.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'Jest']
  }
];

// Function to get experiences from localStorage or return default
export const getExperiences = () => {
  const storedExperiences = localStorage.getItem('portfolio_experiences');
  if (storedExperiences) {
    return JSON.parse(storedExperiences);
  }
  return experiences;
};
