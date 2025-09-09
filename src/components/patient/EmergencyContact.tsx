import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Phone, AlertTriangle, Heart, Clock, Users } from 'lucide-react';
import { mockPatients } from '@/data/mockData';

export function EmergencyContact() {
  const [isEmergencyDialogOpen, setIsEmergencyDialogOpen] = useState(false);
  const patient = mockPatients[0]; // For demo

  const handleEmergencyCall = (type: 'doctor' | 'emergency' | 'family') => {
    console.log('Emergency call initiated:', type);
    setIsEmergencyDialogOpen(false);
    // In a real app, this would initiate the call or send alerts
  };

  return (
    <Dialog open={isEmergencyDialogOpen} onOpenChange={setIsEmergencyDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="bg-destructive hover:bg-destructive/90">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Emergency Help
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Emergency Assistance
          </DialogTitle>
          <DialogDescription>
            Choose the type of emergency assistance you need:
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* 911 Emergency */}
          <Card className="border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-destructive/10 rounded-full">
                    <Phone className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <p className="font-semibold text-destructive">Life-threatening Emergency</p>
                    <p className="text-sm text-muted-foreground">Call 911 immediately</p>
                  </div>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleEmergencyCall('emergency')}
                >
                  Call 911
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Emergency */}
          <Card className="border-warning/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/10 rounded-full">
                    <Heart className="h-4 w-4 text-warning" />
                  </div>
                  <div>
                    <p className="font-semibold text-warning">Medical Emergency</p>
                    <p className="text-sm text-muted-foreground">Contact {patient.assignedDoctor}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEmergencyCall('doctor')}
                  className="border-warning text-warning hover:bg-warning/10"
                >
                  Call Doctor
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Family Contact */}
          <Card className="border-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 rounded-full">
                    <Users className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary">Emergency Contact</p>
                    <p className="text-sm text-muted-foreground">
                      {patient.emergencyContact.name} ({patient.emergencyContact.relationship})
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEmergencyCall('family')}
                  className="border-secondary text-secondary hover:bg-secondary/10"
                >
                  Call Contact
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Status Info */}
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Current Health Status</span>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">{patient.status}</Badge>
              <Badge variant="outline">Risk: {patient.riskLevel}</Badge>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Your location and medical information will be shared with emergency responders.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}