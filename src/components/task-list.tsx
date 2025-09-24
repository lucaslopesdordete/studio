'use client';

import { useState } from 'react';
import { Task, TeamMember } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TaskListProps {
  tasks: Task[];
  teamMembers: TeamMember[];
  onTasksUpdate: (tasks: Task[]) => void;
}

export default function TaskList({ tasks, teamMembers, onTasksUpdate }: TaskListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') return;
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      status: 'A fazer',
    };
    onTasksUpdate([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const handleUpdateTask = (taskId: string, newProps: Partial<Task>) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...newProps } : task
    );
    onTasksUpdate(updatedTasks);
  };

  const handleAssignMember = (taskId: string, memberId: string) => {
    if (memberId === 'unassigned') {
        handleUpdateTask(taskId, { assignee: undefined });
        return;
    }
    const member = teamMembers.find(m => m.id === memberId);
    handleUpdateTask(taskId, { assignee: member });
  };
  
  const handleUpdateStatus = (taskId: string, status: Task['status']) => {
    handleUpdateTask(taskId, { status });
  };

  const handleDeleteTask = (taskId: string) => {
    onTasksUpdate(tasks.filter(task => task.id !== taskId));
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Adicionar uma nova tarefa..."
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddTask()}
          />
          <Button onClick={handleAddTask}><Plus className="h-4 w-4" /></Button>
        </div>
        <div className="space-y-2">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
              <span className="flex-1">{task.title}</span>
              
              <Select value={task.status} onValueChange={(value: Task['status']) => handleUpdateStatus(task.id, value)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A fazer">A fazer</SelectItem>
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Pausado">Pausado</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={task.assignee?.id || 'unassigned'} onValueChange={(value) => handleAssignMember(task.id, value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue>
                    {task.assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatarUrl} />
                            <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{task.assignee.name}</span>
                      </div>
                    ) : (
                      'Não atribuído'
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Não atribuído</SelectItem>
                  {teamMembers.map(member => (
                    <SelectItem key={member.id} value={member.id}>
                       <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={member.avatarUrl} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Excluir Tarefa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
