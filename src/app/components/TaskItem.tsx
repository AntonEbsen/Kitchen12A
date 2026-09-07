'use client';

import { useTransition } from 'react';
import { toggleTask } from '@/app/actions';
import confetti from 'canvas-confetti';

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
      // Fire confetti if completing a task
      if (!completed) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
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
