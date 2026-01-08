import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch } = FiIcons;

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() && !loading) {
      onSearch(city.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-8"
    >
      <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            disabled={loading}
            className="w-full px-4 py-3 pl-12 bg-white/90 backdrop-blur-sm rounded-xl border border-white/20 
                     focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white
                     disabled:opacity-50 disabled:cursor-not-allowed
                     text-gray-800 placeholder-gray-500 shadow-lg"
          />
          <SafeIcon 
            icon={FiSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
          />
        </div>
        <motion.button
          type="submit"
          disabled={!city.trim() || loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-3 w-full py-3 bg-white text-blue-600 font-semibold rounded-xl
                   hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200 shadow-lg"
        >
          {loading ? 'Searching...' : 'Search Weather'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchBar;