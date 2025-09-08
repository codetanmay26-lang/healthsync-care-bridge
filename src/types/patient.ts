export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  status: 'stable' | 'monitoring' | 'critical';
  riskLevel: 'low' | 'medium' | 'high';
  admissionDate: string;
  dischargeDate: string;
  conditions: string[];
  assignedDoctor: string;
  adherenceRate: number; // percentage
  lastActivity: string;
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  instructions: string;
  prescribedBy: string;
  status: 'active' | 'completed' | 'paused';
  adherenceRate: number;
  nextDue: string;
  sideEffects?: string[];
}

export interface LabReport {
  id: string;
  patientId: string;
  type: string;
  date: string;
  results: Record<string, any>;
  status: 'normal' | 'abnormal' | 'critical';
  uploadedBy: string;
  aiAnalysis?: {
    summary: string;
    recommendations: string[];
    riskFactors: string[];
  };
  fileUrl?: string;
}

export interface Alert {
  id: string;
  patientId: string;
  type: 'medication' | 'vitals' | 'lab_result' | 'emergency' | 'appointment';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  actionRequired?: string;
}