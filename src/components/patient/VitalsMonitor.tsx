import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Thermometer, Scale, Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface VitalSign {
  id: string;
  type: 'heart_rate' | 'blood_pressure' | 'temperature' | 'weight' | 'oxygen';
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  timestamp: string;
  trend?: 'up' | 'down' | 'stable';
}

const mockVitals: VitalSign[] = [
  {
    id: '1',
    type: 'heart_rate',
    value: '72',
    unit: 'bpm',
    status: 'normal',
    timestamp: '2024-01-25T14:30:00Z',
    trend: 'stable'
  },
  {
    id: '2',
    type: 'blood_pressure',
    value: '125/82',
    unit: 'mmHg',
    status: 'warning',
    timestamp: '2024-01-25T14:30:00Z',
    trend: 'up'
  },
  {
    id: '3',
    type: 'temperature',
    value: '98.6',
    unit: '°F',
    status: 'normal',
    timestamp: '2024-01-25T14:30:00Z',
    trend: 'stable'
  },
  {
    id: '4',
    type: 'weight',
    value: '74.2',
    unit: 'kg',
    status: 'normal',
    timestamp: '2024-01-25T08:00:00Z',
    trend: 'down'
  }
];

export function VitalsMonitor() {
  const getVitalIcon = (type: string) => {
    switch (type) {
      case 'heart_rate': return <Heart className="h-5 w-5" />;
      case 'blood_pressure': return <Activity className="h-5 w-5" />;
      case 'temperature': return <Thermometer className="h-5 w-5" />;
      case 'weight': return <Scale className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-critical text-critical-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'normal': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-warning" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-success" />;
      default: return null;
    }
  };

  const formatVitalName = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Vital Signs Monitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {mockVitals.map((vital) => (
            <div key={vital.id} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getVitalIcon(vital.type)}
                  <span className="font-medium">{formatVitalName(vital.type)}</span>
                </div>
                <Badge className={getStatusColor(vital.status)}>
                  {vital.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {vital.value}
                  <span className="text-sm text-muted-foreground ml-1">
                    {vital.unit}
                  </span>
                </div>
                {getTrendIcon(vital.trend)}
              </div>
              
              <p className="text-xs text-muted-foreground mt-2">
                Last updated: {new Date(vital.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-primary" />
            <span className="font-medium text-primary">Health Summary</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Overall vitals are within acceptable ranges. Blood pressure shows slight elevation - 
            continue monitoring and maintain medication schedule.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}