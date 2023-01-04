<template>
  <div style="height: 70vh; width: 80vw">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="center"
      @click="addMarker"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-marker
        v-for="(marker, index) in markers"
        :key="index"
        :lat-lng="marker"
        @click="removeMarker(index)"
      ></l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 6,
      iconWidth: 25,
      iconHeight: 40,
      markers: [],
      //   center: [48.383022, 31.1828699],
      center: leaflet.latLng([48.383022, 31.1828699]),
    };
  },
  computed: {},
  methods: {
    removeMarker(index) {
      console.log(index);
      this.markers.splice(index, 1);
      console.log(this.markers);
    },
    addMarker(event) {
      console.log(event.latlng);
      this.markers.push(event.latlng);
      console.log(this.markers);
    },
  },
};
</script>
