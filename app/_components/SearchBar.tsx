'use client';
import React from 'react';
import styled from 'styled-components';
import { SearchBarProps } from '../../types/type';
import { IconXboxX } from '@tabler/icons-react';

const SearchBar: React.FC<SearchBarProps> = ({
  city,
  setCity,
  displayWeather,
  recentCities,
  handleCityClick,
  clearHistory,
}) => {
  return (
    <SearchBarContainer>
      <Form onSubmit={displayWeather}>
        <Input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='City Name'
          required
        />
        <Button type='submit'>Search</Button>
      </Form>

      {recentCities.length > 0 && (
        <>
          <HistoryContainer>
            {recentCities.map((recentCity, index) => (
              <HistoryButton
                key={index}
                onClick={() => handleCityClick(recentCity)}
              >
                {recentCity}
              </HistoryButton>
            ))}
          </HistoryContainer>
          <ClearHistoryButton onClick={clearHistory}>
            Clean
            <IconXboxX
              stroke={1.7}
              height={12}
              width={12}
              style={{ marginLeft: '6px' }}
            />
          </ClearHistoryButton>
        </>
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 20px;
  border: 1px solid #007bff;
  background-color: #1e2a5e;
  color: #fff;
  width: 300px;
  max-width: 100%;
  box-shadow: 0 2px 5px rgba(107, 103, 103, 0.2);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Button = styled.button<{ variant?: string }>`
  padding: 12px 25px;
  background-color: #ffd700;
  color: rgba(0, 0, 0, 0.9);
  border: none;
  font-size: 10px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #ff9874;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HistoryContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    gap: 2px;
  }
`;

const HistoryButton = styled(Button)`
  background-color: #7695ff;
  margin: 1rem 0px;

  &:hover {
    background-color: #7695ff;
  }

  @media (max-width: 768px) {
    margin: 0.4rem 0px;
  }
`;

const ClearHistoryButton = styled(Button)`
  background-color: #6a9ab0;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  display: flex;

  &:hover {
    background-color: #4f7a94;
  }
`;
