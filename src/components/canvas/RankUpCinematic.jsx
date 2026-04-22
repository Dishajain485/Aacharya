// Rank Up Cinematic - STRICT IMPLEMENTATION
import { useEffect } from 'react';
import './RankUpCinematic.css';

const RankUpCinematic = ({ rank, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="rank-up-cinematic">
      <div className="cinematic-overlay"></div>
      <div className="cinematic-content rank-up-cinematic">
        <div className="rank-icon-massive float">{rank.icon}</div>
        <h1 className="rank-title fade-up" style={{ color: rank.color }}>
          RANK UP!
        </h1>
        <h2 className="rank-name-large fade-up" style={{ color: rank.color, animationDelay: '0.2s' }}>
          {rank.name}
        </h2>
        <p className="rank-letter-large fade-up" style={{ color: rank.color, animationDelay: '0.4s' }}>
          Rank {rank.id}
        </p>
        <div className="rank-glow" style={{ boxShadow: `0 0 100px ${rank.color}` }}></div>
      </div>
    </div>
  );
};

export default RankUpCinematic;
