const config = {
    PINATA_API_KEY: import.meta.env.VITE_PINATA_API_KEY || process.env.REACT_APP_PINATA_API_KEY,
    PINATA_SECRET_API_KEY: import.meta.env.VITE_PINATA_SECRET_API_KEY || process.env.REACT_APP_PINATA_SECRET_API_KEY,
  };
  
  export default config;