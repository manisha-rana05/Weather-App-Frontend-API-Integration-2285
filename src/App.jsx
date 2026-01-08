import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import RecentSearches from './components/RecentSearches';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('weatherRecentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const fetchWeather = async (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    
    if (!apiKey) {
      setError('Weather API key not configured. Please add your OpenWeatherMap API key to the .env file.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(response.status === 404 ? 'City not found' : 'Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);

      // Add to recent searches
      const newSearch = {
        id: Date.now(),
        city: data.name,
        country: data.sys.country,
        timestamp: new Date().toISOString()
      };

      const updatedSearches = [newSearch, ...recentSearches.filter(s => s.city !== data.name)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('weatherRecentSearches', JSON.stringify(updatedSearches));

    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRecentSearchClick = (city) => {
    fetchWeather(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Weather Tracker
          </h1>
          <p className="text-blue-100 text-lg">
            Get current weather information for any city worldwide
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <SearchBar onSearch={fetchWeather} loading={loading} />
          
          {error && <ErrorMessage message={error} />}
          
          {loading && <LoadingSpinner />}
          
          {weatherData && !loading && (
            <WeatherCard weatherData={weatherData} />
          )}

          {recentSearches.length > 0 && (
            <RecentSearches 
              searches={recentSearches} 
              onSearchClick={handleRecentSearchClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;