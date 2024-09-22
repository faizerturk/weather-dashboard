export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface WindData {
  speed: number;
  deg: number;
  gust?: number;
}

export interface CloudsData {
  all: number;
}

export interface SysData {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  clouds: CloudsData;
  dt: number;
  sys: SysData;
  timezone: number;
  id: number;
  name: string;
  cod: string;
}

export interface ForecastCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ForecastMainData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level?: number;
  grnd_level?: number;
  humidity: number;
  temp_kf?: number;
}

export interface ForecastWindData {
  speed: number;
  deg: number;
  gust?: number;
}

export interface ForecastData {
  dt: number;
  main: ForecastMainData;
  weather: ForecastCondition[];
  clouds: CloudsData;
  wind: ForecastWindData;
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastData[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface AirConditionsProps {
  weatherData: WeatherData | null;
  isCelsius: boolean;
}

export interface CurrentWeatherProps {
  weatherData: WeatherData | null;
  isCelsius: boolean;
  toggleUnit: () => void;
}

export interface SearchBarProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  displayWeather: (event: React.FormEvent) => Promise<void>;
  recentCities: string[];
  handleCityClick: (cityName: string) => void;
  clearHistory: () => void;
}

export interface WeeklyForecastProps {
  forecastData: ForecastResponse | null;
  isCelsius: boolean;
}
