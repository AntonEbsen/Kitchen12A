'use client';

import { addShoppingItem, toggleShoppingItem } from '@/app/actions';
import { useTransition } from 'react';

export default function ShoppingClient({ items }: { items: any[] }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (id: number, bought: boolean) => {
    startTransition(() => {
      toggleShoppingItem(id, bought);
    });
  };

  return (
    <div>
      <form action={addShoppingItem} style={{ marginBottom: '24px', display: 'flex', gap: '8px' }}>
        <input 
          name="name" 
          placeholder="e.g. Dish soap, sponges..." 
          className="input" 
          style={{ marginBottom: 0 }}
          required 
        />
        <button type="submit" className="btn">Add Item</button>
      </form>

      <ul className="task-list">
        {items.length === 0 && <p>No items needed right now.</p>}
        {items.map((item) => (
          <li key={item.id} className={`task-item ${item.bought ? 'completed' : ''}`}>
            <span>{item.name}</span>
            <button 
              onClick={() => handleToggle(item.id, !item.bought)}
              disabled={isPending}
            >
              ✓
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
