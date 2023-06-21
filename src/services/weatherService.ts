import axios from 'axios';

const API_KEY = '19b2ae248e030a2add68dcac1c3f7995';
const URL_API = (latitude: number, longitude: number) => {
    return `https://api.openweathermap.org/geo/2.5/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}&lang=${'es'}`
  }

export async function fetchWeatherByCoordinates(latitude: number, longitude: number) {
    try {
      const response = await axios.get(URL_API(latitude, longitude));
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch weather data');
    }
  }
  
  export async function fetchWeatherByCity(city: string) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=${'es'}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch weather data');
    }
  }

  
  