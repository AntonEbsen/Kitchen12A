export default function Loading() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass glass-panel" style={{ height: '150px', animation: 'pulse 1.5s infinite ease-in-out', opacity: 0.5 }}></div>
      <div className="glass glass-panel" style={{ height: '300px', animation: 'pulse 1.5s infinite ease-in-out', opacity: 0.5, animationDelay: '0.2s' }}></div>
      <div className="glass glass-panel" style={{ height: '200px', animation: 'pulse 1.5s infinite ease-in-out', opacity: 0.5, animationDelay: '0.4s' }}></div>
    </div>
  );
}
