import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast

function AdminPage({ contract, signer }) {
  const [farmerName, setFarmerName] = useState('');
  const [farmerAddress, setFarmerAddress] = useState(''); // Farmer Address input
  const [farmerDetails, setFarmerDetails] = useState(null);

  // Updated registerFarmer to include both farmerName and farmerAddress
  const registerFarmer = async () => {
    if (!farmerName || !farmerAddress) {
      toast.error('Both Farmer Name and Address are required.'); // Notify user for missing fields
      return;
    }

    try {
      const tx = await contract.registerFarmer(farmerAddress, farmerName); // Passing both farmerAddress and farmerName
      await tx.wait();
      toast.success('Farmer registered successfully!'); // Use toast here
    } catch (error) {
      console.error('Error registering farmer:', error);
      toast.error('Failed to register farmer.'); // Use toast here
    }
  };

  const getFarmerDetails = async () => {
    if (!farmerAddress) {
      toast.error('Farmer Address is required to fetch details.'); // Notify user for missing fields
      return;
    }

    try {
      const details = await contract.getFarmerDetails(farmerAddress);
      setFarmerDetails({
        name: details[0],
        isRegistered: details[1]
      });
      toast.success('Farmer details fetched successfully!'); // Optional success message
    } catch (error) {
      console.error('Error getting farmer details:', error);
      toast.error('Failed to get farmer details.'); // Use toast here
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 bg-green-600">
        <h1 className="text-2xl font-bold text-white">Admin Page</h1>
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
            <input 
              type="text" 
              value={farmerAddress} 
              onChange={(e) => setFarmerAddress(e.target.value)} 
              placeholder="Farmer Address" 
              className="mt-3 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
            <button 
              onClick={registerFarmer}
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
            <button 
              onClick={getFarmerDetails}
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
