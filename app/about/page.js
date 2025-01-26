import React from 'react';
import { Users, Clock, Globe, Shield, Medal, Heart, Sparkles, ArrowRight } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-violet-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Making Communication 
            <span className="text-violet-600"> Human Again</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            We're on a mission to transform how people connect online, making digital conversations as natural and meaningful as face-to-face interactions.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '10M+', label: 'Active Users' },
            { number: '160+', label: 'Countries' },
            { number: '99.9%', label: 'Uptime' },
            { number: '4.9/5', label: 'User Rating' }
          ].map((stat, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white shadow-lg">
              <div className="text-3xl font-bold text-violet-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, Bubble emerged from a simple observation: despite being more connected than ever, meaningful conversations were becoming rare in the digital age.
              </p>
              <p className="text-gray-600 mb-4">
                We set out to create a platform that would preserve the warmth and authenticity of real-world conversations while leveraging the convenience of modern technology.
              </p>
              <p className="text-gray-600">
                Today, Bubble is more than just a chat app - it's a global community where millions of people connect, share, and build relationships that matter.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-violet-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
                  <img 
                    src={`/api/placeholder/200/200`} 
                    alt={`Team moment ${i}`}
                    className="rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Human First', description: 'We believe technology should enhance human connection, not replace it.' },
              { icon: Shield, title: 'Trust & Security', description: 'Your privacy and security are the foundation of everything we build.' },
              { icon: Users, title: 'Inclusive Community', description: 'Creating spaces where everyone feels welcome and heard.' }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <value.icon className="h-12 w-12 text-violet-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Chen', role: 'CEO & Founder' },
              { name: 'Alex Rivera', role: 'CTO' },
              { name: 'Maya Patel', role: 'Head of Design' },
              { name: 'James Wilson', role: 'Head of Product' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-violet-100 rounded-full p-4 aspect-square mb-4">
                  <img 
                    src={`/api/placeholder/150/150`} 
                    alt={member.name}
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're always looking for passionate people to join our mission of making communication more human.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-colors">
              View Open Positions
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;