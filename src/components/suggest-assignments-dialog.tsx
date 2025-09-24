'use client';

import { useState } from 'react';
import { Project, Task } from '@/lib/types';
import { suggestTaskAssignments } from '@/ai/flows/suggest-task-assignments';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Lightbulb, Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface SuggestAssignmentsDialogProps {
  project: Project;
  onApplySuggestions: (updatedTasks: Task[]) => void;
}

type SuggestedAssignment = { task: string; assignee: string };

export default function SuggestAssignmentsDialog({ project, onApplySuggestions }: SuggestAssignmentsDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestedAssignment[]>([]);
  const { toast } = useToast();

  const handleSuggest = async () => {
    setIsLoading(true);
    setSuggestions([]);
    try {
      const unassignedTasks = project.tasks.filter(task => !task.assignee);
      if (unassignedTasks.length === 0) {
        setIsLoading(false);
        return;
      }
      const result = await suggestTaskAssignments({
        projectDescription: project.description,
        teamMemberSkills: project.team.map(m => ({ name: m.name, skills: m.skills })),
        tasks: unassignedTasks.map(t => t.title),
      });
      setSuggestions(result.suggestedAssignments);
    } catch (error) {
      console.error('AI suggestion failed:', error);
      toast({
        variant: 'destructive',
        title: 'AI Suggestion Failed',
        description: 'Could not generate task assignments. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    let updatedTasks = [...project.tasks];
    suggestions.forEach(suggestion => {
      const taskToUpdate = updatedTasks.find(t => t.title === suggestion.task && !t.assignee);
      const assignee = project.team.find(m => m.name === suggestion.assignee);
      if (taskToUpdate && assignee) {
        updatedTasks = updatedTasks.map(t =>
          t.id === taskToUpdate.id ? { ...t, assignee } : t
        );
      }
    });
    onApplySuggestions(updatedTasks);
    setOpen(false);
    setSuggestions([]);
  };
  
  const hasUnassignedTasks = project.tasks.some(t => !t.assignee);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => {
          if (hasUnassignedTasks) {
            setOpen(true);
            handleSuggest();
          } else {
             toast({
                title: 'No unassigned tasks',
                description: 'All tasks have already been assigned.',
            });
          }
        }}>
          <Lightbulb className="mr-2 h-4 w-4 text-amber-500" />
          Suggest Assignments
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI-Powered Suggestions</DialogTitle>
          <DialogDescription>
            Our AI has suggested the following task assignments based on team skills.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {isLoading && (
            <div className="flex justify-center items-center h-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {!isLoading && suggestions.length > 0 && (
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => {
                const assignee = project.team.find(m => m.name === suggestion.assignee);
                return (
                  <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <p className="font-medium text-sm flex-1 truncate">{suggestion.task}</p>
                    <ArrowRight className="h-4 w-4 mx-4 text-muted-foreground" />
                    {assignee ? (
                        <div className="flex items-center gap-2">
                           <Avatar className="h-6 w-6">
                            <AvatarImage src={assignee.avatarUrl} />
                            <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-semibold">{assignee.name}</span>
                        </div>
                    ) : (
                        <span className="text-sm text-muted-foreground">{suggestion.assignee}</span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
           {!isLoading && suggestions.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">
              {hasUnassignedTasks ? "Could not generate suggestions. Please try again." : "All tasks are already assigned."}
            </p>
           )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply} disabled={isLoading || suggestions.length === 0}>
            Apply Suggestions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
