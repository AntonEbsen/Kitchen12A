import { getDb, usePostgres, pgGetExpenses, pgGetAnnouncements } from '@/lib/db';
import { sql } from '@vercel/postgres';

export default async function StatsPage() {
  let expenses: any[] = [];
  let announcements: any[] = [];
  let taskLogs: any[] = [];

  if (usePostgres) {
    expenses = await pgGetExpenses();
    announcements = await pgGetAnnouncements();
    const taskResult = await sql`SELECT * FROM task_logs`;
    taskLogs = taskResult.rows;
  } else {
    const db = await getDb();
    expenses = db.expenses || [];
    announcements = db.announcements || [];
    taskLogs = db.taskLogs || [];
  }

  // Analytics Calculations
  
  // 1. Top Spenders
  const spentByPerson = expenses.reduce((acc: any, exp: any) => {
    acc[exp.author] = (acc[exp.author] || 0) + Number(exp.amount || 0);
    return acc;
  }, {});
  const topSpenders = Object.entries(spentByPerson).sort((a: any, b: any) => b[1] - a[1]);

  // 2. Top Cleaners
  const tasksByRoom = taskLogs.reduce((acc: any, log: any) => {
    const room = log.roomId || log.room_id;
    acc[room] = (acc[room] || 0) + 1;
    return acc;
  }, {});
  const topCleaners = Object.entries(tasksByRoom).sort((a: any, b: any) => b[1] - a[1]);

  // 3. Chatterboxes
  const messagesByPerson = announcements.reduce((acc: any, msg: any) => {
    acc[msg.author] = (acc[msg.author] || 0) + 1;
    return acc;
  }, {});
  const chatterboxes = Object.entries(messagesByPerson).sort((a: any, b: any) => b[1] - a[1]);

  const renderRanking = (title: string, data: any[], unit: string) => (
    <div className="glass glass-panel" style={{ flex: 1, minWidth: '250px' }}>
      <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>{title}</h3>
      {data.length === 0 && <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Not enough data yet.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.slice(0, 5).map(([name, value], idx) => (
          <li key={name} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: idx < data.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <span>
              {idx === 0 && '🥇 '}
              {idx === 1 && '🥈 '}
              {idx === 2 && '🥉 '}
              {idx > 2 && `${idx + 1}. `}
              <strong>{name}</strong>
            </span>
            <span style={{ color: 'var(--text-muted)' }}>{value} {unit}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <div className="glass glass-panel" style={{ textAlign: 'center' }}>
        <h2>Kitchen Analytics 📈</h2>
        <p>Who is carrying the kitchen? Find out here.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {renderRanking('💸 Top Spenders', topSpenders, 'DKK')}
        {renderRanking('🧼 Top Cleaners', topCleaners, 'tasks')}
        {renderRanking('🗣️ Chatterboxes', chatterboxes, 'msgs')}
      </div>
    </div>
  );
}
