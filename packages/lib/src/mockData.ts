import { Doctor, Appointment, Service } from './types';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    experience: 15,
    imageUrl: '/api/placeholder/300/300',
    bio: 'Dr. Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions.',
    education: ['MD from Harvard Medical School', 'Residency at Johns Hopkins Hospital'],
    contactInfo: {
      email: 'sarah.johnson@healthclinic.com',
      phone: '+1 (555) 123-4567',
    },
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Orthopedics',
    experience: 12,
    imageUrl: '/api/placeholder/300/300',
    bio: 'Dr. Chen specializes in sports medicine and joint replacement surgery.',
    education: ['MD from Stanford University', 'Fellowship in Sports Medicine'],
    contactInfo: {
      email: 'michael.chen@healthclinic.com',
      phone: '+1 (555) 123-4568',
    },
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    experience: 8,
    imageUrl: '/api/placeholder/300/300',
    bio: 'Dr. Rodriguez is passionate about providing comprehensive care for children and adolescents.',
    education: ['MD from UCLA', 'Pediatric Residency at Children\'s Hospital'],
    contactInfo: {
      email: 'emily.rodriguez@healthclinic.com',
      phone: '+1 (555) 123-4569',
    },
  },
];

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'General Consultation',
    description: 'Comprehensive health checkup and consultation',
    price: 150,
    duration: 30,
  },
  {
    id: '2',
    name: 'Cardiology Consultation',
    description: 'Specialized heart health evaluation',
    price: 250,
    duration: 45,
  },
  {
    id: '3',
    name: 'Orthopedic Consultation',
    description: 'Bone and joint health assessment',
    price: 200,
    duration: 40,
  },
  {
    id: '4',
    name: 'Pediatric Checkup',
    description: 'Complete health examination for children',
    price: 120,
    duration: 25,
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    patientName: 'John Smith',
    patientEmail: 'john.smith@email.com',
    patientPhone: '+1 (555) 987-6543',
    date: '2025-06-10',
    time: '10:00',
    status: 'confirmed',
    reason: 'Regular checkup',
  },
  {
    id: '2',
    doctorId: '2',
    patientName: 'Jane Doe',
    patientEmail: 'jane.doe@email.com',
    patientPhone: '+1 (555) 987-6544',
    date: '2025-06-11',
    time: '14:30',
    status: 'pending',
    reason: 'Knee pain consultation',
  },
];
