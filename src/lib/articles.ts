export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
  content: string[];
  tags: string[];
}

export const articles: Article[] = [
  {
    id: "building-scalable-react-applications",
    title: "Building Scalable React Applications with Clean Architecture",
    excerpt: "Learn how to structure your React projects for maintainability and scalability using clean architecture principles.",
    date: "December 2024",
    readTime: "8 min read",
    category: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    featured: true,
    tags: ["React", "Architecture", "Best Practices", "TypeScript"],
    content: [
      "As React applications grow in complexity, maintaining a clean and scalable architecture becomes crucial. In this comprehensive guide, we'll explore proven patterns and practices that will help you build applications that are easy to maintain, test, and scale.",
      
      "## Why Clean Architecture Matters",
      "Clean architecture separates concerns into distinct layers, making your codebase more modular and testable. The key principle is that dependencies should point inward – business logic should never depend on UI frameworks or external services directly.",
      
      "## The Layer Structure",
      "A well-architected React application typically consists of several layers:",
      
      "**Presentation Layer**: This includes your React components, hooks, and anything related to the UI. Components should be thin and delegate business logic to other layers.",
      
      "**Application Layer**: This contains your use cases and application-specific logic. It orchestrates the flow of data between the presentation and domain layers.",
      
      "**Domain Layer**: The heart of your application. It contains business entities, value objects, and domain services that encapsulate your core business rules.",
      
      "**Infrastructure Layer**: This handles external concerns like API calls, storage, and third-party integrations. It implements interfaces defined by inner layers.",
      
      "## Implementing in Practice",
      "Let's look at a practical folder structure that reflects these principles:",
      
      "```\nsrc/\n  ├── components/     # Presentation Layer\n  │   ├── ui/         # Reusable UI components\n  │   └── features/   # Feature-specific components\n  ├── hooks/          # Custom hooks\n  ├── services/       # Application Layer\n  ├── domain/         # Domain Layer\n  │   ├── entities/\n  │   └── repositories/\n  └── infrastructure/ # Infrastructure Layer\n      ├── api/\n      └── storage/\n```",
      
      "## Key Takeaways",
      "1. Keep components focused on presentation logic only\n2. Use custom hooks to abstract stateful logic\n3. Create service classes for complex business operations\n4. Define clear interfaces between layers\n5. Write tests at each layer boundary",
      
      "By following these principles, you'll create React applications that are not only scalable but also a joy to work with. The initial investment in architecture pays dividends as your application grows."
    ]
  },
  {
    id: "power-of-typescript-modern-web",
    title: "The Power of TypeScript in Modern Web Development",
    excerpt: "Discover how TypeScript can improve your development workflow and help catch bugs before they reach production.",
    date: "November 2024",
    readTime: "6 min read",
    category: "TypeScript",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&h=600&fit=crop",
    featured: false,
    tags: ["TypeScript", "JavaScript", "Web Development", "Type Safety"],
    content: [
      "TypeScript has become an essential tool in modern web development. By adding static type checking to JavaScript, it helps developers catch errors early, improve code documentation, and enhance the overall development experience.",
      
      "## Why TypeScript?",
      "JavaScript's dynamic typing can lead to runtime errors that are difficult to debug. TypeScript addresses this by providing compile-time type checking, which catches many common programming mistakes before your code even runs.",
      
      "## Key Benefits",
      "**Early Error Detection**: TypeScript catches type-related bugs during development, not in production. This saves countless hours of debugging and improves application reliability.",
      
      "**Better IDE Support**: With TypeScript, your IDE can provide intelligent code completion, refactoring tools, and inline documentation. This dramatically improves developer productivity.",
      
      "**Self-Documenting Code**: Types serve as documentation that stays in sync with your code. When you read a function signature, you immediately understand what it expects and returns.",
      
      "## Advanced TypeScript Features",
      "TypeScript offers powerful features beyond basic type annotations:",
      
      "**Generics**: Create reusable components that work with multiple types while maintaining type safety.",
      
      "**Union and Intersection Types**: Combine types flexibly to model complex data structures.",
      
      "**Type Guards**: Narrow types within conditional blocks for precise type checking.",
      
      "**Mapped Types**: Transform existing types to create new ones programmatically.",
      
      "## Getting Started",
      "Migrating to TypeScript can be done gradually. Start by renaming `.js` files to `.ts` and adding type annotations incrementally. TypeScript's any type provides an escape hatch during migration.",
      
      "## Conclusion",
      "TypeScript is no longer optional for serious web development projects. Its benefits in code quality, developer experience, and maintainability make it an invaluable tool in your development toolkit."
    ]
  },
  {
    id: "mastering-nodejs-best-practices",
    title: "Mastering Node.js: Best Practices for Backend Development",
    excerpt: "A comprehensive guide to writing efficient, secure, and maintainable Node.js applications.",
    date: "October 2024",
    readTime: "10 min read",
    category: "Node.js",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=600&fit=crop",
    featured: false,
    tags: ["Node.js", "Backend", "JavaScript", "Performance"],
    content: [
      "Node.js has revolutionized backend development by bringing JavaScript to the server. But building production-ready Node.js applications requires more than just writing code that works – it requires following best practices that ensure performance, security, and maintainability.",
      
      "## Project Structure",
      "A well-organized project structure is the foundation of a maintainable application. Separate concerns into logical directories:",
      
      "```\nsrc/\n  ├── controllers/    # Request handlers\n  ├── services/       # Business logic\n  ├── models/         # Data models\n  ├── middleware/     # Custom middleware\n  ├── routes/         # Route definitions\n  ├── utils/          # Helper functions\n  └── config/         # Configuration files\n```",
      
      "## Error Handling",
      "Proper error handling is crucial. Use async/await with try-catch blocks, create custom error classes, and implement a centralized error handling middleware.",
      
      "## Security Best Practices",
      "**Input Validation**: Always validate and sanitize user input. Use libraries like Joi or Zod for schema validation.",
      
      "**Authentication & Authorization**: Implement JWT or session-based auth with proper token management.",
      
      "**Rate Limiting**: Protect your APIs from abuse with rate limiting middleware.",
      
      "**Helmet.js**: Use Helmet to set secure HTTP headers automatically.",
      
      "## Performance Optimization",
      "**Clustering**: Use Node.js clustering to utilize all CPU cores.",
      
      "**Caching**: Implement Redis or in-memory caching for frequently accessed data.",
      
      "**Connection Pooling**: Use connection pools for database connections.",
      
      "**Streaming**: Use streams for large file operations to avoid memory issues.",
      
      "## Monitoring and Logging",
      "Implement comprehensive logging with Winston or Pino. Use APM tools like New Relic or DataDog to monitor performance in production.",
      
      "## Conclusion",
      "Following these best practices will help you build Node.js applications that are robust, secure, and ready for production scale."
    ]
  },
  {
    id: "css-grid-vs-flexbox",
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt: "Understanding the differences between CSS Grid and Flexbox and choosing the right layout tool for your needs.",
    date: "September 2024",
    readTime: "5 min read",
    category: "CSS",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&h=600&fit=crop",
    featured: false,
    tags: ["CSS", "Layout", "Flexbox", "Grid"],
    content: [
      "CSS Grid and Flexbox are both powerful layout systems, but they excel in different scenarios. Understanding when to use each will help you write cleaner, more maintainable CSS.",
      
      "## Flexbox: One-Dimensional Layouts",
      "Flexbox is designed for laying out items in a single direction – either a row or a column. It's perfect for:",
      
      "- Navigation menus\n- Card layouts in a single row\n- Centering content\n- Distributing space between items",
      
      "## CSS Grid: Two-Dimensional Layouts",
      "Grid excels when you need to control both rows and columns simultaneously. Use it for:",
      
      "- Page layouts\n- Complex card grids\n- Magazine-style designs\n- Any layout requiring precise placement",
      
      "## Practical Examples",
      "**Use Flexbox for a navbar:**\n```css\n.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n```",
      
      "**Use Grid for a page layout:**\n```css\n.page {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: auto 1fr auto;\n}\n```",
      
      "## Combining Both",
      "The real power comes from combining Grid and Flexbox. Use Grid for the overall page structure and Flexbox for aligning content within grid cells.",
      
      "## Key Differences",
      "| Feature | Flexbox | Grid |\n|---------|---------|------|\n| Dimension | 1D | 2D |\n| Content-first | Yes | No |\n| Gap support | Yes | Yes |\n| Overlap items | No | Yes |",
      
      "## Conclusion",
      "Don't choose one over the other – learn both and use them where they shine. Flexbox for components, Grid for layouts."
    ]
  },
  {
    id: "api-design-patterns",
    title: "API Design Patterns Every Developer Should Know",
    excerpt: "Explore essential API design patterns that will help you build robust and developer-friendly APIs.",
    date: "August 2024",
    readTime: "7 min read",
    category: "API",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
    featured: false,
    tags: ["API", "REST", "Design Patterns", "Backend"],
    content: [
      "Well-designed APIs are the backbone of modern applications. They enable seamless integration, improve developer experience, and scale with your needs. Let's explore essential patterns every API developer should master.",
      
      "## RESTful Resource Design",
      "REST APIs should be designed around resources, not actions. Use nouns for endpoints and HTTP methods for actions:",
      
      "- `GET /users` - List users\n- `POST /users` - Create user\n- `GET /users/:id` - Get user\n- `PUT /users/:id` - Update user\n- `DELETE /users/:id` - Delete user",
      
      "## Pagination Patterns",
      "For large datasets, implement pagination. Two popular approaches:",
      
      "**Offset-based**: Simple but can have performance issues with large offsets.\n```\nGET /users?page=2&limit=20\n```",
      
      "**Cursor-based**: More efficient for large datasets.\n```\nGET /users?cursor=abc123&limit=20\n```",
      
      "## Filtering and Sorting",
      "Allow clients to filter and sort data:\n```\nGET /products?category=electronics&sort=-price&min_price=100\n```",
      
      "## Error Handling",
      "Use consistent error responses:\n```json\n{\n  \"error\": {\n    \"code\": \"VALIDATION_ERROR\",\n    \"message\": \"Invalid email format\",\n    \"details\": [...]\n  }\n}\n```",
      
      "## Versioning Strategies",
      "Plan for API evolution from the start:",
      
      "- **URL versioning**: `/v1/users`\n- **Header versioning**: `Accept: application/vnd.api+json;version=1`\n- **Query parameter**: `/users?version=1`",
      
      "## Rate Limiting",
      "Protect your API with rate limits and communicate them via headers:\n```\nX-RateLimit-Limit: 1000\nX-RateLimit-Remaining: 999\nX-RateLimit-Reset: 1609459200\n```",
      
      "## HATEOAS",
      "Include links to related resources for discoverability:\n```json\n{\n  \"id\": 1,\n  \"name\": \"John\",\n  \"_links\": {\n    \"self\": \"/users/1\",\n    \"orders\": \"/users/1/orders\"\n  }\n}\n```",
      
      "## Conclusion",
      "Great API design is an investment that pays dividends in developer satisfaction and system maintainability. Start with these patterns and evolve based on your specific needs."
    ]
  },
  {
    id: "fullstack-development-guide-2024",
    title: "The Complete Guide to Full-Stack Development in 2024",
    excerpt: "Everything you need to know about modern full-stack development, from choosing the right tech stack to deployment strategies and best practices.",
    date: "December 2024",
    readTime: "15 min read",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=600&fit=crop",
    featured: true,
    tags: ["Full Stack", "Web Development", "2024", "Career"],
    content: [
      "Full-stack development continues to evolve rapidly. In 2024, developers need to navigate an increasingly complex landscape of tools, frameworks, and deployment options. This guide will help you make informed decisions and build modern applications effectively.",
      
      "## Choosing Your Stack",
      "The best tech stack depends on your specific needs. Here are popular combinations in 2024:",
      
      "**For Startups & MVPs:**\n- Frontend: React/Next.js or Vue/Nuxt\n- Backend: Node.js with Express or Fastify\n- Database: PostgreSQL or MongoDB\n- Deployment: Vercel, Railway, or Render",
      
      "**For Enterprise:**\n- Frontend: React with TypeScript\n- Backend: Node.js, Go, or Java Spring\n- Database: PostgreSQL with Redis caching\n- Deployment: AWS/GCP with Kubernetes",
      
      "## Frontend Trends",
      "**React Server Components**: Blur the line between server and client rendering for better performance.",
      
      "**TypeScript Everywhere**: Type safety is now expected, not optional.",
      
      "**Tailwind CSS**: Utility-first CSS has won the styling debate.",
      
      "**State Management**: Simpler solutions like Zustand and Jotai are replacing Redux.",
      
      "## Backend Essentials",
      "**API Design**: REST remains dominant, but GraphQL and tRPC are growing for specific use cases.",
      
      "**Serverless**: Edge functions and serverless architectures reduce operational overhead.",
      
      "**Database Choices**: SQL databases with ORMs like Prisma or Drizzle for type safety.",
      
      "## DevOps & Deployment",
      "**CI/CD Pipelines**: GitHub Actions, GitLab CI, or CircleCI for automated testing and deployment.",
      
      "**Containerization**: Docker for consistent environments across development and production.",
      
      "**Infrastructure as Code**: Terraform or Pulumi for managing cloud resources.",
      
      "## Security Considerations",
      "- Implement authentication with battle-tested solutions (Auth0, Clerk, or NextAuth)\n- Use HTTPS everywhere\n- Validate and sanitize all user input\n- Keep dependencies updated\n- Implement proper CORS policies",
      
      "## Performance Optimization",
      "- Lazy load components and images\n- Implement proper caching strategies\n- Use CDNs for static assets\n- Optimize database queries with proper indexing\n- Monitor performance with tools like Lighthouse and Web Vitals",
      
      "## Career Advice",
      "1. **Specialize, then generalize**: Master one stack before exploring others\n2. **Build projects**: Portfolio projects matter more than certificates\n3. **Contribute to open source**: Great for learning and networking\n4. **Stay curious**: The landscape changes; embrace continuous learning",
      
      "## Conclusion",
      "Full-stack development in 2024 offers incredible opportunities. Focus on fundamentals, choose proven tools, and never stop learning. The best developers aren't those who know every framework – they're the ones who can solve problems effectively with the tools they have."
    ]
  }
];

export const getArticleById = (id: string): Article | undefined => {
  return articles.find(article => article.id === id);
};

export const getArticlesByCategory = (category: string): Article[] => {
  return articles.filter(article => article.category === category);
};

export const getFeaturedArticles = (): Article[] => {
  return articles.filter(article => article.featured);
};
