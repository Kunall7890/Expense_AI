
import { SentimentType } from "../types/chat";

const positiveResponses = [
  "I'm so glad to hear that! How can I continue to help you today?",
  "That's fantastic! Is there anything else you'd like to discuss?",
  "Great! I'm happy I could be of assistance. What else can I help with?",
  "Excellent! Let me know if you need anything else.",
  "I'm thrilled that you're happy! What would you like to talk about next?"
];

const neutralResponses = [
  "I understand. Is there something specific you're looking for?",
  "Thanks for sharing. How else can I assist you today?",
  "I see. Would you like more information about anything in particular?",
  "Noted. Is there anything specific you'd like to know?",
  "I'm here to help. What more would you like to discuss?"
];

const negativeResponses = [
  "I'm sorry to hear that. How can I help improve your experience?",
  "I apologize for any frustration. Let me try to help resolve this for you.",
  "I'm sorry things aren't going well. Can you tell me more about what's happening?",
  "I understand this is frustrating. Let's work together to find a solution.",
  "I apologize for the inconvenience. What can I do to make this better for you?"
];

// Get a random response based on the detected sentiment
export const getBotResponse = (sentiment: SentimentType): string => {
  let responses;
  
  switch (sentiment) {
    case 'positive':
      responses = positiveResponses;
      break;
    case 'negative':
      responses = negativeResponses;
      break;
    case 'neutral':
    default:
      responses = neutralResponses;
      break;
  }
  
  // Return a random response from the appropriate list
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

// Initial greeting messages from the bot
export const getGreeting = (): string => {
  const greetings = [
    "Hello! I'm ChatMood, an AI assistant with sentiment analysis. How can I help you today?",
    "Hi there! I'm ChatMood. I can detect emotions in your messages. What can I assist you with?",
    "Welcome! I'm ChatMood, your friendly AI assistant. How are you feeling today?",
    "Greetings! I'm ChatMood, ready to chat and analyze sentiments. How may I help you?"
  ];
  
  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
};
