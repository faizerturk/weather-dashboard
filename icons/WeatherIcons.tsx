import { IconType } from 'react-icons';
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from 'react-icons/wi';

interface WeatherIconMap {
  [key: string]: IconType;
}

export const weatherIconMap: WeatherIconMap = {
  Clear: WiDaySunny,
  Clouds: WiCloud,
  Rain: WiRain,
  Drizzle: WiRain,
  Thunderstorm: WiThunderstorm,
  Snow: WiSnow,
  Mist: WiFog,
  Smoke: WiFog,
  Haze: WiFog,
  Dust: WiFog,
  Fog: WiFog,
  Sand: WiFog,
  Ash: WiFog,
  Squall: WiThunderstorm,
  Tornado: WiThunderstorm,
};
