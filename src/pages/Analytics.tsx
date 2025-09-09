import { BarChart3, Users, Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/StatCard';
import { SystemHealth } from '@/components/dashboard/SystemHealth';
import { mockPatients, mockAlerts, mockMedications } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function Analytics() {
  const totalPatients = mockPatients.length;
  const criticalPatients = mockPatients.filter(p => p.status === 'critical').length;
  const averageAdherence = Math.round(
    mockMedications.reduce((sum, m) => sum + m.adherenceRate, 0) / mockMedications.length
  );
  const totalAlerts = mockAlerts.length;
  const acknowledgedAlerts = mockAlerts.filter(a => a.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">System Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive healthcare metrics and system performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients Monitored"
          value={totalPatients}
          change="+12% this month"
          changeType="positive"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="System Adherence Rate"
          value={`${averageAdherence}%`}
          change="+5% improvement"
          changeType="positive"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Emergency Alerts"
          value={totalAlerts}
          change="8 new today"
          changeType="negative"
          icon={AlertTriangle}
          trend="up"
        />
        <StatCard
          title="Alert Response Rate"
          value={`${Math.round((acknowledgedAlerts / totalAlerts) * 100)}%`}
          change="+3% improvement"
          changeType="positive"
          icon={Activity}
          trend="up"
        />
      </div>

      {/* Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Side - 2 columns */}
        <div className="lg:col-span-2 grid gap-6 lg:grid-cols-2">
          {/* Patient Status Distribution */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Patient Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['stable', 'monitoring', 'critical'].map((status) => {
                const count = mockPatients.filter(p => p.status === status).length;
                const percentage = Math.round((count / totalPatients) * 100);
                const getStatusColor = (status: string) => {
                  switch (status) {
                    case 'critical':
                      return 'bg-critical';
                    case 'monitoring':
                      return 'bg-warning';
                    case 'stable':
                      return 'bg-success';
                    default:
                      return 'bg-muted';
                  }
                };
                
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
                      <span className="capitalize font-medium">{status}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Progress value={percentage} className="w-24" />
                      <span className="text-sm font-medium w-12">{count}</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Medication Adherence Trends */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Medication Adherence Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMedications.map((medication, index) => (
                  <div key={medication.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{medication.name}</p>
                      <p className="text-sm text-muted-foreground">{medication.dosage}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress value={medication.adherenceRate} className="w-20" />
                      <span className="text-sm font-medium w-12">
                        {medication.adherenceRate}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alert Response Analysis */}
          <Card className="shadow-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Alert Response Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={alert.severity === 'critical' ? 'destructive' : 
                                alert.severity === 'warning' ? 'secondary' : 'default'}
                      >
                        {alert.severity}
                      </Badge>
                      {alert.acknowledged ? (
                        <Badge variant="outline">Resolved</Badge>
                      ) : (
                        <Badge variant="destructive">Pending</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - System Health */}
        <div className="space-y-6">
          <SystemHealth />
          
          {/* System Performance */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Cold-Chain Compliance</span>
                <div className="flex items-center space-x-2">
                  <Progress value={98} className="w-24" />
                  <span className="text-sm font-medium">98%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">IoT Device Uptime</span>
                <div className="flex items-center space-x-2">
                  <Progress value={99.5} className="w-24" />
                  <span className="text-sm font-medium">99.5%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Emergency Response Time</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Avg: 4.2 min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Analytics;