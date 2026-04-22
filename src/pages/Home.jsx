// Home Page - STRICT IMPLEMENTATION
import { useApp } from '../context/AppContext';
import { useMissions } from '../hooks/useMissions';
import { useStreak } from '../hooks/useStreak';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import MissionCard from '../components/features/MissionCard';
import StreakCard from '../components/features/StreakCard';
import ConfettiCanvas from '../components/canvas/ConfettiCanvas';
import RankUpCinematic from '../components/canvas/RankUpCinematic';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const { getDailyMissions, showConfetti, hideConfetti } = useMissions();
  const { streak } = useStreak();
  const { user, rank, showRankUpCinematic } = state;

  const dailyMissions = getDailyMissions();
  const completedCount = dailyMissions.filter(m => m.completed).length;

  return (
    <div className="home-page">
      <TopBar title="Home" />
      
      <div className="home-content">
        <section className="welcome-section fade-up">
          <h1 className="welcome-title">
            Hey, <span className="text-gradient">{user.name || 'Champion'}</span>! 💪
          </h1>
          <p className="welcome-subtitle">
            Your goal: <span className="text-purple">{user.goal?.name || 'Not set'}</span>
          </p>
        </section>

        <section className="streak-section fade-up">
          <StreakCard streak={streak} />
        </section>

        <section className="daily-missions-section fade-up">
          <div className="section-header">
            <h2 className="section-title">Today's Missions</h2>
            <span className="mission-count number">
              {completedCount}/{dailyMissions.length}
            </span>
          </div>
          
          <div className="missions-grid">
            {dailyMissions.slice(0, 3).map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
          
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate('/missions')}
          >
            View All Missions
          </Button>
        </section>

        <section className="quick-actions-section fade-up">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            <GlassCard className="action-card" onClick={() => navigate('/chat')} hover>
              <div className="action-icon">💬</div>
              <h3 className="action-title">Chat</h3>
              <p className="action-description">Ask Aacharya</p>
            </GlassCard>
            
            <GlassCard className="action-card" onClick={() => navigate('/scanner')} hover>
              <div className="action-icon">📸</div>
              <h3 className="action-title">Scanner</h3>
              <p className="action-description">Identify herbs</p>
            </GlassCard>
            
            <GlassCard className="action-card" onClick={() => navigate('/progress')} hover>
              <div className="action-icon">📊</div>
              <h3 className="action-title">Progress</h3>
              <p className="action-description">View stats</p>
            </GlassCard>
            
            <GlassCard className="action-card" onClick={() => navigate('/avatar')} hover>
              <div className="action-icon">👤</div>
              <h3 className="action-title">Avatar</h3>
              <p className="action-description">Customize</p>
            </GlassCard>
          </div>
        </section>
      </div>

      <BottomNav />
      
      {showConfetti && <ConfettiCanvas active={true} onComplete={hideConfetti} />}
      {showRankUpCinematic && <RankUpCinematic rank={rank} onComplete={() => {}} />}
    </div>
  );
};

export default Home;
