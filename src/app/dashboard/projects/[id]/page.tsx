import { notFound } from 'next/navigation';
import { projects as initialProjects } from '@/lib/data';
import ProjectDetails from '@/components/project-details';
import { Project } from '@/lib/types';

export async function generateStaticParams() {
  return initialProjects.map(project => ({
    id: project.id,
  }));
}

function getProject(id: string): Project | undefined {
    // In a real app, you would fetch this from a database.
    const project = initialProjects.find(p => p.id === id);
    if (!project) {
        return undefined;
    }
    // Deep copy to simulate fetching fresh data and avoid modifying the original data object.
    return JSON.parse(JSON.stringify(project));
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProject(params.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetails initialProject={project} />;
}
