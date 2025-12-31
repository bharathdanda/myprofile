/**
 * Example Genkit Server for Resume Chat
 * 
 * This is an example of how to set up a Genkit backend server.
 * To use this:
 * 1. Install dependencies: npm install express @genkit-ai/core @genkit-ai/googleai
 * 2. Set GOOGLE_GENAI_API_KEY environment variable
 * 3. Run: node genkit-server.example.js
 * 4. Update VITE_GENKIT_API_URL in your .env to point to this server
 */

import express from 'express';
import { configureGenkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';

// Configure Genkit
configureGenkit({
  plugins: [googleAI()],
  logLevel: 'info',
  enableTracingAndMetrics: true,
});

const app = express();
app.use(express.json());

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, context, resumeData } = req.body;
    
    // Import Genkit model
    const { generate } = await import('@genkit-ai/ai/model');
    const model = googleAI('gemini-1.5-flash');
    
    // Build system prompt with resume context
    const systemPrompt = `You are an AI assistant helping people learn about ${resumeData.name}, a ${resumeData.title}.
    
Your role is to answer questions about ${resumeData.name}'s professional background, experience, skills, education, and achievements.

Here is the complete resume information:

${context}

Instructions:
- Be friendly, professional, and concise
- Focus on the information provided in the resume
- If asked about something not in the resume, politely say you don't have that information
- Format your responses using markdown (use ** for bold, * for italic, etc.)
- Be specific and cite relevant details from the resume when possible`;

    // Format messages for the model
    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        content: msg.content
      }))
    ];

    // Generate response
    const result = await model.generate({
      messages: formattedMessages,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    });

    res.json({
      response: result.text,
      usage: result.usage
    });
  } catch (error) {
    console.error('Genkit error:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Genkit server running on http://localhost:${PORT}`);
  console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);
});

