// Chat Page - STRICT IMPLEMENTATION
import { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import ChatBubble from '../components/features/ChatBubble';
import Button from '../components/ui/Button';
import './Chat.css';

const Chat = () => {
  const { chatHistory, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'What is my fitness goal?',
    'How can I lose weight?',
    'Best exercises for muscle gain',
    'What should I eat today?'
  ];

  return (
    <div className="chat-page">
      <TopBar title="Chat with Aacharya" showProgress={false} />
      
      <div className="chat-content">
        {chatHistory.length === 0 ? (
          <div className="chat-empty">
            <div className="chat-avatar float">💪</div>
            <h2 className="chat-welcome">Hey Champion! 🙌</h2>
            <p className="chat-intro">
              I'm Aacharya, your AI habit mentor. Ask me anything about fitness, nutrition, or workouts!
            </p>
            
            <div className="quick-questions">
              <p className="quick-label">Quick questions:</p>
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-question glass"
                  onClick={() => {
                    setInput(question);
                    sendMessage(question);
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="chat-messages">
            {chatHistory.map((message) => (
              <ChatBubble
                key={message.id}
                message={message}
                sender={message.sender}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="chat-input-container glass">
        <textarea
          className="chat-input"
          placeholder="Ask Aacharya..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={1}
        />
        <Button
          variant="primary"
          size="md"
          onClick={handleSend}
          disabled={!input.trim()}
          icon="📤"
        >
          Send
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Chat;
