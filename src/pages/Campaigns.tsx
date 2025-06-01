
import React, { useState } from "react";
import { useSwarm } from "@/context/SwarmContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, Users, Calendar, TrendingUp, Cpu, Settings } from "lucide-react";
import CreateCampaignDialog from "@/components/campaigns/CreateCampaignDialog";
import CampaignModelOptimizer from "@/components/campaigns/CampaignModelOptimizer";

const Campaigns = () => {
  const { campaigns, agents } = useSwarm();
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [selectedCampaignForOptimization, setSelectedCampaignForOptimization] = useState<string | null>(null);

  const activeCampaigns = campaigns.filter(campaign => campaign.enabled);
  const inactiveCampaigns = campaigns.filter(campaign => !campaign.enabled);
  const draftCampaigns = campaigns.filter(campaign => campaign.status === "draft");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "paused": return "bg-yellow-500";
      case "completed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getCampaignAgents = (campaign: any) => {
    return campaign.assignedAgents.map((agentId: string) => 
      agents.find(a => a.id === agentId)
    ).filter(Boolean);
  };

  const renderCampaignCard = (campaign: any) => (
    <Card key={campaign.id}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-lg font-semibold">{campaign.name}</h3>
              <Badge variant="outline" className={`${getStatusColor(campaign.status)} text-white`}>
                {campaign.status}
              </Badge>
              <Badge variant={campaign.enabled ? "default" : "secondary"}>
                {campaign.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            
            <p className="text-muted-foreground mb-3">{campaign.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <Target className="h-4 w-4 mr-2" />
                <strong>Goal:</strong> <span className="ml-1">{campaign.goal}</span>
              </div>
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-2" />
                <strong>Manager:</strong> <span className="ml-1">{campaign.managerName}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                <strong>Duration:</strong> <span className="ml-1">{campaign.startDate} - {campaign.endDate || "Ongoing"}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{campaign.progress}%</span>
              </div>
              <Progress value={campaign.progress} className="h-2" />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Assigned Agents & Models ({campaign.assignedAgents.length}):</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCampaignForOptimization(campaign.id)}
                  className="text-xs"
                >
                  <Cpu className="h-3 w-3 mr-1" />
                  Optimize Models
                </Button>
              </div>
              <div className="space-y-2">
                {getCampaignAgents(campaign).map((agent: any) => (
                  <div key={agent.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{agent.name}</span>
                      <Badge variant="outline" className="text-xs">{agent.type}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Cpu className="h-3 w-3" />
                      <span className="font-medium">{agent.model.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {agent.model.provider}
                      </Badge>
                      <span className="text-muted-foreground">
                        ${agent.model.costPer1KTokens}/1K
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Switch checked={campaign.enabled} />
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Manage
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage and monitor AI swarm campaigns with dedicated goals and assigned teams
          </p>
        </div>
        <Button onClick={() => setShowCreateCampaign(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Total Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground">All campaigns</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCampaigns.length}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Assigned Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(campaigns.flatMap(c => c.assignedAgents)).size}
            </div>
            <p className="text-xs text-muted-foreground">Unique agents deployed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Avg. Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(campaigns.reduce((sum, c) => sum + c.progress, 0) / campaigns.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all campaigns</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({campaigns.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeCampaigns.length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive ({inactiveCampaigns.length})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({draftCampaigns.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {campaigns.map(renderCampaignCard)}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {activeCampaigns.map(renderCampaignCard)}
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          {inactiveCampaigns.map(renderCampaignCard)}
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          {draftCampaigns.map(renderCampaignCard)}
        </TabsContent>
      </Tabs>

      <CreateCampaignDialog 
        open={showCreateCampaign} 
        onOpenChange={setShowCreateCampaign}
      />

      {selectedCampaignForOptimization && (
        <CampaignModelOptimizer
          campaignId={selectedCampaignForOptimization}
          open={!!selectedCampaignForOptimization}
          onOpenChange={() => setSelectedCampaignForOptimization(null)}
        />
      )}
    </div>
  );
};

export default Campaigns;
