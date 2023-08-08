<script setup lang="ts">
import { ref, onMounted } from "vue"
import OSM from "ol/source/OSM"
import TileLayer from "ol/layer/Tile"
import { Map, View } from "ol"
import { fromLonLat } from "ol/proj"
import { defaults as defaultControls } from "ol/control"
import MapBar from "./components/MapBar.vue"
import { RESOLUTIONS_GRID } from "./consts"

// state
let map = ref<Map | null>(null)

onMounted(() => {
  console.log("on mounted call")
  map.value = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([39.712585, 54.609543]),
      zoom: 2,
      resolutions: RESOLUTIONS_GRID,
      constrainResolution: true,
    }),
    controls: defaultControls({
      zoom: false,
      attribution: false,
      rotate: false,
    }),
  })
})
</script>

<template>
  <div id="map"></div>
  <MapBar v-if="map" :map="(map as Map)" />
</template>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
