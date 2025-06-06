import React from 'react';
import { Button, Card } from '@ui/*';
import { Navbar } from '../components/Navbar';
import "./globals.css";

export default function AdminDashboard() {
  return (
    <main className="p-8">
      <Navbar links={[{ label: 'Dashboard', href: '/' }, { label: 'Patients', href: '/patients' }]} />
      <h1 className="text-2xl font-semibold mb-6">Admin Panel</h1>
      <section className="grid gap-6">
        <Card title="Upcoming Appointments">
          <p>Dr. Smith has 3 appointments today.</p>
        </Card>
        <Card title="Recent Patients">
          <ul className="list-disc pl-5">
            <li>John Doe - 10 AM</li>
            <li>Jane Roe - 11 AM</li>
          </ul>
        </Card>
      </section>
      <div className="mt-8">
        <Button variant="secondary">Add New Appointment</Button>
      </div>
    </main>
  );
}