<template>
  <div class="box-clima" :style="background(description)">
    <div class="card-clima">
      <h1>CLIMA EN TIEMPO REAL</h1>
      <div class="buscador">
        <input v-model="searchInput" placeholder="Ingrese la ciudad o país" />
        <button @click="searchWeather">
          <img src="@/assets/images/buscar.png" alt="">
        </button>
      </div>
      <div class="estado-clima" style="background-color: white;">
        <p v-if="loading">Obteniendo ubicación...</p>
        <p v-else-if="error">Error al obtener ubicación.</p>
        <div v-else>
          <p style="text-transform: uppercase;">{{ nameLocation }}</p>
          <p>{{ location }}</p>
          <img :src="weatherImage(description)" alt="">
          <p>{{ temperature }}</p>
          <p>{{ description }}</p>
          <div v-if="nameLocation" class="datos-extra">
            <div class="box-extra">
              <img src="@/assets/images/humedad.png" alt="" style="width: 50px; height: 50px; margin-right: 5px">
              <div class="text-extra">
                <p>{{ humidity }}</p>
                <p>humedad</p>
              </div>
            </div>
            <div class="box-extra">
              <img src="@/assets/images/viento.png" alt="" style="width: 50px; height: 50px; margin-right: 5px">
              <div class="text-extra">
                <p>{{ windSpeed }}</p>
                <p>viento</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MyMap :coordinates="[latitudeMap, longitudeMap]" />
  </div>
</template>

<script lang="ts" setup>
//dependencias necesarias
import { ref, onMounted } from 'vue';

//importar funciones y componentes
import { fetchWeatherByCoordinates, fetchWeatherByCity } from '@/services/weatherService';
import { convertKelvinToCelsius } from '@/utils/temperatureUtils';
import { convertMetersPerSecondToKilometersPerHour } from '@/utils/speedUtils';
import { Position, WeatherData} from '@/interface/Position';
import MyMap from './MyMap.vue';

//clima
const searchInput = ref('');
const location = ref('');
const temperature = ref('');
const humidity = ref('');
const windSpeed = ref('');
const description = ref('');
const loading = ref(false);
const error = ref(false);
const nameLocation = ref('');


//mapa
const latitudeMap = ref(0)
const longitudeMap = ref(0)


onMounted(async () => {
  await getCurrentWeather();
});

async function getCurrentPosition(): Promise<Position> {
  return new Promise<Position>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getCurrentWeather() {
  try {
    loading.value = true;
    error.value = false;

    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const weatherData = await fetchWeatherByCoordinates(latitude, longitude);
    updateWeatherData(weatherData);
  } catch (error) {
    console.error(error);
    loading.value = false;
    error.value = true;
  }
}


async function searchWeather() {
  try {
    loading.value = true;
    error.value = false;

    const weatherData = await fetchWeatherByCity(searchInput.value);
    updateWeatherData(weatherData);
    NameCity(searchInput.value)
  } catch (error) {
    console.error(error);
    loading.value = false;
    error.value = true;
  }
}

function NameCity(location: string) {
  return nameLocation.value = location
}

function updateWeatherData(data: WeatherData) {
  const temperatureInKelvin = data.main.temp;
  const temperatureInCelsius = convertKelvinToCelsius(temperatureInKelvin);
  temperature.value = `${temperatureInCelsius}°C`;
  description.value = data.weather[0].description;
  humidity.value = `${data.main.humidity} %`;
  windSpeed.value = convertMetersPerSecondToKilometersPerHour(data.wind.speed);

  if (data.coord) {
    const { lat, lon } = data.coord;
    location.value = `Latitud ${lat}°, Logintud ${lon}°`;
    latitudeMap.value = lat;
    longitudeMap.value = lon;
  } else {
    const { lat, lon } = data;
    location.value = `${lat}°, ${lon}°`;
  }

  loading.value = false;
}

//background clima
const background = (weather: string) => {
  const weatherCardColor: any = {
    'cielo claro': '#FFC107',
    'lluvia moderada': '#00B4D9',
    'llovizna ligera': '#00B4D9',
    'lluvia ligera': '#018CE3',
    '': '#018CE3',
    'nubes': '#6D6779',
    'muy nuboso': '#6D6779',
    'nubes dispersas': '#6D6779',
    'algo de nubes': '#6D6779',
    'tormenta': '#4A277D'
  };
  return `background-color: ${weatherCardColor[weather] || '#000000'}`;
};

//image clima
const weatherImage = (image: string) => {
  const imageMap: any = {
    'cielo claro': require('@/assets/images/sol.png'),
    'nubes': require('@/assets/images/nubes.png'),
    'nubes dispersas': require('@/assets/images/nubes.png'),
    'algo de nubes': require('@/assets/images/nubes.png'),
    'muy nuboso': require('@/assets/images/nublado_max.png'),
    'lluvia moderada': require('@/assets/images/lluvia-moderada.png'), 'lluvia ligera': require('@/assets/images/lluvia-moderada.png'),
    'tormenta': require('@/assets/images/tormenta.png')
  };
  return imageMap[image];
};
</script>

<style>
  @import '@/assets/styles/MyWeatherStyle.css'
</style>
