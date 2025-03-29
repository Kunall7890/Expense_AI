
import { v4 as uuidv4 } from 'uuid';

export interface MatchResult {
  score: number;
  keywordMatches: { keyword: string; found: boolean }[];
  suggestions: string[];
}

/**
 * Extracts key skills and requirements from job description
 */
const extractKeywords = (jobDescription: string): string[] => {
  // In a real application, this would use NLP to extract actual keywords
  // For this demo, we'll simulate it with a simplified approach
  
  const commonKeywords = [
    "javascript", "typescript", "react", "node", "express", "mongodb", "sql",
    "python", "java", "c#", "agile", "scrum", "project management", "leadership",
    "communication", "teamwork", "problem solving", "analytics", "data analysis",
    "marketing", "sales", "customer service", "design", "ux", "ui", "research",
    "development", "testing", "devops", "cloud", "aws", "azure", "gcp"
  ];
  
  // Extract words that appear in the job description and are in our common keywords list
  const keywords = commonKeywords.filter(keyword => 
    jobDescription.toLowerCase().includes(keyword.toLowerCase())
  );
  
  // Add some random keywords from the job description
  const words = jobDescription
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 5);
  
  const uniqueWords = [...new Set(words)];
  const randomWords = uniqueWords
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(5, uniqueWords.length));
  
  return [...new Set([...keywords, ...randomWords])];
};

/**
 * Analyzes resume against job description
 */
export const analyzeResume = (resumeText: string, jobDescription: string): MatchResult => {
  // Extract keywords from job description
  const keywords = extractKeywords(jobDescription);
  
  // Check for keyword matches in resume
  const keywordMatches = keywords.map(keyword => ({
    keyword,
    found: resumeText.toLowerCase().includes(keyword.toLowerCase())
  }));
  
  // Calculate match score based on keyword matches
  const matchedCount = keywordMatches.filter(match => match.found).length;
  const score = Math.round((matchedCount / keywords.length) * 100);
  
  // Generate suggestions based on missing keywords
  const missingKeywords = keywordMatches
    .filter(match => !match.found)
    .map(match => match.keyword);
  
  const suggestions = [];
  
  if (missingKeywords.length > 0) {
    suggestions.push(`Consider adding these missing keywords: ${missingKeywords.slice(0, 3).join(', ')}${missingKeywords.length > 3 ? '...' : ''}`);
  }
  
  // Add general suggestions
  if (score < 70) {
    suggestions.push("Tailor your resume more specifically to the job requirements");
  }
  
  if (resumeText.length < 1500) {
    suggestions.push("Your resume might be too short. Consider adding more relevant details about your experience");
  }
  
  if (resumeText.split(/\n+/).length < 10) {
    suggestions.push("Improve resume structure with clear sections for experience, skills, and education");
  }
  
  return {
    score,
    keywordMatches,
    suggestions
  };
};
