import { Project, TeamMember, Task } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'avatar1')?.imageUrl || '',
    skills: ['Frontend', 'React', 'UI/UX Design'],
  },
  {
    id: '2',
    name: 'Bob Williams',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'avatar2')?.imageUrl || '',
    skills: ['Backend', 'Node.js', 'Databases'],
  },
  {
    id: '3',
    name: 'Charlie Brown',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'avatar3')?.imageUrl || '',
    skills: ['DevOps', 'CI/CD', 'AWS'],
  },
  {
    id: '4',
    name: 'Diana Prince',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'avatar4')?.imageUrl || '',
    skills: ['Project Management', 'Agile', 'Scrum'],
  },
];

const initialTasks: Task[] = [
    { id: 't1', title: 'Setup project structure', status: 'Done', assignee: teamMembers[2] },
    { id: 't2', title: 'Design landing page mockups', status: 'In Progress', assignee: teamMembers[0] },
    { id: 't3', title: 'Develop authentication API', status: 'To Do', assignee: teamMembers[1] },
    { id: 't4', title: 'Create marketing copy', status: 'To Do' },
];

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with a modern frontend and a scalable backend. The platform will support multiple vendors and a wide range of products.',
    deadline: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString(),
    team: teamMembers,
    tasks: initialTasks,
  },
  {
    id: 'p2',
    name: 'Mobile Banking App',
    description: 'A secure and user-friendly mobile banking application for iOS and Android. Key features include fund transfers, bill payments, and account statement generation.',
    deadline: new Date(new Date().setDate(new Date().getDate() + 90)).toISOString(),
    team: [teamMembers[0], teamMembers[3]],
    tasks: [
        { id: 't5', title: 'User flow diagram', status: 'Done', assignee: teamMembers[0] },
        { id: 't6', title: 'Plan project sprints', status: 'In Progress', assignee: teamMembers[3] },
    ],
  },
];
