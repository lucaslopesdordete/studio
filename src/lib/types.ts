export type TeamMember = {
  id: string;
  name: string;
  avatarUrl: string;
  skills: string[];
};

export type Task = {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignee?: TeamMember;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  deadline: string;
  team: TeamMember[];
  tasks: Task[];
};
