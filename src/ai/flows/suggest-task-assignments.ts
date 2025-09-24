'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting optimal task assignments based on project descriptions and team member skills.
 *
 * - suggestTaskAssignments - A function that suggests task assignments based on project description and team member skills.
 * - SuggestTaskAssignmentsInput - The input type for the suggestTaskAssignments function.
 * - SuggestTaskAssignmentsOutput - The return type for the suggestTaskAssignments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaskAssignmentsInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('Uma descrição detalhada do projeto.'),
  teamMemberSkills: z
    .array(z.object({name: z.string(), skills: z.array(z.string())}))
    .describe(
      'Um array de membros da equipe, onde cada membro tem um nome e uma lista de habilidades.'
    ),
  tasks: z.array(z.string()).describe('Uma lista de tarefas a serem atribuídas.'),
});
export type SuggestTaskAssignmentsInput = z.infer<
  typeof SuggestTaskAssignmentsInputSchema
>;

const SuggestTaskAssignmentsOutputSchema = z.object({
  suggestedAssignments: z
    .array(z.object({task: z.string(), assignee: z.string()}))
    .describe(
      'Um array de atribuições de tarefas sugeridas, onde cada atribuição inclui a tarefa e o nome do membro da equipe atribuído.'
    ),
});
export type SuggestTaskAssignmentsOutput = z.infer<
  typeof SuggestTaskAssignmentsOutputSchema
>;

export async function suggestTaskAssignments(
  input: SuggestTaskAssignmentsInput
): Promise<SuggestTaskAssignmentsOutput> {
  return suggestTaskAssignmentsFlow(input);
}

const suggestTaskAssignmentsPrompt = ai.definePrompt({
  name: 'suggestTaskAssignmentsPrompt',
  input: {schema: SuggestTaskAssignmentsInputSchema},
  output: {schema: SuggestTaskAssignmentsOutputSchema},
  prompt: `Você é um assistente de gerenciamento de projetos de IA encarregado de sugerir atribuições de tarefas ideais.

Analise a seguinte descrição do projeto e as habilidades dos membros da equipe para sugerir o melhor membro da equipe para cada tarefa.

Descrição do Projeto: {{{projectDescription}}}

Habilidades dos Membros da Equipe:
{{#each teamMemberSkills}}
  - Nome: {{this.name}}
    Habilidades: {{#each this.skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

Tarefas:
{{#each tasks}}
  - {{{this}}}
{{/each}}

Sugira atribuições de tarefas com base na descrição do projeto e nas habilidades dos membros da equipe. O responsável sugerido deve ser um membro da equipe.
Garanta que cada tarefa seja atribuída ao membro da equipe com as habilidades mais relevantes.
Produza a tarefa e o responsável como JSON.
`,
});

const suggestTaskAssignmentsFlow = ai.defineFlow(
  {
    name: 'suggestTaskAssignmentsFlow',
    inputSchema: SuggestTaskAssignmentsInputSchema,
    outputSchema: SuggestTaskAssignmentsOutputSchema,
  },
  async input => {
    const {output} = await suggestTaskAssignmentsPrompt(input);
    return output!;
  }
);
