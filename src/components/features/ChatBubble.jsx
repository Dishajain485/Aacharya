// Chat Bubble - STRICT IMPLEMENTATION
import './ChatBubble.css';

const ChatBubble = ({ message, sender }) => {
  const { text, timestamp } = message;
  const isUser = sender === 'user';

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`chat-bubble-wrapper ${isUser ? 'user' : 'ai'} slide-in-${isUser ? 'right' : 'left'}`}>
      <div className={`chat-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}>
        <p className="chat-text">{text}</p>
        <span className="chat-time">{formatTime(timestamp)}</span>
      </div>
    </div>
  );
};

export default ChatBubble;
