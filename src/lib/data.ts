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
    skills: ['Backend', 'Node.js', 'Bancos de Dados'],
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
    skills: ['Gerenciamento de Projetos', 'Agile', 'Scrum'],
  },
];

const initialTasks: Task[] = [
    { id: 't1', title: 'Configurar estrutura do projeto', status: 'Concluído', assignee: teamMembers[2] },
    { id: 't2', title: 'Desenhar mockups da landing page', status: 'Em Progresso', assignee: teamMembers[0] },
    { id: 't3', title: 'Desenvolver API de autenticação', status: 'A Fazer', assignee: teamMembers[1] },
    { id: 't4', title: 'Criar texto de marketing', status: 'A Fazer' },
];

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Plataforma de E-Commerce',
    description: 'Uma plataforma de e-commerce completa com um frontend moderno e um backend escalável. A plataforma suportará múltiplos vendedores e uma vasta gama de produtos.',
    deadline: new Date(new Date().setDate(new Date().getDate() + 60)).toISOString(),
    team: teamMembers,
    tasks: initialTasks,
  },
  {
    id: 'p2',
    name: 'Aplicativo de Banco Móvel',
    description: 'Um aplicativo de banco móvel seguro e fácil de usar para iOS e Android. As principais funcionalidades incluem transferências de fundos, pagamentos de contas e geração de extratos.',
    deadline: new Date(new Date().setDate(new Date().getDate() + 90)).toISOString(),
    team: [teamMembers[0], teamMembers[3]],
    tasks: [
        { id: 't5', title: 'Diagrama de fluxo do usuário', status: 'Concluído', assignee: teamMembers[0] },
        { id: 't6', title: 'Planejar sprints do projeto', status: 'Em Progresso', assignee: teamMembers[3] },
    ],
  },
];
