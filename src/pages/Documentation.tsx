
import React from "react";
import { useSwarm } from "@/context/SwarmContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentation = () => {
  const { platformComparison } = useSwarm();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Documentation</h1>
        <p className="text-muted-foreground">
          Implementation guides and technical documentation
        </p>
      </div>

      <Tabs defaultValue="implementation">
        <TabsList className="mb-4">
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="comparison">Platform Comparison</TabsTrigger>
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="implementation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Huginn Implementation</CardTitle>
                <CardDescription>
                  Complete setup guide for Huginn platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-medium">Installation Requirements</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Ruby 2.6+ environment</li>
                    <li>Rails 6.0+</li>
                    <li>MySQL or PostgreSQL database</li>
                    <li>Git</li>
                    <li>$5/month VPS (minimum 1GB RAM)</li>
                  </ul>

                  <h3 className="font-medium">Core Components</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Custom agent implementation files</li>
                    <li>Database configuration</li>
                    <li>Webhook integration scripts</li>
                    <li>Model integration adapters</li>
                    <li>Communication protocol definitions</li>
                  </ul>

                  <h3 className="font-medium">Implementation Steps</h3>
                  <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Server setup and Ruby installation</li>
                    <li>Huginn deployment and configuration</li>
                    <li>Database integration</li>
                    <li>Agent import and configuration</li>
                    <li>Workflow configuration</li>
                    <li>API integrations</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>n8n Implementation</CardTitle>
                <CardDescription>
                  Complete setup guide for n8n platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-medium">Installation Requirements</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Node.js 16+ environment</li>
                    <li>Docker (recommended for deployment)</li>
                    <li>$5/month VPS (minimum 1GB RAM)</li>
                    <li>npm or yarn package manager</li>
                  </ul>

                  <h3 className="font-medium">Core Components</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Workflow template JSON files</li>
                    <li>Custom node implementations</li>
                    <li>Database connector configurations</li>
                    <li>API integration templates</li>
                    <li>Error handling workflows</li>
                  </ul>

                  <h3 className="font-medium">Implementation Steps</h3>
                  <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Server setup and Docker installation</li>
                    <li>n8n deployment with persistent storage</li>
                    <li>Custom nodes implementation</li>
                    <li>Workflow import and configuration</li>
                    <li>API key management setup</li>
                    <li>Database connection configuration</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Platform Comparison Matrix</CardTitle>
              <CardDescription>
                Feature comparison between Huginn and n8n platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Feature</th>
                      <th className="text-left py-3 px-4 font-medium">Huginn</th>
                      <th className="text-left py-3 px-4 font-medium">n8n</th>
                    </tr>
                  </thead>
                  <tbody>
                    {platformComparison.map((item, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-3 px-4">{item.feature}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <span className={`w-2 h-2 rounded-full ${item.huginn.supported ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <span>{item.huginn.supported ? 'Yes' : 'No'}</span>
                          </div>
                          {item.huginn.notes && (
                            <p className="text-xs text-muted-foreground mt-1">{item.huginn.notes}</p>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <span className={`w-2 h-2 rounded-full ${item.n8n.supported ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <span>{item.n8n.supported ? 'Yes' : 'No'}</span>
                          </div>
                          {item.n8n.notes && (
                            <p className="text-xs text-muted-foreground mt-1">{item.n8n.notes}</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Model Selection Guide</CardTitle>
                <CardDescription>
                  Guidelines for selecting appropriate AI models for each agent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-medium">Model Selection Criteria</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Required capabilities for agent tasks</li>
                    <li>Cost effectiveness for the task complexity</li>
                    <li>Context window requirements</li>
                    <li>API limits and rate considerations</li>
                    <li>Open source vs. commercial considerations</li>
                  </ul>

                  <h3 className="font-medium">Recommended Models by Agent Type</h3>
                  <div className="mt-2 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium">Market Research Agent</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Primary: Mistral Large (data analysis capabilities)<br/>
                        Alternative: Google Gemini Pro (cost-effective for most research tasks)
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium">Content Creation Agent</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Primary: Google Gemini Pro (optimal for text generation)<br/>
                        Alternative: Mistral Medium (good balance of quality and cost)
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium">Customer Relations Agent</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Primary: Mistral Medium (sufficient for most customer interactions)<br/>
                        Alternative: Llama 3 70B (good open source option)
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium">Analytics & Reports Agent</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Primary: Mistral Large (strong data analysis capabilities)<br/>
                        Fallback: OpenAI GPT-4o (for complex analytical tasks)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization Strategies</CardTitle>
                <CardDescription>
                  Techniques to minimize AI model usage costs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Tiered Model Selection</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Implement a tiered approach that uses cheaper models for simpler tasks
                      and only escalates to more expensive models when required capabilities
                      are needed.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Caching Strategies</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Implement response caching for frequently asked questions or similar
                      inputs to avoid redundant API calls for the same information.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Prompt Engineering</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Optimize prompts to be concise and effective, reducing token usage while
                      still obtaining high-quality responses.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Batch Processing</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Group similar tasks and process them in batches to reduce the overhead
                      of multiple API calls and improve efficiency.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Affiliate Marketing Implementation</CardTitle>
                <CardDescription>
                  Implementation guide for affiliate marketing revenue stream
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-medium">Key Components</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Affiliate program evaluation system</li>
                    <li>Product selection algorithms</li>
                    <li>Content creation workflows</li>
                    <li>SEO optimization processes</li>
                    <li>Conversion tracking methods</li>
                  </ul>

                  <h3 className="font-medium">Implementation Steps</h3>
                  <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Market research for profitable niches</li>
                    <li>Affiliate program evaluation and selection</li>
                    <li>Product review content generation</li>
                    <li>SEO optimization for content</li>
                    <li>Performance tracking and optimization</li>
                  </ol>

                  <h3 className="font-medium">Key Metrics</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Conversion rate by product/content</li>
                    <li>Click-through rate (CTR)</li>
                    <li>Average commission value</li>
                    <li>Return on content investment</li>
                    <li>Content ranking positions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Freelance Services Implementation</CardTitle>
                <CardDescription>
                  Implementation guide for freelance services revenue stream
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-medium">Key Components</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Job opportunity monitoring system</li>
                    <li>Proposal generation and submission</li>
                    <li>Client communication templates</li>
                    <li>Project delivery management</li>
                    <li>Feedback collection and analysis</li>
                  </ul>

                  <h3 className="font-medium">Implementation Steps</h3>
                  <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Platform API integration</li>
                    <li>Criteria setup for opportunity filtering</li>
                    <li>Proposal template creation</li>
                    <li>Client communication workflow setup</li>
                    <li>Performance tracking implementation</li>
                  </ol>

                  <h3 className="font-medium">Key Metrics</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Proposal acceptance rate</li>
                    <li>Client satisfaction scores</li>
                    <li>Project completion rate</li>
                    <li>Revenue per project hour</li>
                    <li>Client retention rate</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documentation;
