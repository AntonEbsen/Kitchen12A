import { getDb, usePostgres, pgGetAnnouncements } from '@/lib/db';
import { addAnnouncement } from '@/app/actions';

export default async function BoardPage() {
  let announcements: any[] = [];
  if (usePostgres) {
    announcements = await pgGetAnnouncements();
  } else {
    const db = await getDb();
    announcements = db.announcements || [];
  }

  return (
    <div>
      <div className="glass glass-panel">
        <h2>Notice Board</h2>
        <p style={{ marginBottom: '24px' }}>Leave messages for the kitchen.</p>
        
        <form action={addAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input name="author" placeholder="Your name / Room number" className="input" style={{ marginBottom: 0 }} required />
          <textarea 
            name="content" 
            placeholder="What's on your mind? (e.g. Having a party Friday!)" 
            className="input" 
            style={{ minHeight: '100px', resize: 'vertical', marginBottom: 0 }}
            required
          ></textarea>
          <button type="submit" className="btn">Post Message</button>
        </form>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {announcements.map((msg: any) => (
          <div key={msg.id} className="glass glass-panel" style={{ marginBottom: 0 }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{msg.content}</p>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>— {msg.author}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
