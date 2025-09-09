import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Server, 
  Database, 
  Wifi, 
  Shield, 
  Activity,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'error';
  icon: any;
  description: string;
}

const systemMetrics: SystemMetric[] = [
  {
    id: '1',
    name: 'Server Uptime',
    value: 99.8,
    unit: '%',
    status: 'healthy',
    icon: Server,
    description: '30 days running'
  },
  {
    id: '2',
    name: 'Database Performance',
    value: 94,
    unit: '%',
    status: 'healthy',
    icon: Database,
    description: 'Query response time: 45ms'
  },
  {
    id: '3',
    name: 'IoT Connectivity',
    value: 87,
    unit: '%',
    status: 'warning',
    icon: Wifi,
    description: '3 devices offline'
  },
  {
    id: '4',
    name: 'Security Score',
    value: 98,
    unit: '%',
    status: 'healthy',
    icon: Shield,
    description: 'All systems secure'
  },
  {
    id: '5',
    name: 'AI Model Accuracy',
    value: 91,
    unit: '%',
    status: 'healthy',
    icon: Activity,
    description: 'Last updated: 2 hours ago'
  }
];

export function SystemHealth() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-success text-success-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'error': return 'bg-critical text-critical-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': 
      case 'error': return AlertTriangle;
      default: return Activity;
    }
  };

  const overallHealth = Math.round(
    systemMetrics.reduce((sum, metric) => sum + metric.value, 0) / systemMetrics.length
  );

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>System Health</span>
          <Badge className={getStatusColor(overallHealth > 95 ? 'healthy' : overallHealth > 85 ? 'warning' : 'error')}>
            {overallHealth}% Overall
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {systemMetrics.map((metric) => {
          const IconComponent = metric.icon;
          const StatusIcon = getStatusIcon(metric.status);
          
          return (
            <div key={metric.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{metric.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon className={`h-4 w-4 ${
                    metric.status === 'healthy' ? 'text-success' :
                    metric.status === 'warning' ? 'text-warning' : 'text-critical'
                  }`} />
                  <span className="font-bold">{metric.value}{metric.unit}</span>
                </div>
              </div>
              
              <Progress 
                value={metric.value} 
                className="h-2"
              />
              
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </div>
          );
        })}

        <div className="pt-4 border-t">
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              System Status: {overallHealth > 95 ? 'Excellent' : overallHealth > 85 ? 'Good' : 'Needs Attention'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Last checked: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}