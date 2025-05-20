
import React, { useState } from "react";
import { useSwarm } from "@/context/SwarmContext";
import { AgentConfig } from "@/types";
import AgentCard from "@/components/dashboard/AgentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Agents = () => {
  const { agents } = useSwarm();
  const [searchTerm, setSearchTerm] = useState("");
  const [agentTypeFilter, setAgentTypeFilter] = useState("all");
  
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = agentTypeFilter === "all" || agent.type === agentTypeFilter;
    
    return matchesSearch && matchesType;
  });
  
  const enabledAgents = filteredAgents.filter(agent => agent.enabled);
  const disabledAgents = filteredAgents.filter(agent => !agent.enabled);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Agents</h1>
        <p className="text-muted-foreground">
          Configure and manage specialized AI agents in your swarm
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search agents..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex">
          <select
            className="bg-background border rounded-md px-3 py-2"
            value={agentTypeFilter}
            onChange={(e) => setAgentTypeFilter(e.target.value)}
          >
            <option value="all">All types</option>
            <option value="market-research">Market Research</option>
            <option value="content-creation">Content Creation</option>
            <option value="customer-relations">Customer Relations</option>
            <option value="freelance-management">Freelance Management</option>
            <option value="analytics-reports">Analytics & Reports</option>
            <option value="admin-management">Admin Management</option>
          </select>
          <Button className="ml-2">Add Agent</Button>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Agents ({filteredAgents.length})</TabsTrigger>
          <TabsTrigger value="enabled">Enabled ({enabledAgents.length})</TabsTrigger>
          <TabsTrigger value="disabled">Disabled ({disabledAgents.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="enabled" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enabledAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="disabled" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {disabledAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Agents;
