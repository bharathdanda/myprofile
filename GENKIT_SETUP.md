# Firebase Genkit Setup Guide

This guide explains how to set up Firebase Genkit for the ChatModal functionality.

## Overview

The ChatModal now uses Firebase Genkit for AI-powered responses. The frontend is configured to call a Genkit backend API endpoint. If the Genkit backend is not available, it will automatically fall back to a simple rule-based response system.

## Frontend Configuration

The frontend is already set up and ready to use. You just need to configure the Genkit API URL.

### Environment Variables

Add the following to your `.env` file:

```env
VITE_GENKIT_API_URL=http://localhost:4000/api/chat
```

For production, update this to your deployed Genkit server URL.

## Backend Setup Options

### Option 1: Simple Express Server (Recommended for Development)

1. Create a new directory for your Genkit server:
```bash
mkdir genkit-server
cd genkit-server
npm init -y
```

2. Install dependencies:
```bash
npm install express @genkit-ai/core @genkit-ai/googleai
```

3. Create a `server.js` file (see `genkit-server.example.js` for reference)

4. Set your Google AI API key:
```bash
export GOOGLE_GENAI_API_KEY=your-api-key-here
```

5. Run the server:
```bash
node server.js
```

### Option 2: Firebase Functions

1. Initialize Firebase Functions in your project:
```bash
firebase init functions
```

2. Install Genkit in the functions directory:
```bash
cd functions
npm install @genkit-ai/core @genkit-ai/googleai
```

3. Create a callable function that uses Genkit

4. Deploy:
```bash
firebase deploy --only functions
```

### Option 3: Cloud Run / Other Cloud Services

Deploy the Genkit server to any cloud service that supports Node.js:
- Google Cloud Run
- AWS Lambda
- Azure Functions
- Vercel
- Netlify Functions

## API Endpoint Format

The Genkit backend should accept POST requests to `/api/chat` with the following format:

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "What is your experience?" },
    { "role": "assistant", "content": "..." }
  ],
  "context": "Formatted resume context string...",
  "resumeData": {
    "name": "Bharath Danda",
    "title": "Technology Leader, Architect, & CTO",
    "summary": "..."
  }
}
```

**Response:**
```json
{
  "response": "AI-generated response text here..."
}
```

## Fallback Behavior

If the Genkit API is unavailable or returns an error, the frontend will automatically:
1. Catch the error
2. Fall back to the rule-based response system
3. Continue functioning normally

This ensures the chat always works, even without a Genkit backend.

## Testing

1. Start your Genkit backend server
2. Ensure `VITE_GENKIT_API_URL` points to your server
3. Open the ChatModal in the app
4. Ask questions about the resume
5. Check the browser console for any errors

## Troubleshooting

- **CORS errors**: Make sure your Genkit server allows requests from your frontend domain
- **404 errors**: Verify the API URL is correct
- **500 errors**: Check your Genkit server logs
- **Fallback always used**: Check that your Genkit server is running and accessible

## Next Steps

- Add authentication if needed
- Implement rate limiting
- Add conversation history persistence
- Enhance the prompt engineering for better responses
- Add streaming responses for better UX

