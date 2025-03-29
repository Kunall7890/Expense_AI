
export type SentimentType = 'positive' | 'neutral' | 'negative';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sentiment?: SentimentType;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
}
