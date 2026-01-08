import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMapPin, FiThermometer, FiDroplet, FiWind, FiEye, FiBarChart3 } = FiIcons;

const WeatherCard = ({ weatherData }) => {
  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity, pressure },
    weather: [{ main: weatherMain, description, icon }],
    wind: { speed },
    visibility
  } = weatherData;

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatTemp = (temp) => Math.round(temp);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <SafeIcon icon={FiMapPin} className="w-5 h-5" />
            {name}, {country}
          </h2>
          <p className="text-blue-100 capitalize">{description}</p>
        </div>
        <img 
          src={getWeatherIcon(icon)} 
          alt={weatherMain}
          className="w-16 h-16"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-white mb-2">
            {formatTemp(temp)}°C
          </div>
          <p className="text-blue-100">
            Feels like {formatTemp(feels_like)}°C
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <SafeIcon icon={FiDroplet} className="w-4 h-4 text-blue-200" />
              <span className="text-blue-200 text-sm">Humidity</span>
            </div>
            <div className="text-white font-semibold">{humidity}%</div>
          </div>

          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <SafeIcon icon={FiWind} className="w-4 h-4 text-blue-200" />
              <span className="text-blue-200 text-sm">Wind</span>
            </div>
            <div className="text-white font-semibold">{speed} m/s</div>
          </div>

          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <SafeIcon icon={FiBarChart3} className="w-4 h-4 text-blue-200" />
              <span className="text-blue-200 text-sm">Pressure</span>
            </div>
            <div className="text-white font-semibold">{pressure} hPa</div>
          </div>

          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <SafeIcon icon={FiEye} className="w-4 h-4 text-blue-200" />
              <span className="text-blue-200 text-sm">Visibility</span>
            </div>
            <div className="text-white font-semibold">
              {visibility ? `${(visibility / 1000).toFixed(1)} km` : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;