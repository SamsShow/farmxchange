import React, { useState } from 'react';

function AdminPage({ contract, signer }) {
  const [farmerName, setFarmerName] = useState('');
  const [farmerAddress, setFarmerAddress] = useState('');
  const [farmerDetails, setFarmerDetails] = useState(null);

  const registerFarmer = async () => {
    try {
      const tx = await contract.registerFarmer(farmerName);
      await tx.wait();
      alert('Farmer registered successfully!');
    } catch (error) {
      console.error('Error registering farmer:', error);
      alert('Failed to register farmer.');
    }
  };

  const getFarmerDetails = async () => {
    try {
      const details = await contract.getFarmerDetails(farmerAddress);
      setFarmerDetails({
        name: details[0],
        isRegistered: details[1]
      });
    } catch (error) {
      console.error('Error getting farmer details:', error);
      alert('Failed to get farmer details.');
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Page</h1>
      </div>
      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Register Farmer</h2>
          <div className="mt-5">
            <input 
              type="text" 
              value={farmerName} 
              onChange={(e) => setFarmerName(e.target.value)} 
              placeholder="Farmer Name" 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button 
              onClick={registerFarmer}
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register Farmer
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Get Farmer Details</h2>
          <div className="mt-5">
            <input 
              type="text" 
              value={farmerAddress} 
              onChange={(e) => setFarmerAddress(e.target.value)} 
              placeholder="Farmer Address" 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button 
              onClick={getFarmerDetails}
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Details
            </button>
          </div>
          {farmerDetails && (
            <div className="mt-5 bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">Name: <span className="font-medium text-gray-900">{farmerDetails.name}</span></p>
              <p className="text-sm text-gray-600">Registered: <span className="font-medium text-gray-900">{farmerDetails.isRegistered ? 'Yes' : 'No'}</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;