import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Pill, CheckCircle, AlertTriangle } from 'lucide-react';
import { Medication } from '@/types/patient';

interface MedicationTrackerProps {
  medications: Medication[];
}

export function MedicationTracker({ medications }: MedicationTrackerProps) {
  const getStatusColor = (adherenceRate: number) => {
    if (adherenceRate >= 90) return 'default';
    if (adherenceRate >= 70) return 'secondary';
    return 'destructive';
  };

  const getStatusText = (adherenceRate: number) => {
    if (adherenceRate >= 90) return 'Excellent';
    if (adherenceRate >= 70) return 'Good';
    return 'Needs attention';
  };

  const handleTakeMedication = (medicationId: string) => {
    // In a real app, this would update the backend
    console.log('Taking medication:', medicationId);
  };

  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5" />
          Today's Medications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.map((medication) => (
            <div key={medication.id} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{medication.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {medication.dosage} • {medication.frequency}
                  </p>
                </div>
                <Badge variant={getStatusColor(medication.adherenceRate)}>
                  {getStatusText(medication.adherenceRate)}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Next due: {new Date(medication.nextDue).toLocaleTimeString()}
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleTakeMedication(medication.id)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark Taken
                  </Button>
                  <Button size="sm" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Skip
                  </Button>
                </div>
              </div>

              {medication.instructions && (
                <p className="text-xs text-muted-foreground mt-2 p-2 bg-background rounded">
                  {medication.instructions}
                </p>
              )}
            </div>
          ))}
          
          {medications.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Pill className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No medications scheduled for today</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}