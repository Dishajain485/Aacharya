// Scanner Page - STRICT IMPLEMENTATION
import { useState } from 'react';
import { useScanner } from '../hooks/useScanner';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import ScanViewport from '../components/features/ScanViewport';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import './Scanner.css';

const Scanner = () => {
  const { scanHistory, performScan } = useScanner();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    const result = await performScan();
    setIsScanning(false);
    setScanResult(result);
    setShowResult(true);
  };

  return (
    <div className="scanner-page">
      <TopBar title="Scanner" showProgress={false} />
      
      <div className="scanner-content">
        <section className="scan-section fade-up">
          <ScanViewport isScanning={isScanning} />
          
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleScan}
            disabled={isScanning}
            icon="📸"
          >
            {isScanning ? 'Scanning...' : 'Scan Item'}
          </Button>
        </section>

        <section className="scan-history-section fade-up">
          <h2 className="section-title">Recent Scans</h2>
          
          {scanHistory.length > 0 ? (
            <div className="history-list">
              {scanHistory.slice(0, 5).map((scan) => (
                <GlassCard key={scan.id} className="history-item" hover>
                  <div className="history-header">
                    <h3 className="history-name">{scan.name}</h3>
                    <span className="history-xp number">+{scan.xp} XP</span>
                  </div>
                  <p className="history-category">{scan.category}</p>
                  <p className="history-goal">{scan.goal}</p>
                </GlassCard>
              ))}
            </div>
          ) : (
            <div className="empty-state glass">
              <div className="empty-icon">📸</div>
              <h3 className="empty-title">No scans yet</h3>
              <p className="empty-description">Scan herbs and foods to learn more!</p>
            </div>
          )}
        </section>
      </div>

      <BottomNav />

      <Modal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        title="Scan Result"
        size="md"
      >
        {scanResult && (
          <div className="scan-result">
            <div className="result-header">
              <h2 className="result-name">{scanResult.name}</h2>
              <span className="result-category">{scanResult.category}</span>
            </div>
            
            <div className="result-section">
              <h4 className="result-label">Best For</h4>
              <p className="result-text">{scanResult.goal}</p>
            </div>
            
            <div className="result-section">
              <h4 className="result-label">Benefits</h4>
              <p className="result-text">{scanResult.benefits}</p>
            </div>
            
            <div className="result-section">
              <h4 className="result-label">Usage</h4>
              <p className="result-text">{scanResult.usage}</p>
            </div>
            
            <div className="result-xp">
              <span className="xp-earned number">+{scanResult.xp} XP</span>
              <span className="xp-label">Earned!</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Scanner;
