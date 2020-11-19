'use strict';
mapboxgl.accessToken = 'pk.eyJ1IjoidGFuZWxpMSIsImEiOiJja2hldnJuN2kwYWhvMnNtdmk1M3pnamdrIn0.6uONt0hIzNl31eGN0_cOfg';
const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [24, 60], // starting position [lng, lat]
  zoom: 13, // starting zoom
});

const addMarker = (coords) => {
  map.setCenter(coords);
  const marker = new mapboxgl.Marker().setLngLat(coords).addTo(map);
};