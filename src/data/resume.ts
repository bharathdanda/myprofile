import type { ResumeData } from '@/types/resume'

// Convert percentage to 1-5 scale (preserves decimals)
function percentToLevel(percent: number): number {
  return (percent / 100) * 5
}

export const resumeData: ResumeData = {
  name: 'Bharath Danda',
  title: 'Technology Leader, Architect, & CTO',
  summary: 'Technology leader with 20+ years of IT experience with a strong background in cloud strategy (GCP, AWS & Azure), cloud-native architectures, micro-services, and event-based integrations. With a heavy focus on embracing simplicity, ability to blend technical expertise with business context and driving innovation within high-performance teams.',
  headshot: '/profile_picture.jpg',
  contact: {
    email: 'bharathreddy.danda@gmail.com', // Update with actual email
    linkedin: 'linkedin.com/in/bharathdanda', // Update with actual LinkedIn
    github: 'github.com/bharathdanda', // Update with actual GitHub
  },
  skills: [
    // Artificial Intelligence
    { name: 'Langchain/Langgraph', level: percentToLevel(90), category: 'Artificial Intelligence' },
    { name: 'DSPY/GEPA', level: percentToLevel(90), category: 'Artificial Intelligence' },
    { name: 'Vertex AI', level: percentToLevel(90), category: 'Artificial Intelligence' },
    { name: 'Ollama', level: percentToLevel(90), category: 'Artificial Intelligence' },
    { name: 'RAG/GraphRAG', level: percentToLevel(90), category: 'Artificial Intelligence' },
    { name: 'LLM Tool Calling', level: percentToLevel(90), category: 'Artificial Intelligence' },
    { name: 'Open AI', level: percentToLevel(75), category: 'Artificial Intelligence' },
    { name: 'Evals', level: percentToLevel(80), category: 'Artificial Intelligence' },
    { name: 'AutoGen', level: percentToLevel(50), category: 'Artificial Intelligence' },
    { name: 'Finetuning - RLHF', level: percentToLevel(50), category: 'Artificial Intelligence' },
    //Clouds - GCP, AWS, Azure
    { name: 'GCP', level: percentToLevel(90), category: 'Cloud Providers' },
    { name: 'AWS', level: percentToLevel(80), category: 'Cloud Providers' },
    { name: 'Azure', level: percentToLevel(80), category: 'Cloud Providers' },
    
    // Programming Languages
    { name: 'Python', level: percentToLevel(90), category: 'Programming Languages' },
    { name: 'TypeScript', level: percentToLevel(80), category: 'Programming Languages' },
    { name: 'Shell', level: percentToLevel(75), category: 'Programming Languages' },
    { name: 'Java/Springboot', level: percentToLevel(75), category: 'Programming Languages' },
    { name: 'Go', level: percentToLevel(25), category: 'Programming Languages' },
    
    // Front End
    { name: 'React', level: percentToLevel(75), category: 'Front End' },
    { name: 'Vite', level: percentToLevel(75), category: 'Front End' },
    { name: 'Vue3', level: percentToLevel(60), category: 'Front End' },
    { name: 'Webpack', level: percentToLevel(50), category: 'Front End' },
    
    // DevOps
    { name: 'Terraform', level: percentToLevel(90), category: 'DevOps' },
    { name: 'Github', level: percentToLevel(80), category: 'DevOps' },
    { name: 'Jenkins', level: percentToLevel(80), category: 'DevOps' },
    { name: 'Cloud Formation', level: percentToLevel(75), category: 'DevOps' },
    { name: 'Digital Ocean/Xebia', level: percentToLevel(50), category: 'DevOps' },
    
    // Compute
    { name: 'Docker', level: percentToLevel(90), category: 'Compute' },
    { name: 'KEDA', level: percentToLevel(90), category: 'Compute' },
    { name: 'Kubernetes', level: percentToLevel(85), category: 'Compute' },
    { name: 'Lambda/Functions', level: percentToLevel(85), category: 'Compute' },
    
    // API Management
    { name: 'Apigee', level: percentToLevel(90), category: 'API Management' },
    { name: 'Apollo', level: percentToLevel(80), category: 'API Management' },
    { name: 'Azure APIM', level: percentToLevel(80), category: 'API Management' },
    { name: 'AWS API Gateway', level: percentToLevel(50), category: 'API Management' },
    
    // Observability
    { name: 'Langsmith', level: percentToLevel(90), category: 'Observability' },
    { name: 'Open Telemetry', level: percentToLevel(80), category: 'Observability' },
    { name: 'Bugsnag', level: percentToLevel(80), category: 'Observability' },
    { name: 'Cloud Logging', level: percentToLevel(80), category: 'Observability' },
    { name: 'Google Analytics', level: percentToLevel(80), category: 'Observability' },
    { name: 'Dynatrace', level: percentToLevel(80), category: 'Observability' },
    
    // Integrations
    { name: 'Redis', level: percentToLevel(90), category: 'Integrations' },
    { name: 'EventGrid', level: percentToLevel(90), category: 'Integrations' },
    { name: 'Kafka', level: percentToLevel(85), category: 'Integrations' },
    { name: 'PubSub/EventBus/SQS', level: percentToLevel(85), category: 'Integrations' },
    
    // Database
    { name: 'Firestore', level: percentToLevel(90), category: 'Database' },
    { name: 'Oracle Database', level: percentToLevel(80), category: 'Database' },
    { name: 'MongoDB', level: percentToLevel(80), category: 'Database' },
    { name: 'MySQL', level: percentToLevel(80), category: 'Database' },
    { name: 'PostGres', level: percentToLevel(60), category: 'Database' },
    { name: 'ElasticSearch', level: percentToLevel(80), category: 'Database' },
    { name: 'Neo4j', level: percentToLevel(80), category: 'Database' },
    { name: 'Typesense', level: percentToLevel(80), category: 'Database' },    
    // Warehouses
    { name: 'BigQuery', level: percentToLevel(80), category: 'Warehouses' },
    { name: 'Snowflake', level: percentToLevel(60), category: 'Warehouses' },
    
    // Security and Compliance
    { name: 'Firebase Auth', level: percentToLevel(90), category: 'Security and Compliance' },
    { name: 'Auth0', level: percentToLevel(80), category: 'Security and Compliance' },
    { name: 'Oracle IAM', level: percentToLevel(80), category: 'Security and Compliance' },
    { name: 'Azure AD', level: percentToLevel(80), category: 'Security and Compliance' },
    { name: 'Google Identity Platform', level: percentToLevel(80), category: 'Security and Compliance' },
    { name: 'SOC2', level: percentToLevel(80), category: 'Security and Compliance' },
    { name: 'Data Retention and Purge', level: percentToLevel(80), category: 'Security and Compliance' },
    { name: 'AuthN/AuthZ', level: percentToLevel(80), category: 'Security and Compliance' },
    { name: 'SOX Controls', level: percentToLevel(60), category: 'Security and Compliance' },
    { name: 'Vanta', level: percentToLevel(60), category: 'Security and Compliance' },
    // Development Environments (IDE/Editors)
    { name: 'Cursor', level: percentToLevel(90), category: 'Development Environments' },
    { name: 'VSCode', level: percentToLevel(90), category: 'Development Environments' },
    { name: 'IntelliJ', level: percentToLevel(90), category: 'Development Environments' },
    { name: 'Eclipse', level: percentToLevel(90), category: 'Development Environments' },
    // Productivity Tools
    { name: 'Status Hero', level: percentToLevel(80), category: 'Productivity Tools' },
    { name: 'Notion', level: percentToLevel(65), category: 'Productivity Tools' },
    { name: 'Monday.com', level: percentToLevel(65), category: 'Productivity Tools' }
  ],
  experience: [
    {
      title: 'Co-Founder and CTO',
      company: 'Moltin AI/Packerland Ventures',
      startDate: '2022-01',
      current: true,
      logo: '/moltin-logo-white.svg',
      description: [
        'Built an agentic AI platform, from ground-up, for the Transportation and Logistics industry that helps Carriers/Shippers and Trading Partners create digital employees to reduce the operational expense of various back-office roles',
        'Organized and lead the workshops with customers to study the operational procedures in various key departments and gathered insights on the areas of opportunity',
        'Architected the platform for various Enterprise-Grade features keeping in mind the data isolation, application, data and network security, configurability and auditability',
        'Implemented policies for data isolation, application, data and network security, configurability and auditability for SOC2 compliance',
        'Created an enterprise Gen AI enablement program to help enterprises adopt Gen AI with focus on Data Enablement, Contextual Awareness and Agentic Workflows',
        'Established strategic technical partnerships with industry leaders to bootstrap the company as part of the incubation program at Schneider'
      ],
      technologies: ['Python', 'TypeScript', 'Langgraph','DSPY/GEPA', 'Vertex AI', 'Kubernetes', 'Terraform', 'GCP', 'Azure','Gemini','Cloudflare','Langsmith','Auth0','Vanta']
    },
    {
      title: 'Solutions and Technical Architect, Driver Pay',
      company: 'Schneider',
      startDate: '2021-05',
      endDate: '2022-01',
      logo: '/schneider_logo.png',
      description: [
        'Architected cloud-native real-time pay calculation system replacing legacy Oracle product',
        'Built platform using Spring Boot, Node, React, Kafka, Kubernetes, Keda, and MongoDB in Azure',
        'Designed rule-based data gates with Kafka for simplified real-time pay calculations',
        'Optimized platform for performance, stability, and scalability',
        'Served as key member of Master Design Team for project deliverables'
      ],
      technologies: ['Spring Boot', 'Node.js', 'React', 'Kafka', 'Kubernetes', 'KEDA', 'MongoDB', 'Azure']
    },
    {
      title: 'Technical Architect, Driver Telematics Platform',
      company: 'Schneider',
      startDate: '2019-08',
      endDate: '2022-01',
      logo: '/schneider_logo.png',
      description: [
        'Partnered with Startups and Vendors to drive the architecture for multi-cloud platform (AWS, Azure, GCP) and Samsung/Android devices',
        'Led implementation of Kafka, Keda, and serverless technologies through Architecture Review Board',
        'Designed containerization strategy using Kubernetes and Docker for cross-cloud deployments',
        'Created architectural blueprints for integrations and application development',
        'Implemented event-based design patterns to optimize platform performance and stability'
      ],
      technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Kafka', 'KEDA', 'Kafka']
    },
    {
      title: 'Product and Integrations Architect, Oracle Fusion',
      company: 'Schneider',
      startDate: '2010-08',
      endDate: '2019-04',
      logo: '/schneider_logo.png',
      description: [
        'Led Schneider\'s first major cloud initiative, migrating HCM functionality and 100+ integrations to Oracle Cloud and Azure',
        'Managed global single instance architecture and co-existence strategy across cloud pillars',
        'Coordinated with Oracle\'s Product Development, COE, Hosting, and Operations teams',
        'Established POD/Cloud environment strategy',
        'Implemented SSO and user provisioning using Oracle Identity Management',
        'Collaborated with implementation partners to ensure best practices'
      ],
      technologies: ['Oracle Cloud', 'Azure', 'Oracle Identity Management', 'Oracle Fusion']
    },
    {
      title: 'SOA Architecture Consultant',
      company: 'Independent',
      startDate: '2008-02',
      endDate: '2010-07',
      description: [
        'Provided SOA architecture consulting services to various clients'
      ],
      technologies: ['SOA', 'Enterprise Architecture']
    },
    {
      title: 'Tech Lead',
      company: 'ADP India',
      startDate: '2006-10',
      endDate: '2008-02',
      logo: '/adp_logo.png',
      description: [
        'Led technical teams in developing enterprise solutions'
      ],
      technologies: []
    },
    {
      title: 'Programmer Analyst',
      company: 'Syntel India',
      startDate: '2004-07',
      endDate: '2006-09',
      logo: '/syntel_logo.png',
      description: [
        'Developed and maintained enterprise applications'
      ],
      technologies: []
    }
  ],
  education: [
    {
      degree: 'Bachelor of Technology',
      institution: 'JNTU College Of Engineering',
      location: 'India',
      graduationDate: '2004'
    }
  ],
  certifications: [
    'Certified AWS Solutions Architect',
    'Certified Kubernetes Application Developer'
  ]
}
