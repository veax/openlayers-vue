<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Map } from "ol"
import { MousePosition, defaults as defaultControls } from "ol/control"
import MapBar from "./components/MapBar/MapBar.vue"
import { useMousePosition } from "./composables/useMousePosition"
import { getMapLayers, initView } from "./application/defaults"
import { register } from "ol/proj/proj4"
import proj4 from "proj4"
import {
  LAMBERT_PROJECTION,
  LAMBERT_PROJECTION_DEFINITION,
} from "./application/consts"

// state
let map = ref<Map | null>(null)

// ref
const mapBarRef = ref<InstanceType<typeof MapBar> | null>(null)

// composables
const { mouse, setTargetRef: setMousePositionTargetRef } = useMousePosition()

// hooks
onMounted(() => {
  proj4.defs(LAMBERT_PROJECTION, LAMBERT_PROJECTION_DEFINITION)
  register(proj4)
  setMousePositionTargetRef(mapBarRef.value?.mousePositionRef)

  map.value = new Map({
    target: "map",
    layers: getMapLayers(),
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
