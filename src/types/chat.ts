export interface ChatMessage {
  id: string;
  text: string;
  isFromUser?: boolean;
  sender: 'user' | 'support';
  timestamp: Date | number;
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping?: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
}

export interface ChatActions {
  sendMessage: (text: string) => void;
  toggleChat: () => void;
  clearMessages: () => void;
  addMessage: (message: ChatMessage) => void;
}

export interface WhatsAppChatConfig {
  phoneNumber: string;
  businessName: string;
  welcomeMessage?: string;
  triggerMessage?: string;
  buttonText?: string;
  position?: 'bottom-right' | 'bottom-left';
  theme?: 'green' | 'blue' | 'custom';
}