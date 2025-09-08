import { 
  Users, 
  Activity, 
  AlertTriangle, 
  Pill, 
  TrendingUp, 
  Heart,
  Brain,
  Clock
} from 'lucide-react';
import { StatCard } from './StatCard';
import { AlertsPanel } from './AlertsPanel';
import { PatientsList } from './PatientsList';
import { AIInsightsPanel } from './AIInsightsPanel';
import { mockPatients, mockAlerts } from '@/data/mockData';

export function DoctorDashboard() {
  const totalPatients = mockPatients.length;
  const criticalPatients = mockPatients.filter(p => p.status === 'critical').length;
  const averageAdherence = Math.round(
    mockPatients.reduce((sum, p) => sum + p.adherenceRate, 0) / mockPatients.length
  );
  const activeAlerts = mockAlerts.filter(a => !a.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-lg p-6 text-primary-foreground">
        <h1 className="text-2xl font-bold mb-2">Good morning, Dr. Smith</h1>
        <p className="opacity-90">
          You have {activeAlerts} urgent alerts and {criticalPatients} critical patients requiring attention.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value={totalPatients}
          change="+2 this week"
          changeType="positive"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Critical Patients"
          value={criticalPatients}
          change="No change"
          changeType="neutral"
          icon={AlertTriangle}
          trend="stable"
        />
        <StatCard
          title="Avg. Adherence Rate"
          value={`${averageAdherence}%`}
          change="+3% from last month"
          changeType="positive"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Active Alerts"
          value={activeAlerts}
          change="2 new today"
          changeType="negative"
          icon={Activity}
          trend="up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Patients List */}
        <div className="lg:col-span-2">
          <PatientsList />
        </div>

        {/* Right Sidebar - Alerts */}
        <div className="space-y-6">
          <AlertsPanel />
          <AIInsightsPanel />
        </div>
      </div>
    </div>
  );
}