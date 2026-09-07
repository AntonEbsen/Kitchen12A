import { getCurrentDutyRoom, getCurrentWeekAndDay } from "@/lib/roster";
import { getDb, usePostgres, pgGetTaskLogs } from "@/lib/db";
import TaskItem from "./components/TaskItem";

const dailyTasks = [
  "Take out the trash",
  "Wipe the kitchen counter with universal cleaner and a cloth",
  "Wipe the dining table with Universal cleaner and a cloth",
  "Wipe the coffee table with Universal cleaner and a cloth",
];

const weeklyTasks = [
  "Clean the sink with all-purpose cleaner, followed by descaling solution",
  "Clean the stovetops with stovetop cleaner",
  "Wipe the windowsill with Universal cleaner and a cloth",
  "Wipe the TV table",
  "Vacuum the floor",
  "Mop the floor",
  "Wash dish towels, cloths, sponges, and hand towels at 90 degrees Celsius",
  "Hang dish towels, cloths, sponges, and hand towels to dry or use a dryer",
  "Put dish towels, cloths, sponges, and hand towels back in the drawer when dry",
  "Take returnable bottles to a supermarket and buy relevant kitchen items",
  "Descale the electric kettle"
];

export default async function Home() {
  const currentRoom = getCurrentDutyRoom();
  const { weekNumber } = getCurrentWeekAndDay();
  
  let taskLogs: any[] = [];
  if (usePostgres) {
    taskLogs = await pgGetTaskLogs(weekNumber);
  } else {
    const db = await getDb();
    taskLogs = db.taskLogs || [];
  }
  
  const isCompleted = (taskName: string) => {
    return taskLogs.some((log: any) => 
      (log.taskName || log.task_name) === taskName && 
      (log.weekNumber || log.week_number) === weekNumber
    );
  };

  return (
    <div>
      <div className="glass glass-panel" style={{ textAlign: 'center' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem' }}>Week {weekNumber} Duty</p>
        <h2 style={{ fontSize: '3rem', margin: '8px 0', color: 'var(--primary)' }}>Room {currentRoom}</h2>
        <p>It's your turn to keep the kitchen sparkling! ✨</p>
      </div>

      <div className="glass glass-panel">
        <h3>Daily Tasks</h3>
        <ul className="task-list">
          {dailyTasks.map((task, idx) => (
            <TaskItem 
              key={`daily-${idx}`} 
              task={task} 
              completed={isCompleted(task)} 
              weekNumber={weekNumber} 
              roomId={currentRoom} 
            />
          ))}
        </ul>
      </div>

      <div className="glass glass-panel">
        <h3>Weekly Tasks</h3>
        <ul className="task-list">
          {weeklyTasks.map((task, idx) => (
            <TaskItem 
              key={`weekly-${idx}`} 
              task={task} 
              completed={isCompleted(task)} 
              weekNumber={weekNumber} 
              roomId={currentRoom} 
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
