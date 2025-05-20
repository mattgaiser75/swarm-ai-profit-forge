
import React from "react";
import { useSwarm } from "@/context/SwarmContext";
import { Workflow } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WorkflowDiagramProps {
  workflowId: string;
}

const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({ workflowId }) => {
  const { workflows, agents } = useSwarm();
  const workflow = workflows.find(w => w.id === workflowId);

  if (!workflow) return null;

  const stepMap = new Map(workflow.steps.map(step => [step.id, step]));
  
  // Calculate node positions
  const calculatePositions = (workflow: Workflow) => {
    const positions: Record<string, { x: number, y: number }> = {};
    
    // Find starting nodes (those that are not in any nextSteps arrays)
    const allNextSteps = workflow.steps.flatMap(step => step.nextSteps);
    const startingNodes = workflow.steps
      .filter(step => !allNextSteps.includes(step.id))
      .map(step => step.id);
    
    const processNode = (nodeId: string, level: number, position: number, maxNodesPerLevel: Record<number, number>) => {
      positions[nodeId] = {
        x: level * 150 + 100,
        y: position * 100 + 50
      };
      
      const node = stepMap.get(nodeId);
      if (!node) return;
      
      // Process next steps
      node.nextSteps.forEach((nextId, idx) => {
        const nextLevel = level + 1;
        maxNodesPerLevel[nextLevel] = (maxNodesPerLevel[nextLevel] || 0) + 1;
        processNode(nextId, nextLevel, maxNodesPerLevel[nextLevel] - 1, maxNodesPerLevel);
      });
    };
    
    // Start processing from the end nodes
    const rootNodes = workflow.steps.filter(step => 
      !workflow.steps.some(s => s.nextSteps.includes(step.id))
    );
    
    rootNodes.forEach((node, idx) => {
      const maxNodesPerLevel: Record<number, number> = { 0: rootNodes.length };
      processNode(node.id, 0, idx, maxNodesPerLevel);
    });
    
    return positions;
  };
  
  const positions = calculatePositions(workflow);
  const maxX = Math.max(...Object.values(positions).map(p => p.x)) + 100;
  const maxY = Math.max(...Object.values(positions).map(p => p.y)) + 100;
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Workflow Diagram: {workflow.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-auto border rounded-md p-4" style={{ height: '300px' }}>
          <svg width={maxX} height={maxY} className="w-full h-full">
            {/* Draw connections */}
            {workflow.steps.map(step => 
              step.nextSteps.map(nextId => {
                const from = positions[step.id];
                const to = positions[nextId];
                if (!from || !to) return null;
                
                return (
                  <path
                    key={`${step.id}-${nextId}`}
                    d={`M${from.x + 60},${from.y} C${from.x + 100},${from.y} ${to.x - 40},${to.y} ${to.x},${to.y}`}
                    className="flow-path"
                    fill="none"
                    strokeLinecap="round"
                  />
                );
              })
            )}
            
            {/* Draw nodes */}
            {workflow.steps.map(step => {
              const pos = positions[step.id];
              if (!pos) return null;
              
              const agent = agents.find(a => a.id === step.agentId);
              
              return (
                <g key={step.id} transform={`translate(${pos.x}, ${pos.y})`}>
                  <rect
                    x="-60"
                    y="-20"
                    width="120"
                    height="40"
                    rx="5"
                    className={`${agent?.enabled ? 'fill-card stroke-primary' : 'fill-muted stroke-muted-foreground'} stroke-1`}
                  />
                  <text
                    className="text-xs fill-foreground"
                    textAnchor="middle"
                    dy="-5"
                  >
                    {step.name}
                  </text>
                  <text
                    className="text-[10px] fill-muted-foreground"
                    textAnchor="middle"
                    dy="10"
                  >
                    {agent ? agent.name.split(' ')[0] : 'Unknown'}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowDiagram;
