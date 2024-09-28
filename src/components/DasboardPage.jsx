import React, { useState } from 'react';
import { motion } from 'framer-motion';

function DashboardPage({ contract }) {
  const [farmerCount, setFarmerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  const fetchCounts = async () => {
    if (contract) {
      try {
        const farmers = await contract.getFarmerCount();
        const products = await contract.getProductCount();
        setFarmerCount(farmers.toString());
        setProductCount(products.toString());
      } catch (error) {
        console.error('Error loading counts:', error);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-green-600">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </div>
      <div className="p-6">
        <button
          onClick={fetchCounts}
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        >
          Fetch Data
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-green-100 rounded-lg p-6 shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-xl font-semibold text-green-800 mb-2">Total Farmers</h2>
            <p className="text-4xl font-bold text-green-600">{farmerCount}</p>
          </motion.div>
          <motion.div 
            className="bg-green-100 rounded-lg p-6 shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-xl font-semibold text-green-800 mb-2">Total Products</h2>
            <p className="text-4xl font-bold text-green-600">{productCount}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
