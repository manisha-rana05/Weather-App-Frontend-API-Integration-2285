import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiAlertCircle } = FiIcons;

const ErrorMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-4 mb-6 
                 flex items-center gap-3 max-w-md mx-auto"
    >
      <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-red-200 flex-shrink-0" />
      <p className="text-red-100">{message}</p>
    </motion.div>
  );
};

export default ErrorMessage;