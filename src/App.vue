<script setup lang="ts">
import { ref, onMounted } from "vue"
import OSM from "ol/source/OSM"
import TileLayer from "ol/layer/Tile"
import { Map } from "ol"
import { MousePosition, defaults as defaultControls } from "ol/control"
import MapBar from "./components/MapBar/MapBar.vue"
import { useMousePosition } from "./composables/useMousePosition"
import { initView } from "./application/defaults"

// state
let map = ref<Map | null>(null)

// ref
const mapBarRef = ref<InstanceType<typeof MapBar> | null>(null)

// composables
const { mouse, setTargetRef: setMousePositionTargetRef } = useMousePosition()

// hooks
onMounted(() => {
  setMousePositionTargetRef(mapBarRef.value?.mousePositionRef)
  map.value = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: initView(),
    controls: defaultControls({
      zoom: false,
      attribution: false,
      rotate: false,
    }).extend([mouse as MousePosition]),
  })
})
</script>

<template>
  <div id="map"></div>
  <MapBar :map="(map as Map | null)" ref="mapBarRef" />
</template>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.mouse-position {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
