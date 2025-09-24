'use client';

import { useState, useEffect } from 'react';
import { Project, Task } from '@/lib/types';
import ProjectCharts from '@/components/project-charts';
import TaskList from '@/components/task-list';
import SuggestAssignmentsDialog from '@/components/suggest-assignments-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProjectDetailsProps {
    initialProject: Project;
}

export default function ProjectDetails({ initialProject }: ProjectDetailsProps) {
  const [project, setProject] = useState<Project>(initialProject);

  // Keep the project state in sync if the initial prop changes
  useEffect(() => {
    setProject(initialProject);
  }, [initialProject]);


  const handleTasksUpdate = (updatedTasks: Task[]) => {
    setProject(prevProject => ({ ...prevProject, tasks: updatedTasks }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        <p className="text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
            <Badge variant={new Date() > new Date(project.deadline) ? 'destructive' : 'outline'}>
                Vence {formatDistanceToNow(new Date(project.deadline), { addSuffix: true, locale: ptBR })}
            </Badge>
            <div className="flex items-center gap-2">
                <span>Equipe:</span>
                <div className="flex -space-x-2">
                {project.team.map(member => (
                    <Avatar key={member.id} className="border-2 border-background h-6 w-6">
                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                ))}
                </div>
            </div>
        </div>
      </div>

      <ProjectCharts tasks={project.tasks} />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Tarefas</h2>
        <SuggestAssignmentsDialog project={project} onApplySuggestions={handleTasksUpdate} />
      </div>

      <TaskList
        tasks={project.tasks}
        teamMembers={project.team}
        onTasksUpdate={handleTasksUpdate}
      />
    </div>
  );
}
