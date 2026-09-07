import { getDb, usePostgres, pgGetExpenses } from '@/lib/db';
import { addExpense } from '@/app/actions';

const MOBILEPAY_LINK = "https://qr.mobilepay.dk/box/cdb6efa8-f293-4bb9-b1f2-394294ff1f1b/pay-in";

export default async function FundPage() {
  let expenses: any[] = [];
  if (usePostgres) {
    expenses = await pgGetExpenses();
  } else {
    const db = await getDb();
    expenses = db.expenses || [];
  }

  return (
    <div>
      <div className="glass glass-panel" style={{ textAlign: 'center' }}>
        <h2>Kitchen Fund 💰</h2>
        <p style={{ marginBottom: '24px' }}>Contribute to the shared kitchen box or pay your debts.</p>
        
        <a 
          href={MOBILEPAY_LINK} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn"
          style={{ display: 'inline-block', background: '#5A78FF', fontSize: '1.1rem', padding: '16px 32px' }}
        >
          Pay with MobilePay Box
        </a>
      </div>

      <div className="glass glass-panel">
        <h3>Log an Expense</h3>
        <p style={{ marginBottom: '16px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Did you buy something for the kitchen? Log it here so everyone knows!
        </p>
        <form action={addExpense} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input name="author" placeholder="Your Name / Room" className="input" style={{ marginBottom: 0 }} required />
          <input name="description" placeholder="What did you buy?" className="input" style={{ marginBottom: 0 }} required />
          <input name="amount" type="number" placeholder="Amount in DKK" className="input" style={{ marginBottom: 0 }} required />
          <button type="submit" className="btn btn-success">Log Expense</button>
        </form>
      </div>

      <h3>Recent Expenses</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
        {expenses.length === 0 && <p>No expenses logged yet.</p>}
        {expenses.map((exp: any) => (
          <div key={exp.id} className="glass glass-panel" style={{ marginBottom: 0, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: 600 }}>{exp.description}</p>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{exp.author}</span>
            </div>
            <div style={{ fontWeight: 700, color: '#f87171' }}>
              -{exp.amount} kr
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
