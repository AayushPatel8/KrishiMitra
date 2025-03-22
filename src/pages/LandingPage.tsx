import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ShoppingBasket, Truck, Users, Star, Store } from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Fresh From Farm to Table</h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
            Connect directly with local farmers and get fresh produce delivered to your doorstep
          </p>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Let's Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Leaf className="w-8 h-8 text-green-600" />}
              title="100% Fresh"
              description="All produce is harvested fresh and delivered within 24 hours"
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-green-600" />}
              title="Direct from Farmers"
              description="Support local farmers and get the best prices without middlemen"
            />
            <FeatureCard 
              icon={<Truck className="w-8 h-8 text-green-600" />}
              title="Fast Delivery"
              description="Free delivery for orders above ₹500 within the city"
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ShoppingBasket className="text-green-600" />
                For Customers
              </h3>
              <div className="space-y-4">
                <Step number="1" text="Browse fresh produce from local farmers" />
                <Step number="2" text="Add items to your basket" />
                <Step number="3" text="Choose delivery time and location" />
                <Step number="4" text="Receive fresh produce at your doorstep" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Store className="text-green-600" />
                For Farmers
              </h3>
              <div className="space-y-4">
                <Step number="1" text="Register as a verified farmer" />
                <Step number="2" text="List your fresh produce" />
                <Step number="3" text="Receive orders from customers" />
                <Step number="4" text="Prepare and deliver fresh produce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
              name="Sarah Johnson"
              role="Customer"
              text="The quality of produce is amazing! I love supporting local farmers and getting fresh vegetables delivered to my door."
            />
            <TestimonialCard
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
              name="John Smith"
              role="Farmer"
              text="This platform has helped me reach more customers and grow my business. The process is simple and efficient."
            />
            <TestimonialCard
              image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
              name="Emily Davis"
              role="Customer"
              text="I've never had fresher vegetables! The direct connection with farmers makes all the difference."
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">KrishiMitra</h3>
              <p className="text-gray-300">Connecting farmers and consumers for fresher, better produce.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Farmers</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Become a Seller</a></li>
                <li><a href="#" className="hover:text-white">Farmer Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-300">
                <li>support@krishimitra.com</li>
                <li>+91 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-800 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 KrishiMitra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Step({ number, text }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}

function TestimonialCard({ image, name, role, text }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover mr-4" />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-700">{text}</p>
      <div className="flex text-yellow-400 mt-4">
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
        <Star className="w-5 h-5 fill-current" />
      </div>
    </div>
  );
}

export default LandingPage;