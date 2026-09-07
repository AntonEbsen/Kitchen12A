export const ROOMS = [
  "1201", "1202", "1203", "1204", "1205", "1206",
  "1207", "1208", "1209", "1210", "1211", "1212"
];

// Base case: Week 37 of 2026 is room 1210
const BASE_YEAR = 2026;
const BASE_WEEK = 37;
const BASE_ROOM_INDEX = ROOMS.indexOf("1210"); // Index 9

function getWeekNumber(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
}

function getWeeksDiff(date1: Date, date2: Date) {
  const d1 = new Date(date1.getFullYear(), 0, 1);
  const d2 = new Date(date2.getFullYear(), 0, 1);
  const daysDiff = (date2.getTime() - d2.getTime()) / 86400000;
  const daysDiff1 = (date1.getTime() - d1.getTime()) / 86400000;
  
  const w1 = getWeekNumber(date1);
  const w2 = getWeekNumber(date2);
  
  if (date1.getFullYear() === date2.getFullYear()) {
    return w2 - w1;
  }
  
  let weeks = 0;
  for (let y = date1.getFullYear(); y < date2.getFullYear(); y++) {
    const dec31 = new Date(y, 11, 31);
    weeks += getWeekNumber(dec31) === 1 ? 52 : getWeekNumber(dec31);
  }
  return weeks + w2 - w1;
}

export function getCurrentDutyRoom(): string {
  const now = new Date();
  
  // Create a date for the base week (Sept 13, 2026)
  const baseDate = new Date(2026, 8, 13); // Month is 0-indexed (8 = Sept)
  
  const weeksDiff = getWeeksDiff(baseDate, now);
  
  // Calculate new index
  // % ROOMS.length ensures it wraps around
  // + ROOMS.length before % ensures no negative modulo in JS
  let newIndex = (BASE_ROOM_INDEX + weeksDiff) % ROOMS.length;
  if (newIndex < 0) {
    newIndex += ROOMS.length;
  }
  
  return ROOMS[newIndex];
}

export function getCurrentWeekAndDay() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return { weekNumber: getWeekNumber(now), dayOfYear };
}
