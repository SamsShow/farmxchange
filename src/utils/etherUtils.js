import { ethers } from 'ethers';

export const parseEther = (value) => {
  try {
    if (ethers.utils && ethers.utils.parseEther) {
      return ethers.utils.parseEther(value);
    } else if (ethers.parseEther) {
      return ethers.parseEther(value);
    }
    throw new Error('Ethers library not properly initialized');
  } catch (error) {
    console.error('Error in parseEther:', error);
    throw error;
  }
};

export const formatEther = (value) => {
  try {
    if (ethers.utils && ethers.utils.formatEther) {
      return ethers.utils.formatEther(value);
    } else if (ethers.formatEther) {
      return ethers.formatEther(value);
    }
    throw new Error('Ethers library not properly initialized');
  } catch (error) {
    console.error('Error in formatEther:', error);
    throw error;
  }
};

export const isEthersAvailable = () => {
  return !!(ethers.utils || ethers.parseEther);
};