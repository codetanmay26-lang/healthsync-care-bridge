import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Pill,
  Activity,
  AlertTriangle,
  FileText,
  BarChart3,
  Calendar,
  MessageSquare
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { currentUser } from '@/data/mockData';
import type { UserRole } from '@/types/auth';

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const navigationItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
    roles: ['doctor', 'patient', 'pharmacy', 'admin']
  },
  {
    title: 'Patients',
    url: '/patients',
    icon: Users,
    roles: ['doctor', 'admin']
  },
  {
    title: 'My Health',
    url: '/health',
    icon: Activity,
    roles: ['patient']
  },
  {
    title: 'Medications',
    url: '/medications',
    icon: Pill,
    roles: ['doctor', 'patient', 'pharmacy']
  },
  {
    title: 'Lab Reports',
    url: '/reports',
    icon: FileText,
    roles: ['doctor', 'patient', 'admin']
  },
  {
    title: 'Alerts',
    url: '/alerts',
    icon: AlertTriangle,
    roles: ['doctor', 'pharmacy', 'admin']
  },
  {
    title: 'Inventory',
    url: '/inventory',
    icon: BarChart3,
    roles: ['pharmacy', 'admin']
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart3,
    roles: ['admin']
  },
  {
    title: 'Appointments',
    url: '/appointments',
    icon: Calendar,
    roles: ['doctor', 'patient']
  },
  {
    title: 'Messages',
    url: '/messages',
    icon: MessageSquare,
    roles: ['doctor', 'patient', 'pharmacy']
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  
  const userRole = currentUser.role;
  const visibleItems = navigationItems.filter(item => item.roles.includes(userRole));
  const isCollapsed = state === 'collapsed';
  
  const getNavClass = (url: string) => {
    const isActive = location.pathname === url;
    return isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted';
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-card">
        <SidebarGroup>
          <SidebarGroupLabel>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <NavLink 
                      to={item.url}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}