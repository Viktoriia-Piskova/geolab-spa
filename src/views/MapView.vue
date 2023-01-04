<template>
  <div class="wrapper">
    <h1>This is interactive map</h1>
    <div class="map-wrapper">
      <MapDisplay />
    </div>
  </div>
</template>

<script>
import MapDisplay from "@/components/MapDisplay.vue";

export default {
  components: {
    MapDisplay,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: rgb(255, 255, 255);

  .map-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
