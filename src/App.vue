<script setup lang="ts">
import { onMounted } from "vue"
import OSM from "ol/source/OSM"
import TileLayer from "ol/layer/Tile"
import { Map, View } from "ol"
import { fromLonLat } from "ol/proj"

onMounted(() => {
  console.log("on mounted call")
  new Map({
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
  })
})
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>
