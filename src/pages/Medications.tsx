import { Search, Pill, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { StatCard } from '@/components/dashboard/StatCard';
import { mockMedications, mockPatients } from '@/data/mockData';

export function Medications() {
  const activeMedications = mockMedications.filter(m => m.status === 'active').length;
  const averageAdherence = Math.round(
    mockMedications.reduce((sum, m) => sum + m.adherenceRate, 0) / mockMedications.length
  );
  const overdueCount = 2; // Mock value
  const totalPrescriptions = mockMedications.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Medication Management</h1>
          <p className="text-muted-foreground">
            Monitor medication adherence and optimize treatment plans
          </p>
        </div>
        <Button>
          <Pill className="h-4 w-4 mr-2" />
          New Prescription
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Medications"
          value={activeMedications}
          change="+3 this week"
          changeType="positive"
          icon={Pill}
          trend="up"
        />
        <StatCard
          title="Average Adherence"
          value={`${averageAdherence}%`}
          change="+2% improvement"
          changeType="positive"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Overdue Doses"
          value={overdueCount}
          change="-1 from yesterday"
          changeType="positive"
          icon={AlertTriangle}
          trend="down"
        />
        <StatCard
          title="Total Prescriptions"
          value={totalPrescriptions}
          change="No change"
          changeType="neutral"
          icon={Clock}
          trend="stable"
        />
      </div>

      {/* Medication List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Medications</span>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search medications..." 
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMedications.map((medication) => {
              const patient = mockPatients.find(p => p.id === medication.patientId);
              return (
                <MedicationCard 
                  key={medication.id} 
                  medication={medication}
                  patientName={patient?.name || 'Unknown Patient'}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MedicationCard({ 
  medication, 
  patientName 
}: { 
  medication: typeof mockMedications[0];
  patientName: string;
}) {
  const getStatusColor = (status: typeof medication.status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'paused':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getAdherenceColor = (rate: number) => {
    if (rate >= 90) return 'text-success';
    if (rate >= 70) return 'text-warning';
    return 'text-critical';
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Pill className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-1">
          <h3 className="font-medium">{medication.name}</h3>
          <p className="text-sm text-muted-foreground">
            {medication.dosage} • {medication.frequency}
          </p>
          <p className="text-sm text-muted-foreground">
            Patient: {patientName}
          </p>
          <div className="flex items-center space-x-2 mt-1">
            <Badge className={getStatusColor(medication.status)}>
              {medication.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Adherence Rate */}
        <div className="text-right space-y-1">
          <div className="text-sm font-medium">Adherence</div>
          <div className="flex items-center space-x-2">
            <Progress 
              value={medication.adherenceRate} 
              className="w-20" 
            />
            <span className={`text-sm font-medium ${getAdherenceColor(medication.adherenceRate)}`}>
              {medication.adherenceRate}%
            </span>
          </div>
        </div>

        {/* Next Due */}
        <div className="text-right space-y-1">
          <div className="text-sm font-medium">Next Due</div>
          <div className="text-sm text-muted-foreground">
            {new Date(medication.nextDue).toLocaleString()}
          </div>
        </div>

        <Button variant="outline" size="sm">
          Adjust
        </Button>
      </div>
    </div>
  );
}

export default Medications;