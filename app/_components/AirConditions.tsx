'use client';
import React from 'react';
import styled from 'styled-components';
import { AirConditionsProps } from '../../types/type';
import { IconWind, IconDroplet, IconTemperature } from '@tabler/icons-react';

const Section = styled.div`
  background-color: #132e54;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 400px;
  margin: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    max-width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const Condition = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

const AirConditions: React.FC<AirConditionsProps> = ({
  weatherData,
  isCelsius,
}) => {
  if (!weatherData || !weatherData.main) {
    return null;
  }

  const realFeel = (weatherData.main.feels_like - 273.15).toFixed(2);
  const realFeelFahrenheit = (
    (weatherData.main.feels_like - 273.15) * 1.8 +
    32
  ).toFixed(2);

  return (
    <Section>
      <Condition>
        <IconWind size={24} />
        <div>
          <h4>Wind</h4>
          <p>{weatherData.wind.speed} m/s</p>
        </div>
      </Condition>

      <Condition>
        <IconDroplet size={24} />
        <div>
          <h4>Humidity</h4>
          <p>{weatherData.main.humidity} %</p>
        </div>
      </Condition>
      <Condition>
        <IconTemperature size={24} />
        <div>
          <h4>Real Feel</h4>
          <p>{isCelsius ? `${realFeel} °C` : `${realFeelFahrenheit} °F`}</p>
        </div>
      </Condition>
    </Section>
  );
};

export default AirConditions;
