import { getDb, usePostgres, pgGetIssues } from '@/lib/db';
import { addIssue } from '@/app/actions';
import IssueClient from '../components/IssueClient';

export default async function IssuesPage() {
  let issues: any[] = [];
  if (usePostgres) {
    issues = await pgGetIssues();
  } else {
    const db = await getDb();
    issues = db.issues || [];
  }

  return (
    <div>
      <div className="glass glass-panel">
        <h2>Report an Issue</h2>
        <p style={{ marginBottom: '24px' }}>Is the oven broken? Missing a mop? Report it here.</p>
        
        <form action={addIssue} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input name="title" placeholder="Issue title (e.g. Oven 2 is broken)" className="input" style={{ marginBottom: 0 }} required />
          <textarea 
            name="description" 
            placeholder="Details..." 
            className="input" 
            style={{ minHeight: '80px', resize: 'vertical', marginBottom: 0 }}
          ></textarea>
          <button type="submit" className="btn">Report Issue</button>
        </form>
      </div>

      <h3>Open Issues</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
        {issues.length === 0 && <p>No open issues! 🎉</p>}
        {issues.map((issue: any) => (
          <IssueClient key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}
