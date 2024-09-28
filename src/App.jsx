import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import Home from './components/LandingPage';
import AdminPage from './components/AdminPage';
import ProductsPage from './components/ProductsPage';
import DashboardPage from './components/DasboardPage';
import { motion, AnimatePresence } from 'framer-motion';

import { CONTRACT_ADDRESS } from './config/contractAddress';
import CONTRACT_ABI from './config/abi.json';

function App() {
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          await initializeEthers();
        }
      } catch (error) {
        console.error("An error occurred while checking wallet connection:", error);
      }
    }
  };

  const initializeEthers = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setSigner(signer);
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(contractInstance);
    } catch (error) {
      console.error("Failed to initialize Ethers:", error);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        await initializeEthers();
      } catch (error) {
        console.error("Failed to connect to wallet:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
    setSigner(null);
    setContract(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-green-50">
        <nav className="bg-green-600 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold text-white">FarmXchange</span>
                </div>
                <div className="ml-6 flex space-x-8">
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/admin">Admin</NavLink>
                  <NavLink to="/products">Products</NavLink>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </div>
              </div>
              <div className="flex items-center">
                {isConnected ? (
                  <div className="flex items-center">
                    <span className="text-white mr-4">
                      {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
                    </span>
                    <button
                      onClick={disconnectWallet}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={connectWallet}
                    className="bg-white hover:bg-green-100 text-green-700 font-bold py-2 px-4 rounded"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <AnimatedRoutes contract={contract} signer={signer} isConnected={isConnected} />
        </main>
      </div>
    </Router>
  );
}

function NavLink({ to, children }) {
  return (
    <Link 
      to={to} 
      className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium text-white hover:border-green-300 transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

function AnimatedRoutes({ contract, signer, isConnected }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/admin" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AdminPage contract={contract} signer={signer} isConnected={isConnected} />
            </motion.div>
          } 
        />
        <Route 
          path="/products" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductsPage contract={contract} signer={signer} isConnected={isConnected} />
            </motion.div>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DashboardPage contract={contract} isConnected={isConnected} />
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;