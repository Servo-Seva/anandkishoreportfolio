export interface Project {
  id: string;
  number: string;
  type: string;
  title: string;
  period: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  fullDescription: string;
  features: string[];
  useCases: string[];
  technologies: {
    name: string;
    description: string;
  }[];
  buildProcess: string[];
  challenges: string[];
}

export const projects: Project[] = [
  {
    id: 'e-commerce-platform',
    number: '01',
    type: 'Web App',
    title: 'E-Commerce Platform',
    period: 'Q4 2024',
    description: 'A full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#',
    fullDescription: 'A comprehensive e-commerce platform built from the ground up, featuring a modern and intuitive user interface. The platform handles everything from product catalog management to secure payment processing, providing businesses with all the tools they need to sell online.',
    features: [
      'Real-time inventory management with low stock alerts',
      'Secure payment processing with Stripe integration',
      'Admin dashboard with sales analytics and reporting',
      'Customer account management and order history',
      'Product search with advanced filtering and sorting',
      'Responsive design optimized for all devices',
      'Shopping cart with persistent state',
      'Order tracking and email notifications',
    ],
    useCases: [
      'Small to medium-sized businesses looking to establish online presence',
      'Retail stores wanting to expand into e-commerce',
      'Entrepreneurs launching direct-to-consumer brands',
      'Businesses needing custom e-commerce solutions',
    ],
    technologies: [
      { name: 'React', description: 'Frontend framework for building the user interface' },
      { name: 'Node.js', description: 'Backend runtime for server-side logic' },
      { name: 'PostgreSQL', description: 'Relational database for data persistence' },
      { name: 'Stripe', description: 'Payment processing and subscription management' },
      { name: 'Tailwind CSS', description: 'Utility-first CSS framework for styling' },
      { name: 'Redis', description: 'In-memory caching for improved performance' },
    ],
    buildProcess: [
      'Started with comprehensive requirements gathering and user research',
      'Designed the database schema and API architecture',
      'Built the backend API with Node.js and Express',
      'Developed the React frontend with component-based architecture',
      'Integrated Stripe for secure payment processing',
      'Implemented real-time inventory updates with WebSocket',
      'Added comprehensive testing and deployed to production',
    ],
    challenges: [
      'Implementing real-time inventory sync across multiple concurrent users',
      'Optimizing database queries for large product catalogs',
      'Ensuring PCI compliance for payment processing',
    ],
  },
  {
    id: 'ai-chat-application',
    number: '02',
    type: 'SaaS',
    title: 'AI Chat Application',
    period: 'Q3 2024',
    description: 'Real-time messaging app powered by AI for smart responses, with end-to-end encryption.',
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&h=600&fit=crop',
    tags: ['Next.js', 'OpenAI', 'WebSocket', 'Redis', 'TypeScript'],
    liveUrl: '#',
    githubUrl: '#',
    fullDescription: 'An intelligent chat application that leverages cutting-edge AI technology to provide smart, contextual responses. Built with security in mind, featuring end-to-end encryption and real-time messaging capabilities that scale to millions of users.',
    features: [
      'AI-powered smart responses using GPT-4',
      'End-to-end encryption for all messages',
      'Real-time messaging with WebSocket',
      'Multi-threaded conversation support',
      'Voice message transcription',
      'File sharing with preview support',
      'Read receipts and typing indicators',
      'Customizable AI personality settings',
    ],
    useCases: [
      'Customer support automation for businesses',
      'Personal AI assistant for productivity',
      'Educational tutoring and Q&A platforms',
      'Team collaboration with AI-enhanced features',
    ],
    technologies: [
      { name: 'Next.js', description: 'React framework with server-side rendering' },
      { name: 'OpenAI GPT-4', description: 'AI model for intelligent responses' },
      { name: 'WebSocket', description: 'Real-time bidirectional communication' },
      { name: 'Redis', description: 'Message queue and caching layer' },
      { name: 'TypeScript', description: 'Type-safe development experience' },
      { name: 'Prisma', description: 'Type-safe database ORM' },
    ],
    buildProcess: [
      'Researched AI integration patterns and best practices',
      'Designed the real-time messaging architecture',
      'Implemented WebSocket server with Redis pub/sub',
      'Integrated OpenAI API with rate limiting and fallbacks',
      'Built the encryption layer for secure messaging',
      'Developed the responsive chat interface',
      'Optimized for low latency and high throughput',
    ],
    challenges: [
      'Managing AI response latency for real-time feel',
      'Implementing robust end-to-end encryption',
      'Scaling WebSocket connections efficiently',
    ],
  },
  {
    id: 'analytics-dashboard',
    number: '03',
    type: 'Dashboard',
    title: 'Analytics Dashboard',
    period: 'Q2 2024',
    description: 'Comprehensive analytics platform with real-time data visualization and custom reporting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['React', 'D3.js', 'Python', 'AWS', 'GraphQL'],
    liveUrl: '#',
    githubUrl: '#',
    fullDescription: 'A powerful analytics dashboard that transforms raw data into actionable insights. Features real-time data visualization, custom report generation, and an intuitive interface that makes complex data accessible to everyone in the organization.',
    features: [
      'Real-time data visualization with interactive charts',
      'Custom report builder with drag-and-drop interface',
      'Automated data pipeline with scheduled updates',
      'Role-based access control for team collaboration',
      'Export functionality (PDF, Excel, CSV)',
      'Alert system for KPI thresholds',
      'Mobile-responsive dashboard views',
      'API integration with popular data sources',
    ],
    useCases: [
      'Marketing teams tracking campaign performance',
      'Sales teams monitoring revenue metrics',
      'Product teams analyzing user behavior',
      'Executives needing high-level business overview',
    ],
    technologies: [
      { name: 'React', description: 'Frontend framework for the dashboard UI' },
      { name: 'D3.js', description: 'Data visualization library for charts' },
      { name: 'Python', description: 'Backend data processing and API' },
      { name: 'AWS', description: 'Cloud infrastructure and serverless functions' },
      { name: 'GraphQL', description: 'Flexible API for data queries' },
      { name: 'Apache Kafka', description: 'Real-time data streaming' },
    ],
    buildProcess: [
      'Conducted stakeholder interviews to understand data needs',
      'Designed the data model and ETL pipeline',
      'Built the Python backend with data processing capabilities',
      'Created reusable D3.js visualization components',
      'Implemented GraphQL API for flexible data access',
      'Set up AWS infrastructure with auto-scaling',
      'Added comprehensive documentation and training materials',
    ],
    challenges: [
      'Handling large datasets without compromising performance',
      'Creating intuitive visualizations for complex data',
      'Ensuring data accuracy across multiple sources',
    ],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};
