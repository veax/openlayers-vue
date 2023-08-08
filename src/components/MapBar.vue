<script setup lang="ts">
import { MagnifyingGlassPlusIcon } from "@heroicons/vue/20/solid"
import { MagnifyingGlassMinusIcon } from "@heroicons/vue/20/solid"
import { Map } from "ol"
import { computed } from "vue"
import { DEFAULT_DPI, RESOLUTIONS_GRID } from "../consts"

// props
const props = defineProps<{
  map: Map
}>()

const zoomIn = () => {
  props.map.getView().adjustZoom(1)
  console.log("props.map.getView().getZoom() : ", props.map.getView().getZoom())
}

const zoomOut = () => {
  props.map.getView().adjustZoom(-1)
  console.log("props.map.getView().getZoom() : ", props.map.getView().getZoom())
}

// computed
const selectedResolution = computed({
  get() {
    return props.map.getView().getResolution()
  },
  set(newResolution) {
    props.map.getView().setResolution(newResolution)
  },
})

// apply formula from intro to GIS Part 2 but in human-readable (only part R in 1 / R)
const resolutionToScale = (resolution: number) => {
  // formula scale = 0.0254/(resolution * dpi)
  // 1/scale = (resolution * dpi) / 0.0254
  const invertedScale = (resolution * DEFAULT_DPI) / 0.0254
  // round
  return Math.round(invertedScale / 10) * 10
}
</script>

<template>
  <div id="map-bar">
    <!-- zoom buttons -->
    <div class="button zoom-icon" @click="zoomIn">
      <MagnifyingGlassPlusIcon />
    </div>
    <div class="button zoom-icon" @click="zoomOut">
      <MagnifyingGlassMinusIcon />
    </div>
    <!-- scale select -->
    <select v-model="selectedResolution" class="scale">
      <option
        v-for="resolution in RESOLUTIONS_GRID"
        :key="resolution"
        :value="resolution"
      >
        1/{{ resolutionToScale(resolution) }}
      </option>
    </select>
  </div>
</template>

<style scoped>
#map-bar {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  gap: 20px;
  padding: 50px 100px;
  background-color: rgb(255, 255, 255, 0.6);
  border-radius: 5px;
}

.zoom-icon {
  width: 20px;
  height: 20px;
}

.button,
.scale {
  border-radius: 5px;
  background-color: white;
  padding: 10px 40px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

.button:hover {
  background-color: #2ee59d;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: white;
}

.scale {
  border: none;
  border-right: 16px solid transparent;
}
</style>
