// Chat Hook - STRICT IMPLEMENTATION
import { useApp } from '../context/AppContext';
import { getChatResponse } from '../data/chatResponses';

export const useChat = () => {
  const { state, dispatch } = useApp();

  const sendMessage = (message) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });

    // Get AI response
    setTimeout(() => {
      const responseText = getChatResponse(message);
      const aiMessage = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiMessage });
      
      // Check for chat badge
      if (state.stats.totalChatMessages + 1 >= 50) {
        dispatch({ type: 'UNLOCK_BADGE', payload: 'chat-50' });
      }
    }, 500);
  };

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_CHAT_HISTORY' });
  };

  return {
    chatHistory: state.chatHistory,
    sendMessage,
    clearHistory
  };
};
