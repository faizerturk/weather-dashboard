'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from './_components/SearchBar';
import CurrentWeather from './_components/CurrentWeather';
import AirConditions from './_components/AirConditions';
import WeeklyForecast from './_components/WeeklyForecast';
import { toast } from 'react-toastify';
import { WeatherData, ForecastResponse } from '../types/type';

const APIKey = process.env.NEXT_PUBLIC_API_KEY!;

const WeatherDashboard: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(
    null
  );
  const [recentCities, setRecentCities] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem('cityname') || '[]');
    setRecentCities(savedCities);
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [error]);

  const fetchWeather = async (cityName: string) => {
    setError('');
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&lang=en`
      );
      const weatherData: WeatherData = await weatherResponse.json();

      if (weatherData.cod === '404') {
        setError('City not found.');
        setWeatherData(null);
        setForecastData(null);
        return;
      }

      setWeatherData(weatherData);
      updateCityHistory(cityName);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&lang=en`
      );
      const forecastData: ForecastResponse = await forecastResponse.json();

      if (forecastData.cod !== '200') {
        setError('Unable to fetch weather forecast.');
        setForecastData(null);
        return;
      }

      setForecastData(forecastData);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching weather data.');
      setWeatherData(null);
      setForecastData(null);
    }
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (city.trim() !== '') {
      await fetchWeather(city.trim());
      setCity('');
    }
  };

  const handleCityClick = (cityName: string) => {
    fetchWeather(cityName);
  };

  const updateCityHistory = (cityName: string) => {
    const updatedCities = [
      cityName,
      ...recentCities.filter((c) => c.toLowerCase() !== cityName.toLowerCase()),
    ];
    if (updatedCities.length > 5) updatedCities.pop();
    setRecentCities(updatedCities);
    localStorage.setItem('cityname', JSON.stringify(updatedCities));
  };

  const clearHistory = () => {
    setRecentCities([]);
    localStorage.removeItem('cityname');
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <DashboardContainer>
      <SearchBar
        city={city}
        setCity={setCity}
        displayWeather={handleSearch}
        recentCities={recentCities}
        handleCityClick={handleCityClick}
        clearHistory={clearHistory}
      />

      {weatherData && (
        <>
          <WeatherInfoContainer>
            <CurrentWeather
              weatherData={weatherData}
              isCelsius={isCelsius}
              toggleUnit={toggleUnit}
            />
            <AirConditions weatherData={weatherData} isCelsius={isCelsius} />
          </WeatherInfoContainer>
          <WeeklyForecast forecastData={forecastData} isCelsius={isCelsius} />
        </>
      )}
    </DashboardContainer>
  );
};

export default WeatherDashboard;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #001f3f;
  color: white;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const WeatherInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (min-width: 769px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;
