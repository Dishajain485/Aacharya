// Profile Page - STRICT IMPLEMENTATION
import { useApp } from '../context/AppContext';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import AvatarDisplay from '../components/features/AvatarDisplay';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import ToggleSwitch from '../components/ui/ToggleSwitch';
import './Profile.css';

const Profile = () => {
  const { state, dispatch } = useApp();
  const { user, xp, rank, streak, stats } = state;

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      dispatch({ type: 'RESET_APP' });
      window.location.reload();
    }
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="profile-page">
      <TopBar title="Profile" showProgress={false} />
      
      <div className="profile-content">
        <section className="profile-header-section fade-up">
          <GlassCard className="profile-header">
            <AvatarDisplay avatar={user.avatar} size="lg" />
            <div className="profile-info">
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-goal">
                Goal: <span className="text-purple">{user.goal?.name || 'Not set'}</span>
              </p>
              <div className="profile-rank" style={{ color: rank.color }}>
                <span className="rank-icon">{rank.icon}</span>
                <span className="rank-name">{rank.name}</span>
                <span className="rank-letter">Rank {rank.id}</span>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="profile-stats-section fade-up">
          <h3 className="section-title">Your Stats</h3>
          <GlassCard className="stats-list">
            <div className="stat-row">
              <span className="stat-label">Total XP</span>
              <span className="stat-value number">{xp}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Current Streak</span>
              <span className="stat-value number">{streak} days</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Missions Completed</span>
              <span className="stat-value number">{stats.totalMissionsCompleted}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Items Scanned</span>
              <span className="stat-value number">{stats.totalScans}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Messages Sent</span>
              <span className="stat-value number">{stats.totalChatMessages}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Member Since</span>
              <span className="stat-value">{formatDate(stats.joinDate)}</span>
            </div>
          </GlassCard>
        </section>

        <section className="profile-settings-section fade-up">
          <h3 className="section-title">Settings</h3>
          <GlassCard className="settings-list">
            <div className="setting-row">
              <span className="setting-label">Notifications</span>
              <ToggleSwitch checked={true} onChange={() => {}} />
            </div>
            <div className="setting-row">
              <span className="setting-label">Daily Reminders</span>
              <ToggleSwitch checked={true} onChange={() => {}} />
            </div>
            <div className="setting-row">
              <span className="setting-label">Sound Effects</span>
              <ToggleSwitch checked={true} onChange={() => {}} />
            </div>
          </GlassCard>
        </section>

        <section className="profile-actions-section fade-up">
          <Button variant="secondary" fullWidth>
            Edit Profile
          </Button>
          <Button variant="ghost" fullWidth onClick={handleReset}>
            Reset Progress
          </Button>
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
