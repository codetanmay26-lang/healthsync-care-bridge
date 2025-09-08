import { Brain, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AIInsight {
  id: string;
  type: 'dosage_adjustment' | 'risk_prediction' | 'adherence_improvement' | 'drug_interaction';
  title: string;
  description: string;
  confidence: number;
  patientId: string;
  patientName: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
}

const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'risk_prediction',
    title: 'Cardiac Event Risk Detected',
    description: 'ML model predicts 78% risk of cardiac event for Maria Garcia within 30 days based on recent lab trends.',
    confidence: 85,
    patientId: 'p2',
    patientName: 'Maria Garcia',
    priority: 'high',
    action: 'Schedule immediate cardiology consultation'
  },
  {
    id: '2',
    type: 'dosage_adjustment',
    title: 'Metformin Dosage Optimization',
    description: 'AI suggests increasing Metformin to 750mg twice daily for John Doe based on glucose trends and tolerance.',
    confidence: 92,
    patientId: 'p1',
    patientName: 'John Doe',
    priority: 'medium',
    action: 'Review and adjust prescription'
  },
  {
    id: '3',
    type: 'adherence_improvement',
    title: 'Adherence Pattern Alert',
    description: 'John Doe shows 65% weekend adherence vs 95% weekday. Consider automated weekend reminders.',
    confidence: 89,
    patientId: 'p1',
    patientName: 'John Doe',
    priority: 'low',
    action: 'Enable weekend reminder system'
  }
];

export function AIInsightsPanel() {
  const getTypeIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'risk_prediction':
        return AlertTriangle;
      case 'dosage_adjustment':
        return TrendingUp;
      case 'adherence_improvement':
        return Lightbulb;
      case 'drug_interaction':
        return AlertTriangle;
      default:
        return Brain;
    }
  };

  const getPriorityColor = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-critical text-critical-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-info text-info-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <span>AI Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAIInsights.map((insight) => {
            const IconComponent = getTypeIcon(insight.type);
            return (
              <div
                key={insight.id}
                className="p-4 border rounded-lg space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-4 w-4 text-primary" />
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                  </div>
                  <Badge className={getPriorityColor(insight.priority)}>
                    {insight.priority}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">{insight.patientName}</span> • 
                    <span className="ml-1">{insight.confidence}% confidence</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  {insight.action}
                </Button>
              </div>
            );
          })}

          <Button variant="ghost" className="w-full">
            View All AI Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}