
import { SentimentType } from "../types/chat";

// A simple rule-based sentiment analyzer
export const analyzeSentiment = (text: string): SentimentType => {
  // Convert to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase();
  
  // Positive words/phrases
  const positivePatterns = [
    /good|great|excellent|amazing|awesome|love|happy|thanks|thank you|appreciate|helpful|nice|perfect|wonderful|pleased|glad|excited|fantastic|brilliant|outstanding/g
  ];
  
  // Negative words/phrases
  const negativePatterns = [
    /bad|terrible|awful|horrible|hate|angry|annoyed|disappointed|useless|stupid|dumb|waste|sucks|poor|worst|not working|doesn't work|can't|cannot|problem|issue|error|bug|fail|frustrated|terrible|annoying/g
  ];
  
  // Calculate sentiment scores
  let positiveScore = 0;
  let negativeScore = 0;
  
  for (const pattern of positivePatterns) {
    const matches = lowerText.match(pattern);
    positiveScore += matches ? matches.length : 0;
  }
  
  for (const pattern of negativePatterns) {
    const matches = lowerText.match(pattern);
    negativeScore += matches ? matches.length : 0;
  }
  
  // Determine sentiment based on scores
  if (positiveScore > negativeScore) {
    return 'positive';
  } else if (negativeScore > positiveScore) {
    return 'negative';
  } else {
    return 'neutral';
  }
};

// Get emoji for sentiment
export const getSentimentEmoji = (sentiment: SentimentType): string => {
  switch (sentiment) {
    case 'positive':
      return '😊';
    case 'negative':
      return '😞';
    case 'neutral':
    default:
      return '😐';
  }
};

// Get color for sentiment
export const getSentimentColor = (sentiment: SentimentType): string => {
  switch (sentiment) {
    case 'positive':
      return 'chatbot-positive';
    case 'negative':
      return 'chatbot-negative';
    case 'neutral':
    default:
      return 'chatbot-neutral';
  }
};
