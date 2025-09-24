import Link from 'next/link';
import { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function ProjectCard({ project }: { project: Project }) {
  const completedTasks = project.tasks.filter(t => t.status === 'Done').length;
  const progress = project.tasks.length > 0 ? (completedTasks / project.tasks.length) * 100 : 0;
  const deadlineDate = new Date(project.deadline);

  return (
    <Link href={`/dashboard/projects/${project.id}`} className="block h-full">
      <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-muted-foreground">Progresso</span>
              <span className="text-sm font-semibold">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} aria-label={`${Math.round(progress)}% completo`} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Equipe</p>
            <div className="flex -space-x-2">
              {project.team.map(member => (
                <Avatar key={member.id} className="border-2 border-card">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Badge variant={new Date() > deadlineDate ? 'destructive' : 'outline'}>
            Vence {formatDistanceToNow(deadlineDate, { addSuffix: true, locale: ptBR })}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
