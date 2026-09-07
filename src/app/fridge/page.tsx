import { getDb, usePostgres, pgGetFridgeItems } from '@/lib/db';
import { addFridgeItem } from '@/app/actions';
import FridgeClient from '../components/FridgeClient';

export default async function FridgePage() {
  let items: any[] = [];
  if (usePostgres) {
    items = await pgGetFridgeItems();
  } else {
    const db = await getDb();
    items = db.fridgeItems || [];
  }

  return (
    <div>
      <div className="glass glass-panel">
        <h2>Fridge Tracker ❄️</h2>
        <p style={{ marginBottom: '24px' }}>Log your food so it doesn't expire, or give it away to the kitchen!</p>
        
        <form action={addFridgeItem} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input name="name" placeholder="Item (e.g. Milk)" className="input" style={{ marginBottom: 0 }} required />
            <input name="owner" placeholder="Your Name" className="input" style={{ marginBottom: 0 }} required />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Expires:</label>
            <input name="expiresAt" type="date" className="input" style={{ marginBottom: 0 }} required />
          </div>
          <button type="submit" className="btn btn-success">Put in Fridge</button>
        </form>
      </div>

      <FridgeClient items={items} />
    </div>
  );
}
