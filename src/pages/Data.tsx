
import React from "react";
import { useSwarm } from "@/context/SwarmContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const Data = () => {
  const { dataSources } = useSwarm();
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "mongodb":
        return (
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 font-bold">M</span>
          </div>
        );
      case "vector":
        return (
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600 font-bold">V</span>
          </div>
        );
      case "sqlite":
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold">S</span>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-600 font-bold">?</span>
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Data Storage</h1>
        <p className="text-muted-foreground">
          Configure data storage and persistence for your AI agent swarm
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataSources.map(datasource => (
          <Card key={datasource.id} className={datasource.connected ? "border-primary/20" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(datasource.type)}
                  <div>
                    <CardTitle className="text-lg">{datasource.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {datasource.type === "mongodb" ? "MongoDB" : 
                       datasource.type === "vector" ? "Vector DB" : "SQLite"}
                    </Badge>
                  </div>
                </div>
                <div>
                  {datasource.connected ? (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <X className="h-4 w-4 text-red-600" />
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {datasource.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant={datasource.connected ? "outline" : "default"}
                size="sm"
                className="w-full"
              >
                {datasource.connected ? "Configure" : "Connect"}
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        <Card className="border-dashed border-2 border-muted">
          <CardContent className="flex flex-col items-center justify-center h-full py-6">
            <div className="w-10 h-10 rounded-full border-2 border-muted flex items-center justify-center mb-2">
              <span className="text-xl">+</span>
            </div>
            <h3 className="text-lg font-medium mb-1">Add Data Source</h3>
            <p className="text-muted-foreground text-sm text-center mb-4">
              Connect a new database or storage system
            </p>
            <Button variant="outline">Add New</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Data Synchronization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Configure how data is synchronized between different storage systems
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">MongoDB → Vector DB</h4>
                  <p className="text-xs text-muted-foreground">Last sync: 2 hours ago</p>
                </div>
                <Button size="sm" variant="outline">Configure</Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">SQLite → MongoDB</h4>
                  <p className="text-xs text-muted-foreground">Last sync: 12 hours ago</p>
                </div>
                <Button size="sm" variant="outline">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Backup & Recovery</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Set up backup schedules and recovery procedures
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Daily Backups</h4>
                  <p className="text-xs text-muted-foreground">Next backup: 8 hours from now</p>
                </div>
                <Button size="sm" variant="outline">Configure</Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Restore from Backup</h4>
                  <p className="text-xs text-muted-foreground">Last backup: 05/19/2025 03:00 UTC</p>
                </div>
                <Button size="sm" variant="outline">Restore</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Data;
