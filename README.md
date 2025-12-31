<<<<<<< Updated upstream
#repo
=======
# Resume Website

A beautiful, interactive resume website built with Vue 3, TypeScript, and Firebase Hosting. Features include AI-powered chat functionality, PDF export, and a stunning modern design.

## Features

- 🎨 **Stellar Design**: Modern, eye-catching UI with smooth animations
- 💬 **AI Chat**: Chat with your resume using AI-powered responses
- 📄 **PDF Export**: Download your resume as a PDF
- 📱 **Responsive**: Fully responsive design that works on all devices
- ⚡ **Fast**: Built with Vue 3 and Vite for optimal performance
- 🔥 **Firebase Hosting**: Easy deployment with Firebase

## Sections

- Hero section with headshot
- Contact information
- Skills with proficiency levels
- Work experience timeline
- Education
- Projects (optional)
- Certifications (optional)

## Getting Started

### Prerequisites

- Node.js 20+ or 22+
- npm or yarn
- Firebase account (for hosting)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Update resume data:
   - Edit `src/data/resume.ts` with your actual resume information
   - Add your headshot image to `public/headshot.jpg` (or update the path in resume data)

3. Configure Firebase (optional, for hosting):
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Copy your Firebase config
   - Create a `.env` file in the root directory:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   - Update `.firebaserc` with your project ID

### Development

Run the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

Build the project:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deploying to Firebase

1. Login to Firebase:
```bash
npx firebase login
```

2. Initialize Firebase (if not already done):
```bash
npx firebase init hosting
```

3. Deploy:
```bash
npm run deploy
```

Or manually:
```bash
npm run build
npx firebase deploy --only hosting
```

## Customization

### Updating Resume Data

Edit `src/data/resume.ts` to update your resume information. The data structure is fully typed for TypeScript support.

### Styling

The design uses a modern gradient color scheme (purple/blue). To customize:
- Update CSS variables in component files
- Modify gradient colors in `linear-gradient()` functions
- Adjust spacing and typography in component styles

### Chat Functionality

The chat feature currently uses rule-based responses. To integrate with an actual AI service:
1. Update `src/components/ChatModal.vue`
2. Replace the `generateAIResponse` function with an API call to your AI service (OpenAI, Anthropic, etc.)
3. Add API keys to `.env` file

## Project Structure

```
resume-website/
├── src/
│   ├── components/       # Vue components
│   │   ├── ResumeHero.vue
│   │   ├── ContactSection.vue
│   │   ├── SkillsSection.vue
│   │   ├── ExperienceSection.vue
│   │   ├── EducationSection.vue
│   │   └── ChatModal.vue
│   ├── data/            # Resume data
│   │   └── resume.ts
│   ├── types/           # TypeScript types
│   │   └── resume.ts
│   ├── utils/           # Utility functions
│   │   └── pdfExport.ts
│   ├── config/          # Configuration
│   │   └── firebase.ts
│   └── views/           # Page views
│       └── HomeView.vue
├── public/              # Static assets
├── firebase.json        # Firebase hosting config
└── .firebaserc          # Firebase project config
```

## Technologies Used

- **Vue 3**: Progressive JavaScript framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool
- **Firebase**: Hosting and analytics
- **jsPDF**: PDF generation
- **html2canvas**: HTML to canvas conversion

## License

MIT

## Support

For issues or questions, please open an issue on the repository.
>>>>>>> Stashed changes
