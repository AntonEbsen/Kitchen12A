'use client';

import { toggleIssueStatus } from '@/app/actions';
import { useTransition } from 'react';

export default function IssueClient({ issue }: { issue: any }) {
  const [isPending, startTransition] = useTransition();

  const handleResolve = () => {
    startTransition(() => {
      toggleIssueStatus(issue.id, 'RESOLVED');
    });
  };

  return (
    <div className={`glass glass-panel ${issue.status === 'RESOLVED' ? 'completed' : ''}`} style={{ marginBottom: 0, opacity: issue.status === 'RESOLVED' ? 0.6 : 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>
            {issue.status === 'RESOLVED' ? '✅ ' : '🚨 '}
            {issue.title}
          </h4>
          {issue.description && <p style={{ fontSize: '0.9rem', marginBottom: '8px' }}>{issue.description}</p>}
        </div>
        {issue.status === 'OPEN' && (
          <button onClick={handleResolve} disabled={isPending} className="btn btn-success" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            {isPending ? '...' : 'Mark Resolved'}
          </button>
        )}
      </div>
    </div>
  );
}
