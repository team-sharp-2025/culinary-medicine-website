import React from 'react';
import { Button, Card } from '@ui/*';
import { Navbar } from '../components/Navbar';

export default function HomePage() {
  return (
    <main className="p-8">
      <Navbar links={[{ label: 'Home', href: '/' }, { label: 'Blogs', href: '/blogs' }, { label: 'Contact', href: '/contact' }]} />
      <h1 className="text-3xl font-bold mb-6">Dr. Smith's Clinic</h1>
      <section className="grid gap-6 md:grid-cols-2">
        <Card title="About Us">
          <p>Holistic health and nutritional care with over 20 years of experience.</p>
        </Card>
        <Card title="Our Services">
          <ul className="list-disc pl-5">
            <li>Nutrition Consultation</li>
            <li>Wellness Programs</li>
            <li>Chronic Disease Management</li>
          </ul>
        </Card>
      </section>
      <div className="mt-8">
        <Button variant="primary">Book Appointment</Button>
      </div>
    </main>
  );
}