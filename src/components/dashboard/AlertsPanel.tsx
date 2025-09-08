import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockAlerts } from '@/data/mockData';
import { Alert } from '@/types/patient';
import { cn } from '@/lib/utils';

interface AlertsPanelProps {
  className?: string;
}

export function AlertsPanel({ className }: AlertsPanelProps) {
  const recentAlerts = mockAlerts.slice(0, 5);

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-critical text-critical-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'info':
        return 'bg-info text-info-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return AlertTriangle;
      case 'warning':
        return Clock;
      case 'info':
        return CheckCircle;
      default:
        return AlertTriangle;
    }
  };

  return (
    <Card className={cn('shadow-card', className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Alerts</span>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentAlerts.map((alert) => {
            const IconComponent = getSeverityIcon(alert.severity);
            return (
              <div
                key={alert.id}
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border',
                  !alert.acknowledged ? 'bg-muted/20' : 'opacity-60'
                )}
              >
                <div className={cn('p-1 rounded-full', getSeverityColor(alert.severity))}>
                  <IconComponent className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">
                      {alert.title}
                    </p>
                    <Badge 
                      variant="outline" 
                      className={getSeverityColor(alert.severity)}
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                  {!alert.acknowledged && (
                    <Button variant="outline" size="sm" className="mt-2">
                      Acknowledge
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}