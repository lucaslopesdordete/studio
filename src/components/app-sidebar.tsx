'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ListTodo } from 'lucide-react';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import { Project } from '@/lib/types';

interface AppSidebarProps {
  projects: Project[];
}

export function AppSidebar({ projects }: AppSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Painel', icon: LayoutGrid },
  ];

  return (
    <div className="flex h-full flex-col border-r bg-card text-card-foreground">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Logo className="h-8 w-auto text-primary" />
          <span>Orientes consultoria</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start p-4 text-sm font-medium">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === href && 'bg-muted text-primary'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          <h3 className="my-4 px-3 text-xs font-semibold uppercase text-muted-foreground">
            Projetos
          </h3>

          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === `/dashboard/projects/${project.id}` && 'bg-muted text-primary'
              )}
            >
              <ListTodo className="h-4 w-4" />
              <span className="truncate flex-1">{project.name}</span>
              <Badge variant="secondary" className="rounded-sm">
                {project.tasks.length}
              </Badge>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
