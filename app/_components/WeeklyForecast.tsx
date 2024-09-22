'use client';
import React from 'react';
import styled from 'styled-components';
import { WeeklyForecastProps, ForecastData } from '../../types/type';
import { weatherIconMap } from '../../icons/WeatherIcons';
import { IconType } from 'react-icons';

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({
  forecastData,
  isCelsius,
}) => {
  const dailyData: ForecastData[] = forecastData
    ? forecastData.list.filter((reading: ForecastData) =>
        reading.dt_txt.includes('12:00:00')
      )
    : [];

  return (
    <Section>
      <StyledTitle>5-Day Weather Forecast</StyledTitle>
      <ForecastContainer>
        {dailyData.map((day: ForecastData, index: number) => {
          const date = new Date(day.dt * 1000);
          const tempC = (day.main.temp - 273.15).toFixed(2);
          const tempF = ((day.main.temp - 273.15) * 1.8 + 32).toFixed(2);

          const condition = day.weather[0].main;
          const description = day.weather[0].description;

          const IconComponent: IconType =
            weatherIconMap[condition] || weatherIconMap['Clear'];

          const iconColor =
            condition === 'Clear'
              ? '#FFD700'
              : condition === 'Rain' || condition === 'Drizzle'
              ? '#00BFFF'
              : condition === 'Clouds'
              ? '#C0C0C0'
              : '#FFFFFF';

          return (
            <ForecastItem key={index}>
              <DateContainer>
                <StyledDate>
                  {date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </StyledDate>
                <IconComponent size={40} color={iconColor} />
              </DateContainer>
              <Temperature>
                {isCelsius ? `${tempC} °C` : `${tempF} °F`}
              </Temperature>
              <Condition>
                {description.charAt(0).toUpperCase() + description.slice(1)}
              </Condition>
            </ForecastItem>
          );
        })}
      </ForecastContainer>
    </Section>
  );
};

export default WeeklyForecast;

const Section = styled.div`
  background-color: #132e54;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  width: 100%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

const StyledTitle = styled.h3`
  margin: 1.4rem;
  text-align: center;
  color: #ffffff;
`;

const ForecastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const ForecastItem = styled.div`
  background-color: #1a3b6d;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  flex: 1 1 calc(20% - 20px);
  max-width: 150px;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 20px);
    max-width: 45%;
  }
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 10px;
`;

const StyledDate = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const Temperature = styled.p`
  font-size: 1.2rem;
  margin: 5px 0;
`;

const Condition = styled.p`
  font-size: 1rem;
  margin: 5px 0;
`;
