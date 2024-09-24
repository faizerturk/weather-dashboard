'use client';
import React from 'react';
import styled from 'styled-components';
import { CurrentWeatherProps } from '../../types/type';
import { IconCalendar } from '@tabler/icons-react';
import { weatherIconMap } from '../../icons/WeatherIcons';
import { IconType } from 'react-icons';
import { formatTemperature } from '@/utils/formatTemperature';

const CurrentWeather: React.FC<
  CurrentWeatherProps & { isCelsius: boolean; toggleUnit: () => void }
> = ({ weatherData, isCelsius, toggleUnit }) => {
  if (!weatherData || !weatherData.main) return null;

  const tempInCelsius = formatTemperature(weatherData.main.temp, true);
  const tempInFahrenheit = formatTemperature(weatherData.main.temp, false);

  const date = new Date(weatherData.dt * 1000);
  const formattedDate = date.toLocaleDateString('en-EN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const condition = weatherData.weather[0].main;
  const description = weatherData.weather[0].description;
  const IconComponent: IconType =
    weatherIconMap[condition] || weatherIconMap['Clear'];

  return (
    <Section>
      <h2>
        {weatherData.name}, {weatherData.sys.country}
      </h2>
      <IconContainer>
        <IconCalendar size={20} />
        <span>{formattedDate}</span>
      </IconContainer>
      <IconContainer>
        <IconComponent size={80} color='#FFD700' />
      </IconContainer>
      <Temperature>
        {isCelsius ? `${tempInCelsius} °C` : `${tempInFahrenheit} °F`}
      </Temperature>
      <Condition>
        {description.charAt(0).toUpperCase() + description.slice(1)}
      </Condition>
      <ToggleButton onClick={toggleUnit}>
        {isCelsius ? 'Fahrenheit' : 'Celsius'}
      </ToggleButton>
    </Section>
  );
};

export default CurrentWeather;

const Section = styled.div`
  background-color: #132e54;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  grid-column: span 2;
  width: 100%;
  max-width: 300px;
  margin: 10px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
`;

const Temperature = styled.p`
  font-size: 1.5rem;
  margin: 10px 0;
`;

const Condition = styled.p`
  font-size: 1.2rem;
  margin: 5px 0;
`;

const ToggleButton = styled.button`
  padding: 8px 16px;
  background-color: #3f70a5;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #4b94e2;
  }
`;
