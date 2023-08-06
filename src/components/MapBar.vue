<script setup lang="ts">
import { MagnifyingGlassPlusIcon } from "@heroicons/vue/20/solid"
import { MagnifyingGlassMinusIcon } from "@heroicons/vue/20/solid"
import { Map } from "ol"

// props
const props = defineProps<{
  map: Map
}>()

const zoomIn = () => {
  props.map.getView().adjustZoom(1)
}

const zoomOut = () => {
  props.map.getView().adjustZoom(-1)
}
</script>

<template>
  <div id="map-bar">
    <div class="button zoom-icon" @click="zoomIn">
      <MagnifyingGlassPlusIcon />
    </div>
    <div class="button zoom-icon" @click="zoomOut">
      <MagnifyingGlassMinusIcon />
    </div>
  </div>
</template>

<style scoped>
#map-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  gap: 20px;
  padding: 50px 100px;
  background-color: rgb(255, 255, 255, 0.5);
  border-radius: 5px;
}

.zoom-icon {
  width: 20px;
  height: 20px;
}

.button {
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
</style>
