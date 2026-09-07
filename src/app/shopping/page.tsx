import { getDb, usePostgres, pgGetShoppingItems } from '@/lib/db';
import ShoppingClient from '../components/ShoppingClient';

export default async function ShoppingPage() {
  let items: any[] = [];
  if (usePostgres) {
    items = await pgGetShoppingItems();
  } else {
    const db = await getDb();
    items = db.shoppingItems || [];
  }

  return (
    <div className="glass glass-panel">
      <h2>Shared Shopping List</h2>
      <p style={{ marginBottom: '24px' }}>Add things we need for the kitchen. Mark them when you bought them!</p>
      
      <ShoppingClient items={items} />
    </div>
  );
}
