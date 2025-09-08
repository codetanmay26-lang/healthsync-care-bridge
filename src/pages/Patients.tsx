import { useState } from 'react';
import { Search, Filter, Plus, Users, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/dashboard/StatCard';
import { PatientsList } from '@/components/dashboard/PatientsList';
import { mockPatients } from '@/data/mockData';

export function Patients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'critical' | 'monitoring' | 'stable'>('all');

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.conditions.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const criticalPatients = mockPatients.filter(p => p.status === 'critical').length;
  const monitoringPatients = mockPatients.filter(p => p.status === 'monitoring').length;
  const stablePatients = mockPatients.filter(p => p.status === 'stable').length;
  const averageAdherence = Math.round(
    mockPatients.reduce((sum, p) => sum + p.adherenceRate, 0) / mockPatients.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Patient Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage your patients' post-discharge care
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value={mockPatients.length}
          change="+2 this week"
          changeType="positive"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Critical Status"
          value={criticalPatients}
          change="No change"
          changeType="neutral"
          icon={AlertTriangle}
          trend="stable"
        />
        <StatCard
          title="Under Monitoring"
          value={monitoringPatients}
          change="+1 since yesterday"
          changeType="negative"
          icon={Clock}
          trend="up"
        />
        <StatCard
          title="Average Adherence"
          value={`${averageAdherence}%`}
          change="+3% from last month"
          changeType="positive"
          icon={Users}
          trend="up"
        />
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search patients or conditions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <Tabs value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
            <TabsList>
              <TabsTrigger value="all">All Patients ({mockPatients.length})</TabsTrigger>
              <TabsTrigger value="critical">Critical ({criticalPatients})</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring ({monitoringPatients})</TabsTrigger>
              <TabsTrigger value="stable">Stable ({stablePatients})</TabsTrigger>
            </TabsList>

            <TabsContent value={statusFilter} className="mt-6">
              <div className="space-y-4">
                {filteredPatients.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function PatientCard({ patient }: { patient: typeof mockPatients[0] }) {
  const getStatusColor = (status: typeof patient.status) => {
    switch (status) {
      case 'critical':
        return 'bg-critical text-critical-foreground';
      case 'monitoring':
        return 'bg-warning text-warning-foreground';
      case 'stable':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-primary font-medium">
            {patient.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <h3 className="font-medium">{patient.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{patient.conditions.join(', ')}</span>
            <span>•</span>
            <span>Age {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()}</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <Badge className={getStatusColor(patient.status)}>
              {patient.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-sm font-medium">
            {patient.adherenceRate}% adherence
          </div>
          <div className="text-xs text-muted-foreground">
            Last seen: {new Date(patient.lastActivity).toLocaleDateString()}
          </div>
        </div>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </div>
    </div>
  );
}

export default Patients;