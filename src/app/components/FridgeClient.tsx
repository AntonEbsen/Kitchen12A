'use client';

import { useTransition } from 'react';
import { toggleFreeFood, removeFridgeItem } from '@/app/actions';

export default function FridgeClient({ items }: { items: any[] }) {
  const [isPending, startTransition] = useTransition();

  const handleToggleFree = (id: number, current: boolean) => {
    startTransition(() => toggleFreeFood(id, !current));
  };

  const handleRemove = (id: number) => {
    startTransition(() => removeFridgeItem(id));
  };

  const myItems = items.filter(i => !i.isFree && !i.is_free);
  const freeItems = items.filter(i => i.isFree || i.is_free);

  const isExpired = (dateString: string) => new Date(dateString) < new Date();

  const renderItem = (item: any) => (
    <div key={item.id} className="glass glass-panel" style={{ marginBottom: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <p style={{ fontWeight: 600, color: isExpired(item.expiresAt || item.expires_at) ? '#f87171' : 'inherit' }}>
          {item.name} {isExpired(item.expiresAt || item.expires_at) ? '(Expired)' : ''}
        </p>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {item.owner} • Expires: {new Date(item.expiresAt || item.expires_at).toLocaleDateString()}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={() => handleToggleFree(item.id, item.isFree || item.is_free)} 
          disabled={isPending}
          className="btn"
          style={{ padding: '6px 12px', fontSize: '0.8rem', background: (item.isFree || item.is_free) ? 'var(--surface-hover)' : 'var(--primary)' }}
        >
          {(item.isFree || item.is_free) ? 'Unmark Free' : 'Give Away'}
        </button>
        <button 
          onClick={() => handleRemove(item.id)} 
          disabled={isPending}
          className="btn"
          style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#ef4444' }}
        >
          Trash
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <h3 style={{ marginTop: '24px', color: '#10b981' }}>🆓 Free to Take</h3>
      {freeItems.length === 0 && <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>No free food right now.</p>}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '32px' }}>
        {freeItems.map(renderItem)}
      </div>

      <h3>Personal Fridge Items</h3>
      {myItems.length === 0 && <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>No items logged.</p>}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {myItems.map(renderItem)}
      </div>
    </div>
  );
}
