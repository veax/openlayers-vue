<script setup lang="ts">
import { ref, onMounted } from "vue"
import OSM from "ol/source/OSM"
import TileLayer from "ol/layer/Tile"
import { Map, View } from "ol"
import { fromLonLat } from "ol/proj"
import { defaults as defaultControls } from "ol/control"
import MapBar from "./components/MapBar.vue"

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
      center: fromLonLat([0, 0]),
      zoom: 2,
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
