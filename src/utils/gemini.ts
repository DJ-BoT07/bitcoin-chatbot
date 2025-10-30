import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini AI client with the API key
const ai = new GoogleGenAI({ apiKey: 'AIzaSyBcNBHcRbE-3Ka7axdmvB0CJWkyxcOdsvU' });

export const getChatResponse = async (message: string) => {
  const prompt = `You are a knowledgeable blockchain and cryptocurrency expert. Only provide information related to blockchain technology, cryptocurrencies, and related topics. If asked about anything else, politely redirect the conversation back to blockchain/crypto topics.

User's message: ${message}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text || 'Sorry, I could not generate a response. Please try again.';
  } catch (error) {
    console.error('Error getting response from Gemini:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
};