'use client';

import { useState, useEffect, useMemo } from 'react';
import { notFound } from 'next/navigation';
import { projects as initialProjects } from '@/lib/data';
import { Project, Task } from '@/lib/types';
import ProjectCharts from '@/components/project-charts';
import TaskList from '@/components/task-list';
import SuggestAssignmentsDialog from '@/components/suggest-assignments-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundProject = initialProjects.find(p => p.id === params.id);
    if (foundProject) {
      // Deep copy to prevent modifying the original data object in a real app
      setProject(JSON.parse(JSON.stringify(foundProject)));
    }
    setIsLoading(false);
  }, [params.id]);

  if (isLoading) {
    // In a real app, you might show a skeleton loader here
    return <div>Loading project...</div>;
  }
  
  if (!project) {
    notFound();
  }

  const handleTasksUpdate = (updatedTasks: Task[]) => {
    setProject(prevProject => prevProject ? { ...prevProject, tasks: updatedTasks } : null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        <p className="text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
            <Badge variant={new Date() > new Date(project.deadline) ? 'destructive' : 'outline'}>
                Due {formatDistanceToNow(new Date(project.deadline), { addSuffix: true })}
            </Badge>
            <div className="flex items-center gap-2">
                <span>Team:</span>
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
        <h2 className="text-2xl font-semibold">Tasks</h2>
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
