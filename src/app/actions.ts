'use server';

import { getDb, saveDb, usePostgres } from '@/lib/db';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function addShoppingItem(formData: FormData) {
  const name = formData.get('name') as string;
  if (!name) return;
  
  if (usePostgres) {
    await sql`INSERT INTO shopping_items (name) VALUES (${name})`;
  } else {
    const db = await getDb();
    db.shoppingItems.push({ id: Date.now(), name, bought: false, boughtBy: null, createdAt: new Date().toISOString() });
    await saveDb(db);
  }
  revalidatePath('/shopping');
}

export async function toggleShoppingItem(id: number, bought: boolean, boughtBy?: string) {
  if (usePostgres) {
    await sql`UPDATE shopping_items SET bought = ${bought}, bought_by = ${boughtBy || null} WHERE id = ${id}`;
  } else {
    const db = await getDb();
    const item = db.shoppingItems.find((i: any) => i.id === id);
    if (item) {
      item.bought = bought;
      item.boughtBy = boughtBy || null;
      await saveDb(db);
    }
  }
  revalidatePath('/shopping');
}

export async function addAnnouncement(formData: FormData) {
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;
  if (!content || !author) return;
  
  if (usePostgres) {
    await sql`INSERT INTO announcements (content, author) VALUES (${content}, ${author})`;
  } else {
    const db = await getDb();
    db.announcements.push({ id: Date.now(), content, author, createdAt: new Date().toISOString() });
    await saveDb(db);
  }
  revalidatePath('/board');
}

export async function addIssue(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  if (!title) return;
  
  if (usePostgres) {
    await sql`INSERT INTO issues (title, description) VALUES (${title}, ${description})`;
  } else {
    const db = await getDb();
    db.issues.push({ id: Date.now(), title, description, status: 'OPEN', createdAt: new Date().toISOString() });
    await saveDb(db);
  }
  revalidatePath('/issues');
}

export async function toggleIssueStatus(id: number, status: string) {
  if (usePostgres) {
    await sql`UPDATE issues SET status = ${status} WHERE id = ${id}`;
  } else {
    const db = await getDb();
    const issue = db.issues.find((i: any) => i.id === id);
    if (issue) {
      issue.status = status;
      await saveDb(db);
    }
  }
  revalidatePath('/issues');
}

export async function toggleTask(taskName: string, weekNumber: number, roomId: string) {
  if (usePostgres) {
    const { rows } = await sql`SELECT id FROM task_logs WHERE task_name = ${taskName} AND week_number = ${weekNumber}`;
    if (rows.length > 0) {
      await sql`DELETE FROM task_logs WHERE id = ${rows[0].id}`;
    } else {
      await sql`INSERT INTO task_logs (task_name, room_id, week_number) VALUES (${taskName}, ${roomId}, ${weekNumber})`;
    }
  } else {
    const db = await getDb();
    const existingIndex = db.taskLogs.findIndex((log: any) => log.taskName === taskName && log.weekNumber === weekNumber);
    if (existingIndex > -1) {
      db.taskLogs.splice(existingIndex, 1);
    } else {
      db.taskLogs.push({ id: Date.now(), taskName, roomId, weekNumber, completedAt: new Date().toISOString() });
    }
    await saveDb(db);
  }
  revalidatePath('/');
}

export async function addExpense(formData: FormData) {
  const author = formData.get('author') as string;
  const description = formData.get('description') as string;
  const amount = Number(formData.get('amount'));
  
  if (!author || !description || !amount) return;
  
  if (usePostgres) {
    await sql`INSERT INTO expenses (author, description, amount) VALUES (${author}, ${description}, ${amount})`;
  } else {
    const db = await getDb();
    if (!db.expenses) db.expenses = [];
    db.expenses.push({ id: Date.now(), author, description, amount, createdAt: new Date().toISOString() });
    await saveDb(db);
  }
  revalidatePath('/fund');
}

export async function addFridgeItem(formData: FormData) {
  const name = formData.get('name') as string;
  const owner = formData.get('owner') as string;
  const expiresAt = formData.get('expiresAt') as string;
  
  if (!name || !owner || !expiresAt) return;
  
  if (usePostgres) {
    await sql`INSERT INTO fridge_items (name, owner, expires_at) VALUES (${name}, ${owner}, ${expiresAt})`;
  } else {
    const db = await getDb();
    if (!db.fridgeItems) db.fridgeItems = [];
    db.fridgeItems.push({ id: Date.now(), name, owner, expiresAt, isFree: false, createdAt: new Date().toISOString() });
    await saveDb(db);
  }
  revalidatePath('/fridge');
}

export async function toggleFreeFood(id: number, isFree: boolean) {
  if (usePostgres) {
    await sql`UPDATE fridge_items SET is_free = ${isFree} WHERE id = ${id}`;
  } else {
    const db = await getDb();
    const item = db.fridgeItems.find((i: any) => i.id === id);
    if (item) {
      item.isFree = isFree;
      await saveDb(db);
    }
  }
  revalidatePath('/fridge');
}

export async function removeFridgeItem(id: number) {
  if (usePostgres) {
    await sql`DELETE FROM fridge_items WHERE id = ${id}`;
  } else {
    const db = await getDb();
    db.fridgeItems = db.fridgeItems.filter((i: any) => i.id !== id);
    await saveDb(db);
  }
  revalidatePath('/fridge');
}

export async function addWikiPage(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as string;
  const author = formData.get('author') as string;
  
  if (!title || !content || !category || !author) return;
  
  if (usePostgres) {
    await sql`INSERT INTO wiki_pages (title, content, category, author) VALUES (${title}, ${content}, ${category}, ${author})`;
  } else {
    const db = await getDb();
    if (!db.wikiPages) db.wikiPages = [];
    db.wikiPages.push({ id: Date.now(), title, content, category, author, createdAt: new Date().toISOString() });
    await saveDb(db);
  }
  revalidatePath('/wiki');
}
