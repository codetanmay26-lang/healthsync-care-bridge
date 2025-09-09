import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MedicationTracker } from '@/components/patient/MedicationTracker';
import { HealthLogger } from '@/components/patient/HealthLogger';
import { LabUploader } from '@/components/patient/LabUploader';
import { EmergencyContact } from '@/components/patient/EmergencyContact';
import { VitalsMonitor } from '@/components/patient/VitalsMonitor';
import { 
  Clock, 
  Heart, 
  Activity, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { mockPatients, mockMedications, currentUser } from '@/data/mockData';

export default function PatientPortal() {
  // For demo purposes, we'll show the first patient's data
  const patient = mockPatients[0];
  const patientMedications = mockMedications.filter(med => med.patientId === patient.id);
  const upcomingMeds = patientMedications.filter(med => med.status === 'active');
  const overallAdherence = patient.adherenceRate;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {patient.name}</h1>
            <p className="text-muted-foreground">Your health dashboard</p>
          </div>
          <EmergencyContact />
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Overall Health</p>
                  <p className="text-2xl font-bold text-primary">{patient.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium">Adherence Rate</p>
                  <p className="text-2xl font-bold text-secondary">{overallAdherence}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm font-medium">Active Medications</p>
                  <p className="text-2xl font-bold text-accent">{upcomingMeds.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Next Appointment</p>
                  <p className="text-sm font-bold">Jan 30, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Adherence Progress */}
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Medication Adherence Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">This Week's Progress</span>
                <span className="text-sm font-bold">{overallAdherence}%</span>
              </div>
              <Progress value={overallAdherence} className="h-3" />
              {overallAdherence >= 80 ? (
                <Alert className="bg-primary/10 border-primary/20">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-primary">
                    Great job! You're maintaining excellent medication adherence.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="bg-warning/10 border-warning/20">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <AlertDescription className="text-warning">
                    Your adherence could be improved. Consider setting up more reminders.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <VitalsMonitor />
            <MedicationTracker medications={upcomingMeds} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <HealthLogger />
            <LabUploader />
            
            {/* Recent Activities */}
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Metformin taken</p>
                      <p className="text-sm text-muted-foreground">Today at 8:00 AM</p>
                    </div>
                    <Badge variant="secondary">On time</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Blood pressure logged</p>
                      <p className="text-sm text-muted-foreground">Yesterday at 7:30 PM</p>
                    </div>
                    <Badge variant="default">Logged</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Lab report uploaded</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                    <Badge variant="outline">Reviewed</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}