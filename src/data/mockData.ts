import { Patient, Medication, LabReport, Alert } from '@/types/patient';
import { User } from '@/types/auth';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'dr.smith@healthsync.com',
    name: 'Dr. Sarah Smith',
    role: 'doctor',
    specialization: 'Cardiology',
    department: 'Internal Medicine',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    email: 'john.doe@patient.com',
    name: 'John Doe',
    role: 'patient',
  },
  {
    id: '3',
    email: 'pharmacy@centralrx.com',
    name: 'Central Pharmacy',
    role: 'pharmacy',
    licenseNumber: 'PH12345'
  },
  {
    id: '4',
    email: 'admin@healthsync.com',
    name: 'System Administrator',
    role: 'admin',
    department: 'IT Administration'
  }
];

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1-555-0123',
    dateOfBirth: '1975-03-15',
    gender: 'male',
    address: '123 Main St, Anytown, ST 12345',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+1-555-0124',
      relationship: 'Spouse'
    },
    status: 'monitoring',
    riskLevel: 'medium',
    admissionDate: '2024-01-15',
    dischargeDate: '2024-01-20',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    assignedDoctor: 'Dr. Sarah Smith',
    adherenceRate: 85,
    lastActivity: '2024-01-25T10:30:00Z'
  },
  {
    id: 'p2',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1-555-0125',
    dateOfBirth: '1982-07-22',
    gender: 'female',
    address: '456 Oak Ave, Anytown, ST 12345',
    emergencyContact: {
      name: 'Carlos Garcia',
      phone: '+1-555-0126',
      relationship: 'Husband'
    },
    status: 'critical',
    riskLevel: 'high',
    admissionDate: '2024-01-18',
    dischargeDate: '2024-01-25',
    conditions: ['Cardiac Arrhythmia', 'Chronic Heart Failure'],
    assignedDoctor: 'Dr. Sarah Smith',
    adherenceRate: 72,
    lastActivity: '2024-01-25T14:15:00Z'
  },
  {
    id: 'p3',
    name: 'Robert Johnson',
    email: 'robert.j@email.com',
    phone: '+1-555-0127',
    dateOfBirth: '1968-11-03',
    gender: 'male',
    address: '789 Pine Rd, Anytown, ST 12345',
    emergencyContact: {
      name: 'Susan Johnson',
      phone: '+1-555-0128',
      relationship: 'Wife'
    },
    status: 'stable',
    riskLevel: 'low',
    admissionDate: '2024-01-10',
    dischargeDate: '2024-01-16',
    conditions: ['Post-surgical Recovery', 'Mild Hypertension'],
    assignedDoctor: 'Dr. Sarah Smith',
    adherenceRate: 94,
    lastActivity: '2024-01-25T08:45:00Z'
  }
];

export const mockMedications: Medication[] = [
  {
    id: 'm1',
    patientId: 'p1',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    startDate: '2024-01-20',
    instructions: 'Take with meals',
    prescribedBy: 'Dr. Sarah Smith',
    status: 'active',
    adherenceRate: 90,
    nextDue: '2024-01-26T08:00:00Z',
    sideEffects: ['Nausea', 'Diarrhea']
  },
  {
    id: 'm2',
    patientId: 'p1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2024-01-20',
    instructions: 'Take in the morning',
    prescribedBy: 'Dr. Sarah Smith',
    status: 'active',
    adherenceRate: 88,
    nextDue: '2024-01-26T09:00:00Z'
  },
  {
    id: 'm3',
    patientId: 'p2',
    name: 'Digoxin',
    dosage: '0.25mg',
    frequency: 'Once daily',
    startDate: '2024-01-25',
    instructions: 'Take at same time daily',
    prescribedBy: 'Dr. Sarah Smith',
    status: 'active',
    adherenceRate: 75,
    nextDue: '2024-01-26T10:00:00Z'
  }
];

export const mockLabReports: LabReport[] = [
  {
    id: 'l1',
    patientId: 'p1',
    type: 'Blood Glucose',
    date: '2024-01-24',
    results: {
      glucose: { value: 145, unit: 'mg/dL', normal: '70-100' },
      hba1c: { value: 7.2, unit: '%', normal: '<7.0' }
    },
    status: 'abnormal',
    uploadedBy: 'p1',
    aiAnalysis: {
      summary: 'Elevated glucose levels indicate suboptimal diabetes control',
      recommendations: ['Consider medication adjustment', 'Dietary consultation'],
      riskFactors: ['Diabetes complications risk increased']
    }
  },
  {
    id: 'l2',
    patientId: 'p2',
    type: 'Cardiac Markers',
    date: '2024-01-25',
    results: {
      troponin: { value: 0.8, unit: 'ng/mL', normal: '<0.04' },
      bnp: { value: 450, unit: 'pg/mL', normal: '<100' }
    },
    status: 'critical',
    uploadedBy: 'lab-tech-1',
    aiAnalysis: {
      summary: 'Elevated cardiac markers suggest ongoing heart stress',
      recommendations: ['Immediate cardiology consultation', 'Monitor closely'],
      riskFactors: ['Heart failure progression', 'Cardiac event risk']
    }
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    patientId: 'p2',
    type: 'emergency',
    severity: 'critical',
    title: 'Critical Lab Results',
    message: 'Elevated cardiac markers detected in latest lab report',
    timestamp: '2024-01-25T15:30:00Z',
    acknowledged: false,
    actionRequired: 'Contact patient immediately for cardiology consultation'
  },
  {
    id: 'a2',
    patientId: 'p1',
    type: 'medication',
    severity: 'warning',
    title: 'Medication Adherence Issue',
    message: 'Patient missed 2 consecutive Metformin doses',
    timestamp: '2024-01-25T12:00:00Z',
    acknowledged: false,
    actionRequired: 'Follow up with patient about medication compliance'
  },
  {
    id: 'a3',
    patientId: 'p3',
    type: 'vitals',
    severity: 'info',
    title: 'Routine Check-in Due',
    message: 'Patient due for weekly vitals check',
    timestamp: '2024-01-25T09:00:00Z',
    acknowledged: true,
    acknowledgedBy: 'Dr. Sarah Smith'
  }
];

// Current authenticated user (for demo)
export const currentUser = mockUsers[0]; // Dr. Sarah Smith