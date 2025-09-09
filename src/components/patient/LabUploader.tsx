import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface LabReport {
  id: string;
  name: string;
  uploadDate: string;
  status: 'pending' | 'analyzed' | 'reviewed';
  aiSummary?: string;
}

export function LabUploader() {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedReports] = useState<LabReport[]>([
    {
      id: '1',
      name: 'Blood Test Results - Jan 2024',
      uploadDate: '2024-01-24',
      status: 'reviewed',
      aiSummary: 'Glucose levels slightly elevated. Consider dietary adjustments.'
    },
    {
      id: '2',
      name: 'Lipid Panel - Dec 2023',
      uploadDate: '2024-01-20',
      status: 'analyzed',
      aiSummary: 'Cholesterol levels within normal range.'
    }
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    console.log('Uploading file:', file.name);
    
    // Show success toast
    toast({
      title: "File uploaded successfully",
      description: `${file.name} has been uploaded and will be analyzed by AI.`,
    });
    
    // In a real app, this would upload to backend and trigger AI analysis
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'analyzed': return <CheckCircle className="h-4 w-4" />;
      case 'reviewed': return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'analyzed': return 'default';
      case 'reviewed': return 'default';
      default: return 'outline';
    }
  };

  return (
    <Card className="bg-card border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Lab Reports
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium mb-1">Upload Lab Reports</p>
          <p className="text-xs text-muted-foreground mb-3">
            Drag & drop files here, or click to browse
          </p>
          <Button 
            size="sm" 
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            Browse Files
          </Button>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          />
        </div>

        <Alert className="bg-primary/10 border-primary/20">
          <AlertTriangle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">
            Uploaded reports are automatically analyzed by AI and reviewed by your doctor.
          </AlertDescription>
        </Alert>

        {/* Recent Reports */}
        <div className="space-y-3">
          <h4 className="font-medium">Recent Reports</h4>
          {uploadedReports.map((report) => (
            <div key={report.id} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">{report.name}</span>
                </div>
                <Badge variant={getStatusColor(report.status)} className="flex items-center gap-1">
                  {getStatusIcon(report.status)}
                  {report.status}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">
                Uploaded on {new Date(report.uploadDate).toLocaleDateString()}
              </p>
              
              {report.aiSummary && (
                <div className="p-2 bg-background rounded text-sm">
                  <p className="font-medium text-primary mb-1">AI Analysis:</p>
                  <p className="text-muted-foreground">{report.aiSummary}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}