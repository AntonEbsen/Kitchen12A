import { getDb, usePostgres, pgGetWikiPages } from '@/lib/db';
import { addWikiPage } from '@/app/actions';

export default async function WikiPage() {
  let pages: any[] = [];
  if (usePostgres) {
    pages = await pgGetWikiPages();
  } else {
    const db = await getDb();
    pages = db.wikiPages || [];
  }

  const recipes = pages.filter(p => p.category === 'RECIPE');
  const rules = pages.filter(p => p.category === 'RULE');

  const renderPage = (page: any) => (
    <div key={page.id} className="glass glass-panel" style={{ marginBottom: '16px' }}>
      <h3 style={{ marginBottom: '8px', color: 'var(--primary)' }}>{page.title}</h3>
      <p style={{ whiteSpace: 'pre-wrap', marginBottom: '12px' }}>{page.content}</p>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>By {page.author} • {new Date(page.createdAt || page.created_at).toLocaleDateString()}</span>
    </div>
  );

  return (
    <div>
      <div className="glass glass-panel">
        <h2>Kitchen Wiki 📖</h2>
        <p style={{ marginBottom: '24px' }}>Share your best cheap recipes or document how to clean the oven properly.</p>
        
        <form action={addWikiPage} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <select name="category" className="input" style={{ marginBottom: 0, flex: 1 }} required>
              <option value="RECIPE">Recipe 🍲</option>
              <option value="RULE">Rule / Guide 🧼</option>
            </select>
            <input name="title" placeholder="Title (e.g. Grandma's Pasta)" className="input" style={{ marginBottom: 0, flex: 2 }} required />
          </div>
          <textarea 
            name="content" 
            placeholder="Write your recipe or guide here..." 
            className="input" 
            style={{ minHeight: '120px', resize: 'vertical', marginBottom: 0 }}
            required
          ></textarea>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input name="author" placeholder="Your Name" className="input" style={{ marginBottom: 0 }} required />
            <button type="submit" className="btn btn-success" style={{ flex: 1 }}>Publish</button>
          </div>
        </form>
      </div>

      <h2>Recipes 🍲</h2>
      {recipes.length === 0 && <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>No recipes yet. Share one!</p>}
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '32px' }}>
        {recipes.map(renderPage)}
      </div>

      <h2>Rules & Guides 🧼</h2>
      {rules.length === 0 && <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>No rules logged.</p>}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {rules.map(renderPage)}
      </div>
    </div>
  );
}
