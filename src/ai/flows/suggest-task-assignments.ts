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
    .describe('A detailed description of the project.'),
  teamMemberSkills: z
    .array(z.object({name: z.string(), skills: z.array(z.string())}))
    .describe(
      'An array of team members, where each member has a name and a list of skills.'
    ),
  tasks: z.array(z.string()).describe('A list of tasks to be assigned.'),
});
export type SuggestTaskAssignmentsInput = z.infer<
  typeof SuggestTaskAssignmentsInputSchema
>;

const SuggestTaskAssignmentsOutputSchema = z.object({
  suggestedAssignments: z
    .array(z.object({task: z.string(), assignee: z.string()}))
    .describe(
      'An array of suggested task assignments, where each assignment includes the task and the name of the assigned team member.'
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
  prompt: `You are an AI project management assistant tasked with suggesting optimal task assignments.

Analyze the following project description and team member skills to suggest the best team member for each task.

Project Description: {{{projectDescription}}}

Team Member Skills:
{{#each teamMemberSkills}}
  - Name: {{this.name}}
    Skills: {{#each this.skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

Tasks:
{{#each tasks}}
  - {{{this}}}
{{/each}}

Suggest task assignments based on the project description and team member skills.  The suggested assignee must be a member of the team.
Ensure that each task is assigned to the team member with the most relevant skills.
Output the task and assignee as JSON.
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
