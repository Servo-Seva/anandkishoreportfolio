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
    url: string;
    icon: string;
  }[];
  buildProcess: string[];
  challenges: string[];
  screenshots: {
    url: string;
    caption: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 'vchat-app',
    number: '01',
    type: 'Web App',
    title: 'VChat App – AI-Powered Real-Time Chat',
    period: '2024',
    description: 'A MERN stack chat application with real-time messaging, AI-powered features, and WebRTC-based audio/video calling.',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop',
    tags: ['ReactJS', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'AI', 'WebRTC'],
    liveUrl: '#',
    githubUrl: '#',
    fullDescription: 'VChat is an AI-powered real-time chat application built on the MERN stack. It offers a seamless messaging experience with intelligent features like smart replies, emotion detection, translation, and automatic summarization. The app also supports WebRTC-based audio and video calling with real-time AI moderation.',
    features: [
      'Real-time messaging with Socket.IO',
      'Group chat functionality',
      'Typing indicators and presence updates',
      'AI-powered smart replies',
      'Emotion detection for messages',
      'Real-time translation support',
      'Automatic conversation summarization',
      'WebRTC-based audio/video calling',
      'Media toggles for calls',
      'Real-time AI moderation for safe communication',
    ],
    useCases: [
      'Teams needing real-time collaboration with AI assistance',
      'Customer support platforms with intelligent response suggestions',
      'Social applications requiring moderated communication',
      'Remote teams needing video conferencing with chat',
    ],
    technologies: [
      { name: 'ReactJS', description: 'Frontend framework for building the user interface', url: 'https://react.dev', icon: 'react' },
      { name: 'Node.js', description: 'Backend runtime for server-side logic', url: 'https://nodejs.org', icon: 'nodejs' },
      { name: 'Express.js', description: 'Web framework for building the API', url: 'https://expressjs.com', icon: 'express' },
      { name: 'MongoDB', description: 'NoSQL database for storing messages and user data', url: 'https://mongodb.com', icon: 'mongodb' },
      { name: 'Socket.IO', description: 'Real-time bidirectional event-based communication', url: 'https://socket.io', icon: 'socketio' },
      { name: 'WebRTC', description: 'Real-time audio/video communication', url: 'https://webrtc.org', icon: 'webrtc' },
    ],
    buildProcess: [
      'Designed the real-time messaging architecture using Socket.IO',
      'Built the backend API with Node.js and Express.js',
      'Integrated MongoDB for message persistence',
      'Implemented AI features for smart replies and emotion detection',
      'Added WebRTC for audio/video calling functionality',
      'Built real-time AI moderation system',
      'Deployed and tested for scalability',
    ],
    challenges: [
      'Ensuring low latency for real-time messaging',
      'Integrating multiple AI features seamlessly',
      'Managing WebRTC connections across different network conditions',
    ],
    screenshots: [
      { url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=800&fit=crop', caption: 'Chat Interface' },
      { url: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1200&h=800&fit=crop', caption: 'Group Chat' },
      { url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=800&fit=crop', caption: 'AI Smart Reply' },
      { url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop', caption: 'Video Call' },
    ],
  },
  {
    id: 'algorithm-visualizer',
    number: '02',
    type: 'Educational Tool',
    title: 'Algorithm Visualizer',
    period: '2024',
    description: 'An interactive sorting algorithm learning tool built with React and TypeScript, demonstrating various sorting algorithms.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
    tags: ['ReactJS', 'Redux', 'TypeScript', 'TailwindCSS'],
    liveUrl: '#',
    githubUrl: '#',
    fullDescription: 'Algorithm Visualizer is an interactive learning tool designed to help users understand sorting algorithms through visual demonstration. Built with React and TypeScript, it provides step-by-step visualization of popular sorting algorithms including Selection, Insertion, Bubble, Merge, Heap, and Quick Sort.',
    features: [
      'Visual demonstration of sorting algorithms',
      'Selection Sort visualization',
      'Insertion Sort visualization',
      'Bubble Sort visualization',
      'Merge Sort visualization',
      'Heap Sort visualization',
      'Quick Sort visualization',
      'Adjustable animation speed',
      'Responsive design for all devices',
      'Step-by-step algorithm execution',
    ],
    useCases: [
      'Students learning data structures and algorithms',
      'Educators teaching sorting concepts',
      'Interview preparation for technical roles',
      'Visual learners understanding algorithm complexity',
    ],
    technologies: [
      { name: 'ReactJS', description: 'Frontend framework for building the interactive UI', url: 'https://react.dev', icon: 'react' },
      { name: 'Redux', description: 'State management for algorithm state', url: 'https://redux.js.org', icon: 'redux' },
      { name: 'TypeScript', description: 'Type-safe development experience', url: 'https://typescriptlang.org', icon: 'typescript' },
      { name: 'TailwindCSS', description: 'Utility-first CSS framework for styling', url: 'https://tailwindcss.com', icon: 'tailwindcss' },
    ],
    buildProcess: [
      'Designed component architecture for reusability',
      'Implemented sorting algorithms with visualization hooks',
      'Set up Redux for managing algorithm state',
      'Created responsive visualizations with animations',
      'Added speed controls and step-through functionality',
      'Tested across 100+ users for usability feedback',
    ],
    challenges: [
      'Synchronizing visual updates with algorithm execution',
      'Maintaining smooth animations at different speeds',
      'Creating intuitive controls for complex algorithms',
    ],
    screenshots: [
      { url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop', caption: 'Algorithm Selection' },
      { url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&h=800&fit=crop', caption: 'Bubble Sort Visualization' },
      { url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop', caption: 'Merge Sort Demo' },
      { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop', caption: 'Quick Sort Animation' },
    ],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};
