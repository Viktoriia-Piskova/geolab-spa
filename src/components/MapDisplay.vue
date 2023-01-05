<template>
  <div style="height: 70vh; width: 80vw">
    <l-map
      :zoom="zoom"
      :maxZoom="maxZoom"
      @update:zoom="zoomUpdated"
      :center="center"
      @click="addMarker($event)"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-marker
        v-for="(marker, index) in markers"
        :key="index"
        :lat-lng="marker"
        @mouseover="showMarkerTitle(index)"
        @click="removeMarker(index)"
      >
        <l-tooltip>{{ markerTitle }}</l-tooltip>
      </l-marker>
    </l-map>
  </div>
  <div v-if="popupIsOpened" class="popup">
    <form @submit.prevent="addMarkerTitle()">
      <h2>Add title for this marker:</h2>
      <input type="text" minlength="3" v-model="markerInfo.title" />
      <p>Lat: {{ markerInfo.lat }}</p>
      <p>Lng: {{ markerInfo.lng }}</p>
      <button type="submit">ok</button>
    </form>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  data() {
    return {
      zoom: 6,
      maxZoom: 20,
      iconWidth: 25,
      iconHeight: 40,
      markers: [],
      center: leaflet.latLng([48.383022, 31.1828699]),
      popupIsOpened: false,
      markerInfo: {
        title: "New Marker",
        lat: "",
        lng: "",
      },
      markerTitle: "",
      markerCounter: 1,
    };
  },
  computed: {},
  methods: {
    addMarker(event) {
      if (event.latlng) {
        this.markers.push(event.latlng);
        this.popupIsOpened = true;
        const markerToAddTitle = this.markers[this.markers.length - 1];
        this.markerInfo.lat = markerToAddTitle.lat;
        this.markerInfo.lng = markerToAddTitle.lng;
      }
    },
    removeMarker(index) {
      this.markers.splice(index, 1);
      const markersJson = JSON.stringify(this.markers);
      localStorage.setItem("markers", markersJson);
    },
    addMarkerTitle() {
      const markerToAddTitle = this.markers[this.markers.length - 1];
      markerToAddTitle.title = this.markerInfo.title;
      this.popupIsOpened = false;
      this.markerCounter += 1;
      this.markerInfo.title = "New Marker " + this.markerCounter;
      const markersJson = JSON.stringify(this.markers);
      localStorage.setItem("markers", markersJson);
    },
    showMarkerTitle(index) {
      this.markerTitle = this.markers[index].title;
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
  },
  mounted() {
    this.markers = JSON.parse(localStorage.getItem("markers")) || [];
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 9999;
  height: 100vh;
  width: 100vw;
  background-color: rgba(88, 93, 90, 0.79);
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    background: white;
    padding: 2rem;
    input {
      height: 27px;
      padding: 1rem;
      border: 1px solid #ada5a5;
      border-radius: 5px;
      font-size: 1rem;
    }
    button {
      height: 27px;
      padding: 1.5rem;
      background-color: #42b983;
      color: #fff;
      font-size: 1.5rem;
      border-radius: 5px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
      &:hover {
        background-color: #21583f;
      }
    }
  }
}
</style>
