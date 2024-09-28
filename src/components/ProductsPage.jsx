import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { parseEther, formatEther, isEthersAvailable } from '../utils/etherUtils';
import { ethers } from 'ethers';

function ProductsPage({ contract, signer }) {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '', ipfsHash: '' });
  const [updateProduct, setUpdateProduct] = useState({ id: '', price: '', quantity: '', ipfsHash: '' });

  useEffect(() => {
    if (!isEthersAvailable()) {
      toast.error('Ethers library is not properly initialized');
      return;
    }
    loadProducts();
  }, [contract]);

  const loadProducts = async () => {
    if (!contract) return;
    try {
      const productCount = await contract.getProductCount();
      const loadedProducts = [];
      for (let i = 1; i <= productCount; i++) {
        const product = await contract.getProduct(i);
        loadedProducts.push({
          id: i,
          name: product[0],
          price: formatEther(product[1]),
          quantity: product[2].toString(),
          ipfsHash: product[3],
          farmer: product[4]
        });
      }
      setProducts(loadedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products.');
    }
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity || !newProduct.ipfsHash) {
      toast.error('All fields are required to add a product.');
      return;
    }

    if (isNaN(newProduct.price) || parseFloat(newProduct.price) <= 0) {
      toast.error('Invalid price entered.');
      return;
    }

    try {
      console.log("Price input:", newProduct.price);
      toast.info('Adding product...');
      
      const priceInWei = parseEther(newProduct.price);
      const tx = await contract.addProduct(
        newProduct.name,
        priceInWei,
        newProduct.quantity,
        newProduct.ipfsHash
      );
      await tx.wait();
      toast.success('Product added successfully!');
      loadProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(`Failed to add product: ${error.message}`);
    }
  };

  const purchaseProduct = async (id, price) => {
    try {
      const tx = await contract.purchaseProduct(id, 1, { value: parseEther(price) });
      await tx.wait();
      toast.success('Product purchased successfully!');
      loadProducts();
    } catch (error) {
      console.error('Error purchasing product:', error);
      toast.error('Failed to purchase product.');
    }
  };

  const updateProductDetails = async () => {
    if (!updateProduct.id || !updateProduct.price || !updateProduct.quantity || !updateProduct.ipfsHash) {
      toast.error('All fields are required to update a product.');
      return;
    }

    try {
      const tx = await contract.updateProduct(
        updateProduct.id,
        parseEther(updateProduct.price),
        updateProduct.quantity,
        updateProduct.ipfsHash
      );
      await tx.wait();
      toast.success('Product updated successfully!');
      loadProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product.');
    }
  };

  const parseEther = (value) => {
    if (ethers.utils && ethers.utils.parseEther) {
      return ethers.utils.parseEther(value);
    } else if (ethers.parseEther) {
      return ethers.parseEther(value);
    }
    throw new Error('Ethers library not properly initialized');
  };
  
  const formatEther = (value) => {
    if (ethers.utils && ethers.utils.formatEther) {
      return ethers.utils.formatEther(value);
    } else if (ethers.formatEther) {
      return ethers.formatEther(value);
    }
    throw new Error('Ethers library not properly initialized');
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-green-600">
        <h1 className="text-2xl font-bold text-white">Products</h1>
      </div>

      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <Input placeholder="Name" onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <Input placeholder="Price (ETH)" onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <Input placeholder="Quantity" type="number" onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} />
          <Input placeholder="IPFS Hash" onChange={(e) => setNewProduct({ ...newProduct, ipfsHash: e.target.value })} />
        </div>
        <Button onClick={addProduct}>Add Product</Button>
      </div>

      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Update Product</h2>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <Input placeholder="Product ID" type="number" onChange={(e) => setUpdateProduct({ ...updateProduct, id: e.target.value })} />
          <Input placeholder="New Price (ETH)" onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })} />
          <Input placeholder="New Quantity" type="number" onChange={(e) => setUpdateProduct({ ...updateProduct, quantity: e.target.value })} />
          <Input placeholder="New IPFS Hash" onChange={(e) => setUpdateProduct({ ...updateProduct, ipfsHash: e.target.value })} />
        </div>
        <Button onClick={updateProductDetails}>Update Product</Button>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Product List</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">{product.name}</h3>
                  <div className="text-sm text-gray-600">
                    <p>Price: {product.price} ETH</p>
                    <p>Quantity: {product.quantity}</p>
                    <p className="truncate">IPFS Hash: {product.ipfsHash}</p>
                  </div>
                  <div className="mt-4">
                    <Button onClick={() => purchaseProduct(product.id, product.price)} small>Purchase</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Input({ placeholder, type = "text", onChange }) {
  return (
    <div className="sm:col-span-3">
      <input 
        type={type} 
        placeholder={placeholder} 
        className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
        onChange={onChange}
      />
    </div>
  );
}

function Button({ onClick, children, small }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${small ? "px-3 py-1.5 text-sm" : "px-4 py-2"} mt-4 inline-flex items-center border border-transparent font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

export default ProductsPage;
