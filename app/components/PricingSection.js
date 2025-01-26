import React from 'react';
import { Check, X, Crown, Zap, Star } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for individuals and small teams',
      price: 'Free',
      duration: 'forever',
      icon: Zap,
      features: [
        { included: true, text: 'Up to 10 group chats' },
        { included: true, text: 'Basic message encryption' },
        { included: true, text: '5 GB file storage' },
        { included: true, text: 'Mobile app access' },
        { included: false, text: 'Custom emojis' },
        { included: false, text: 'Priority support' },
        { included: false, text: 'Admin controls' },
        { included: false, text: 'API access' }
      ],
      buttonText: 'Get Started',
      highlighted: false
    },
    {
      name: 'Pro',
      description: 'Ideal for growing businesses',
      price: '$12',
      duration: 'per user/month',
      icon: Star,
      features: [
        { included: true, text: 'Unlimited group chats' },
        { included: true, text: 'End-to-end encryption' },
        { included: true, text: '50 GB file storage' },
        { included: true, text: 'Mobile app access' },
        { included: true, text: 'Custom emojis' },
        { included: true, text: 'Priority support' },
        { included: false, text: 'Admin controls' },
        { included: false, text: 'API access' }
      ],
      buttonText: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Premium',
      description: 'For enterprises and large teams',
      price: '$25',
      duration: 'per user/month',
      icon: Crown,
      features: [
        { included: true, text: 'Unlimited group chats' },
        { included: true, text: 'Advanced encryption' },
        { included: true, text: 'Unlimited storage' },
        { included: true, text: 'Mobile app access' },
        { included: true, text: 'Custom emojis' },
        { included: true, text: '24/7 Premium support' },
        { included: true, text: 'Advanced admin controls' },
        { included: true, text: 'Full API access' }
      ],
      buttonText: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, transparent pricing that grows with you. Try any plan free for 30 days.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-white shadow-xl ring-2 ring-violet-600 scale-105'
                  : 'bg-white shadow-lg'
              }`}
            >
              {/* Plan Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600 mt-1">{plan.description}</p>
                </div>
                <plan.icon className={`h-8 w-8 ${
                  plan.highlighted ? 'text-violet-600' : 'text-gray-400'
                }`} />
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.duration}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-violet-600 text-white hover:bg-violet-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Have questions?{' '}
            <a href="#" className="text-violet-600 font-semibold hover:text-violet-700">
              Check out our FAQ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;