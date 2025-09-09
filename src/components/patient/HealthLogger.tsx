import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, Thermometer, Scale, Activity, Plus } from 'lucide-react';

interface HealthEntry {
  id: string;
  type: 'blood_pressure' | 'temperature' | 'weight' | 'symptoms';
  value: string;
  notes?: string;
  timestamp: string;
}

export function HealthLogger() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'log' | 'history'>('log');
  const [bloodPressure, setBloodPressure] = useState({ systolic: '', diastolic: '' });
  const [temperature, setTemperature] = useState('');
  const [weight, setWeight] = useState('');
  const [symptoms, setSymptoms] = useState('');
  
  const [recentEntries] = useState<HealthEntry[]>([
    {
      id: '1',
      type: 'blood_pressure',
      value: '120/80',
      timestamp: '2024-01-25T14:30:00Z'
    },
    {
      id: '2',
      type: 'weight',
      value: '75 kg',
      timestamp: '2024-01-25T08:00:00Z'
    }
  ]);

  const handleLogVitals = (type: string) => {
    let value = '';
    switch (type) {
      case 'blood_pressure':
        value = `${bloodPressure.systolic}/${bloodPressure.diastolic}`;
        setBloodPressure({ systolic: '', diastolic: '' });
        break;
      case 'temperature':
        value = `${temperature}°F`;
        setTemperature('');
        break;
      case 'weight':
        value = `${weight} kg`;
        setWeight('');
        break;
      case 'symptoms':
        value = symptoms;
        setSymptoms('');
        break;
    }
    
    console.log('Logging health data:', { type, value });
    
    // Show success toast
    toast({
      title: "Health data logged",
      description: `Successfully recorded ${type.replace('_', ' ')}: ${value}`,
    });
  };

  const getEntryIcon = (type: string) => {
    switch (type) {
      case 'blood_pressure': return <Heart className="h-4 w-4" />;
      case 'temperature': return <Thermometer className="h-4 w-4" />;
      case 'weight': return <Scale className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Health Logger
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'log' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('log')}
          >
            Log Vitals
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('history')}
          >
            History
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {activeTab === 'log' ? (
          <div className="space-y-6">
            {/* Blood Pressure */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Blood Pressure
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Systolic"
                  value={bloodPressure.systolic}
                  onChange={(e) => setBloodPressure(prev => ({ ...prev, systolic: e.target.value }))}
                />
                <span className="flex items-center">/</span>
                <Input
                  placeholder="Diastolic"
                  value={bloodPressure.diastolic}
                  onChange={(e) => setBloodPressure(prev => ({ ...prev, diastolic: e.target.value }))}
                />
                <Button 
                  size="sm"
                  onClick={() => handleLogVitals('blood_pressure')}
                  disabled={!bloodPressure.systolic || !bloodPressure.diastolic}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Temperature */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Temperature (°F)
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="98.6"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
                <Button 
                  size="sm"
                  onClick={() => handleLogVitals('temperature')}
                  disabled={!temperature}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                Weight (kg)
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="75"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <Button 
                  size="sm"
                  onClick={() => handleLogVitals('weight')}
                  disabled={!weight}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Symptoms */}
            <div className="space-y-2">
              <Label>Symptoms or Notes</Label>
              <Textarea
                placeholder="Describe any symptoms or how you're feeling today..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
              <Button 
                size="sm"
                onClick={() => handleLogVitals('symptoms')}
                disabled={!symptoms}
              >
                Log Symptoms
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h4 className="font-medium">Recent Entries</h4>
            {recentEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  {getEntryIcon(entry.type)}
                  <div>
                    <p className="font-medium">{entry.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">Logged</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}