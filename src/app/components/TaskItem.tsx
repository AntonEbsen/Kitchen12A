'use client';

import { useTransition } from 'react';
import { toggleTask } from '@/app/actions';

export default function TaskItem({ 
  task, 
  completed, 
  weekNumber, 
  roomId 
}: { 
  task: string, 
  completed: boolean, 
  weekNumber: number, 
  roomId: string 
}) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(() => {
      toggleTask(task, weekNumber, roomId);
    });
  };

  return (
    <li className={`task-item ${completed ? 'completed' : ''}`}>
      <span>{task}</span>
      <button onClick={handleToggle} disabled={isPending}>
        {isPending ? '...' : '✓'}
      </button>
    </li>
  );
}
