'use client';

import { Task } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useMemo } from 'react';

const CHART_COLORS = {
  'A fazer': 'hsl(var(--muted-foreground) / 0.5)',
  'Em andamento': 'hsl(var(--primary))',
  'Pausado': 'hsl(35, 92%, 50%)', // Orange/Yellow
  'Concluído': 'hsl(var(--chart-2))', // Greenish/Accent color from theme
};

export default function ProjectCharts({ tasks }: { tasks: Task[] }) {
  const chartData = useMemo(() => {
    const statuses = tasks.reduce((acc, task) => {
      const status = task.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statuses).map(([name, value]) => ({ name, value }));
  }, [tasks]);

  const totalTasks = tasks.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral do Status das Tarefas</CardTitle>
      </CardHeader>
      <CardContent>
        {totalTasks > 0 ? (
          <ChartContainer config={{}} className="mx-auto aspect-square h-[250px]">
            <PieChart>
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[entry.name as keyof typeof CHART_COLORS] || 'grey'} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex justify-center items-center h-[250px] text-muted-foreground">
            Nenhuma tarefa ainda.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
