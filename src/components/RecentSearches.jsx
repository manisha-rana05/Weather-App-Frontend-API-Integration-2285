import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiClock, FiMapPin } = FiIcons;

const RecentSearches = ({ searches, onSearchClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20"
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <SafeIcon icon={FiClock} className="w-5 h-5" />
        Recent Searches
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {searches.map((search) => (
          <motion.button
            key={search.id}
            onClick={() => onSearchClick(search.city)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/10 hover:bg-white/20 rounded-lg p-3 text-left
                     transition-colors duration-200 border border-white/10
                     hover:border-white/30"
          >
            <div className="flex items-center gap-2 mb-1">
              <SafeIcon icon={FiMapPin} className="w-3 h-3 text-blue-200" />
              <span className="text-white font-medium text-sm truncate">
                {search.city}
              </span>
            </div>
            <div className="text-blue-200 text-xs">
              {search.country}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentSearches;