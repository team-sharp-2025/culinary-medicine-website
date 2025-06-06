export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  imageUrl: string;
  bio: string;
  education: string[];
  contactInfo: {
    email: string;
    phone: string;
  };
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  reason: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
}