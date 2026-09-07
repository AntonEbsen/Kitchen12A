import fs from 'fs/promises';
import path from 'path';
import { sql } from '@vercel/postgres';

const DB_PATH = path.join(process.cwd(), 'db.json');

const defaultDb = {
  shoppingItems: [],
  announcements: [],
  issues: [],
  taskLogs: [],
  expenses: [],
  fridgeItems: [],
  wikiPages: []
};

// JSON Database Methods (Fallback)
export async function getDb() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    await fs.writeFile(DB_PATH, JSON.stringify(defaultDb, null, 2));
    return defaultDb;
  }
}

export async function saveDb(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// Check if Postgres is configured
export const usePostgres = !!process.env.POSTGRES_URL;

// Postgres Methods
export async function pgGetShoppingItems() {
  const { rows } = await sql`SELECT * FROM shopping_items ORDER BY id ASC`;
  return rows;
}

export async function pgGetAnnouncements() {
  const { rows } = await sql`SELECT * FROM announcements ORDER BY id DESC`;
  return rows;
}

export async function pgGetIssues() {
  const { rows } = await sql`SELECT * FROM issues ORDER BY id ASC`;
  return rows;
}

export async function pgGetExpenses() {
  const { rows } = await sql`SELECT * FROM expenses ORDER BY id DESC`;
  return rows;
}

export async function pgGetTaskLogs(weekNumber: number) {
  const { rows } = await sql`SELECT * FROM task_logs WHERE week_number = ${weekNumber}`;
  return rows;
}

export async function pgGetFridgeItems() {
  const { rows } = await sql`SELECT * FROM fridge_items ORDER BY expires_at ASC`;
  return rows;
}

export async function pgGetWikiPages() {
  const { rows } = await sql`SELECT * FROM wiki_pages ORDER BY created_at DESC`;
  return rows;
}

