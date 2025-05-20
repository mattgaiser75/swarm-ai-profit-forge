
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Settings, 
  Users, 
  FileText, 
  Database, 
  Activity,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-all",
      isActive 
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
    )}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </Link>
);

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/", icon: <Home size={20} />, label: "Dashboard" },
    { to: "/agents", icon: <Users size={20} />, label: "Agents" },
    { to: "/workflows", icon: <Activity size={20} />, label: "Workflows" },
    { to: "/data", icon: <Database size={20} />, label: "Data Storage" },
    { to: "/documentation", icon: <FileText size={20} />, label: "Documentation" },
    { to: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMobileMenu}
        className="fixed top-4 right-4 z-50 lg:hidden"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar w-64 flex-shrink-0 border-r border-sidebar-border flex flex-col",
          "fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
              <span className="text-primary-foreground font-bold">AI</span>
            </div>
            <h1 className="text-xl font-bold text-sidebar-foreground">Swarm Control</h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.to}
            />
          ))}
        </nav>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sidebar-accent-foreground font-medium">U</span>
            </div>
            <div className="text-sidebar-foreground text-sm">
              <div className="font-medium">User</div>
              <div className="text-sidebar-foreground/70 text-xs">Free Plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4 md:px-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
