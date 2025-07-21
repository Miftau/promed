import React, { useState } from 'react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');

  const doctors = [
    { id: 1, name: "Dr. Sarah Mitchell", specialty: "Cardiology", location: "New York", rating: 4.8 },
    { id: 2, name: "Dr. James Wilson", specialty: "Dermatology", location: "Los Angeles", rating: 4.5 },
    { id: 3, name: "Dr. Priya Rao", specialty: "Pediatrics", location: "Chicago", rating: 4.9 },
    { id: 4, name: "Dr. Ahmed Khan", specialty: "Neurology", location: "Houston", rating: 4.7 },
    { id: 5, name: "Dr. Emily Hart", specialty: "General Practice", location: "San Francisco", rating: 4.6 },
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (specialty === '' || doctor.specialty === specialty)
  );

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Health, Our Priority</h1>
          <p className="text-lg md:text-xl mb-8">Access licensed doctors from the comfort of your home with secure online consultations and home visits.</p>
          <a href="#features" className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition duration-300">Learn More</a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">User Registration</h3>
              <p>Secure registration with personal and medical history for personalized care.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Doctor Search</h3>
              <p>Find doctors by specialty, location, and availability with ease.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Appointment Booking</h3>
              <p>Schedule online or home visits instantly with your preferred doctor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Search Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Find a Doctor</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Specialties</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Neurology">Neurology</option>
              <option value="General Practice">General Practice</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialty}</p>
                <p className="text-gray-500">{doctor.location}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{doctor.rating}</span>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">Book Appointment</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="mb-4 italic">"I was able to consult a doctor from home. The process was seamless and the doctor was very helpful."</p>
              <p className="font-semibold">— Jane Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="mb-4 italic">"The home visit service was a lifesaver. Highly recommend this app to everyone."</p>
              <p className="font-semibold">— Michael Chen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg shadow hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-2">Pay Per Consultation</h3>
              <p className="text-gray-600 mb-4">Ideal for occasional users</p>
              <p className="text-4xl font-bold mb-4">$25 <span className="text-sm font-normal">per session</span></p>
              <ul className="text-left mb-6 space-y-2">
                <li>✓ One-time payment per session</li>
                <li>✓ No subscription required</li>
                <li>✓ Access to all doctors</li>
              </ul>
              <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-300">Get Started</button>
            </div>
            <div className="bg-indigo-50 p-8 rounded-lg shadow hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-2">Monthly Subscription</h3>
              <p className="text-gray-600 mb-4">Best for regular users</p>
              <p className="text-4xl font-bold mb-4">$99 <span className="text-sm font-normal">per month</span></p>
              <ul className="text-left mb-6 space-y-2">
                <li>✓ Unlimited consultations</li>
                <li>✓ Exclusive doctor access</li>
                <li>✓ Home visit included</li>
              </ul>
              <button className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition duration-300">Subscribe Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2025 Health App. All rights reserved.</p>
          <p className="mt-2 text-sm">HIPAA Compliant | Secure & Private</p>
        </div>
      </footer>
    </div>
  );
}

