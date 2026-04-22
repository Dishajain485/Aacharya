// Avatar Display - STRICT IMPLEMENTATION
import './AvatarDisplay.css';

const AvatarDisplay = ({ avatar, size = 'md' }) => {
  const { skin, hair, outfit, accessory } = avatar;

  return (
    <div className={`avatar-display avatar-${size}`}>
      <div className="avatar-container">
        {/* Simple SVG-based avatar representation */}
        <svg viewBox="0 0 200 200" className="avatar-svg">
          {/* Head */}
          <circle cx="100" cy="80" r="40" fill={skin} />
          
          {/* Body */}
          <rect x="70" y="115" width="60" height="70" rx="10" fill="#4a5568" />
          
          {/* Hair indicator */}
          <circle cx="100" cy="50" r="45" fill="#2d3748" opacity="0.8" />
          
          {/* Face features */}
          <circle cx="90" cy="75" r="3" fill="#000" />
          <circle cx="110" cy="75" r="3" fill="#000" />
          <path d="M 90 90 Q 100 95 110 90" stroke="#000" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default AvatarDisplay;
