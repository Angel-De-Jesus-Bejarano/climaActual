<template>
    <h1> MAPA </h1>
    <div class="map">
      <l-map :zoom="mapOptions.zoom" :center="mapOptions.center">
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-tile-layer :url="`https://{s}.tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${'19b2ae248e030a2add68dcac1c3f7995'}`"></l-tile-layer>
        <l-marker :lat-lng="markerOptions"></l-marker>
      </l-map>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted, defineProps, watch } from 'vue';
  import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
  import 'leaflet/dist/leaflet.css';

 

  export default {
    
    props: {
    coordinates: {
      type: Array as () => number[],
      required: true,
    },
  },

 

    components: {
      LMap,
      LTileLayer,
      LMarker,
    },
    setup(props : any) {

       '19b2ae248e030a2add68dcac1c3f7995'
      const mapOptions = ref({
        zoom: 12,
        center: props.coordinates, // Coordenadas iniciales del mapa
      });
  
      const markerOptions = ref({
        lat: props.coordinates[0],
        lng: props.coordinates[1],
        message: '¡Hola! Este es un marcador en el mapa.',
      });
  
      // Ejecuta este código después de que el componente se haya montado en el DOM
      onMounted(() => {
        // Asegúrate de que el mapa se ajuste correctamente al tamaño del contenedor
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 100);
      });

        // Observa los cambios en las coordenadas y actualiza el mapa
    watch(
      () => props.coordinates,
      (newCoordinates) => {
        mapOptions.value.center = newCoordinates;
        markerOptions.value.lat = newCoordinates[0];
        markerOptions.value.lng = newCoordinates[1];
      }
    );
  
      return {
        mapOptions,
        markerOptions,
      };
    },
  };
  </script>
  
<style scoped>
  h1{
    display: none;
  }
  .map{
    width: 800px;
    height: 600px;
  }
  @media (max-width: 400px) {
    h1{
      display: block;
      margin: 0 ;
      padding: 5px;
      color: rgb(0, 0, 0);
      background-color: rgb(255, 255, 255);
    }
    .map{
      width: 100%;
      height: 350px;
      margin: 0 auto;
    }
  }
</style>