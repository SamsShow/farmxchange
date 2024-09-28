import React from 'react';
import { Leaf } from 'lucide-react';

const Feature = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-4">
    {icon}
    <h3 className="text-lg font-semibold mt-2">{title}</h3>
    <p className="text-sm mt-1">{description}</p>
  </div>
);

const HowItWorksStep = ({ number, title, description }) => (
  <div className="flex items-start mb-4">
    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
      {number}
    </div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-10">
      {/* <header className="bg-green-50 p-4">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="text-2xl font-bold text-green-600">FarmXchange</div>
          <div className="space-x-4">
            <a href="#" className="text-green-600">Home</a>
            <a href="#" className="text-green-600">About Us</a>
            <a href="#" className="text-green-600">Services</a>
            <a href="#" className="text-green-600">Contact</a>
          </div>
        </nav>
      </header> */}

      <main className="max-w-6xl mx-auto mt-12 px-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Digital Marketplace for Farmers</h1>
          <p className="text-xl mb-8">Connect directly with consumers and businesses. Get fair prices for your produce.</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full text-lg">Subscribe Now</button>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <img src="https://images.unsplash.com/photo-1657288649124-b80bdee3c17e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Organic Farming" className="rounded-md mx-auto" />
          <img src="https://plus.unsplash.com/premium_photo-1666822818340-2f8e26f0e50a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Fresh Produce" className="rounded-md mx-auto" />
          <img src="https://plus.unsplash.com/premium_photo-1686285539247-818ad6be256c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Direct Sales" className="rounded-md mx-auto" />
          <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Fair Prices" className="rounded-md mx-auto" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature 
              icon={<Leaf className="w-12 h-12 text-green-600" />}
              title="Farmer Registration"
              description="Register on the platform to list your products and manage your marketplace presence."
            />
            <Feature 
              icon={<Leaf className="w-12 h-12 text-green-600" />}
              title="Product Listings"
              description="Add your crops, fruits, and vegetables with details like name, price, quantity, and images."
            />
            <Feature 
              icon={<Leaf className="w-12 h-12 text-green-600" />}
              title="Secure Transactions"
              description="Smart contracts ensure transparent and secure transactions between farmers and buyers."
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="max-w-2xl mx-auto">
            <HowItWorksStep 
              number="1"
              title="Register as a Farmer"
              description="Create your account on FarmXchange to start selling your produce."
            />
            <HowItWorksStep 
              number="2"
              title="List Your Products"
              description="Add your products with details and images. All information is stored securely on the blockchain."
            />
            <HowItWorksStep 
              number="3"
              title="Connect with Buyers"
              description="Buyers can browse your products and make purchases directly using cryptocurrency."
            />
            <HowItWorksStep 
              number="4"
              title="Secure Transactions"
              description="Smart contracts manage the payment process, ensuring fair and transparent deals."
            />
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Ready to revolutionize your farming business?</h2>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full text-lg">Join FarmXchange Today</button>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-2">About Us</h3>
              <p className="text-sm">FarmXchange is a decentralized platform connecting farmers directly with consumers and businesses.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Quick Links</h3>
              <ul className="text-sm">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Contact Us</h3>
              <p className="text-sm">Email: info@farmxchange.com</p>
              <p className="text-sm">Phone: (123) 456-7890</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-green-300">Facebook</a>
                <a href="#" className="text-white hover:text-green-300">Twitter</a>
                <a href="#" className="text-white hover:text-green-300">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            © {new Date().getFullYear()} FarmXchange. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;