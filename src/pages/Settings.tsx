
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure system settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="agents">Agent Settings</TabsTrigger>
          <TabsTrigger value="costs">Cost Controls</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic configuration for your AI swarm system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input id="system-name" defaultValue="AI Agent Swarm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-platform">Default Platform</Label>
                  <select id="default-platform" className="w-full p-2 border rounded-md">
                    <option value="n8n">n8n</option>
                    <option value="huginn">Huginn</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="system-description">System Description</Label>
                <textarea 
                  id="system-description" 
                  className="w-full p-2 border rounded-md h-20"
                  defaultValue="Autonomous AI agent swarm for revenue generation through multiple channels"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable detailed logging for debugging</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-update Workflows</Label>
                  <p className="text-sm text-muted-foreground">Automatically update workflows when agents change</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Requirements</CardTitle>
              <CardDescription>Minimum requirements for deployment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Minimum Server Requirements</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
                    <li>VPS with 1GB RAM, 1 CPU core</li>
                    <li>20GB SSD storage</li>
                    <li>Linux operating system (Ubuntu 20.04+ recommended)</li>
                    <li>Node.js 16+ (for n8n) or Ruby 2.6+ (for Huginn)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium">Recommended Hosting Providers</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
                    <li>DigitalOcean ($5/mo Droplet)</li>
                    <li>Linode ($5/mo Shared CPU)</li>
                    <li>Vultr ($5/mo Cloud Compute)</li>
                    <li>Hetzner ($3.49/mo CX11)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Model API Keys</CardTitle>
              <CardDescription>API keys for various AI model providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mistral-api-key">Mistral AI API Key</Label>
                <div className="flex">
                  <Input id="mistral-api-key" type="password" defaultValue="●●●●●●●●●●●●●●●●" className="rounded-r-none" />
                  <Button variant="outline" className="rounded-l-none">Update</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="google-api-key">Google Gemini API Key</Label>
                <div className="flex">
                  <Input id="google-api-key" type="password" defaultValue="●●●●●●●●●●●●●●●●" className="rounded-r-none" />
                  <Button variant="outline" className="rounded-l-none">Update</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="openai-api-key">OpenAI API Key (Fallback)</Label>
                <div className="flex">
                  <Input id="openai-api-key" type="password" placeholder="Enter API key" className="rounded-r-none" />
                  <Button variant="outline" className="rounded-l-none">Update</Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">API Usage Security</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Encrypt API Keys in Storage</Label>
                    <p className="text-sm text-muted-foreground">Additional encryption for stored API keys</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Button>Save All API Keys</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Integration API Keys</CardTitle>
              <CardDescription>API keys for service integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mongodb-uri">MongoDB Connection URI</Label>
                <div className="flex">
                  <Input 
                    id="mongodb-uri" 
                    type="password" 
                    defaultValue="mongodb://username:●●●●●●●●@host:27017/database" 
                    className="rounded-r-none" 
                  />
                  <Button variant="outline" className="rounded-l-none">Update</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-api-key">Email Service API Key</Label>
                <div className="flex">
                  <Input 
                    id="email-api-key" 
                    type="password" 
                    placeholder="Enter API key" 
                    className="rounded-r-none" 
                  />
                  <Button variant="outline" className="rounded-l-none">Update</Button>
                </div>
              </div>
              
              <Button>Save Integration Keys</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agents" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Default Settings</CardTitle>
              <CardDescription>Default configuration for agent behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-model">Default AI Model</Label>
                  <select id="default-model" className="w-full p-2 border rounded-md">
                    <option value="mistral-medium">Mistral Medium</option>
                    <option value="mistral-large">Mistral Large</option>
                    <option value="gemini-pro">Google Gemini Pro</option>
                    <option value="llama-70b">Llama 3 70B</option>
                    <option value="gpt-4o">GPT-4o (Fallback)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="execution-frequency">Default Execution Frequency</Label>
                  <select id="execution-frequency" className="w-full p-2 border rounded-md">
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Error Recovery</Label>
                  <p className="text-sm text-muted-foreground">Automatically retry failed tasks</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Verbose Logging</Label>
                  <p className="text-sm text-muted-foreground">Log detailed agent activity</p>
                </div>
                <Switch />
              </div>
              
              <Button>Save Default Settings</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Agent Communication</CardTitle>
              <CardDescription>Configure how agents communicate with each other</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="communication-protocol">Communication Protocol</Label>
                <select id="communication-protocol" className="w-full p-2 border rounded-md">
                  <option value="json">JSON Messages</option>
                  <option value="protobuf">Protocol Buffers</option>
                  <option value="yaml">YAML Format</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Message Encryption</Label>
                  <p className="text-sm text-muted-foreground">Encrypt inter-agent messages</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Acknowledgment Required</Label>
                  <p className="text-sm text-muted-foreground">Require response confirmation from agents</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Button>Save Communication Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="costs" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Controls</CardTitle>
              <CardDescription>Manage AI model usage costs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="daily-budget">Daily Budget Limit ($)</Label>
                <Input id="daily-budget" type="number" defaultValue="5.00" min="0" step="0.01" />
                <p className="text-xs text-muted-foreground mt-1">
                  System will pause all API calls if daily limit is reached
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="monthly-budget">Monthly Budget Cap ($)</Label>
                <Input id="monthly-budget" type="number" defaultValue="100.00" min="0" step="0.01" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alert on 80% of Budget</Label>
                  <p className="text-sm text-muted-foreground">Send notification when approaching budget limit</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Hard Spending Cap</Label>
                  <p className="text-sm text-muted-foreground">Completely stop API calls when limit is reached</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Current Usage</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Today</p>
                    <p className="text-lg font-medium">$1.45 <span className="text-xs text-muted-foreground">(29% of daily)</span></p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-lg font-medium">$32.18 <span className="text-xs text-muted-foreground">(32% of monthly)</span></p>
                  </div>
                </div>
              </div>
              
              <Button>Save Cost Controls</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cost Optimization</CardTitle>
              <CardDescription>Settings to minimize AI model usage costs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Model Downgrading</Label>
                  <p className="text-sm text-muted-foreground">Use cheaper models for simple tasks</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Response Caching</Label>
                  <p className="text-sm text-muted-foreground">Cache responses to avoid redundant API calls</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Batch Processing</Label>
                  <p className="text-sm text-muted-foreground">Group similar tasks for efficiency</p>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cache-duration">Cache Duration (hours)</Label>
                <Input id="cache-duration" type="number" defaultValue="24" min="1" max="168" />
              </div>
              
              <Button>Save Optimization Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
