export type UserRole = 'doctor' | 'patient' | 'pharmacy' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  specialization?: string; // for doctors
  licenseNumber?: string; // for doctors/pharmacies
  department?: string; // for doctors/admins
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}