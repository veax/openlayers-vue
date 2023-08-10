<script setup lang="ts">
import { Map } from "ol"
import { MagnifyingGlassPlusIcon } from "@heroicons/vue/20/solid"
import { MagnifyingGlassMinusIcon } from "@heroicons/vue/20/solid"

// props
const props = defineProps<{
  map: Map
}>()

const zoomIn = () => {
  const currentZoom = props.map.getView().getZoom() || 0
  props.map.getView().setZoom(currentZoom + 1)
}

const zoomOut = () => {
  const currentZoom = props.map.getView().getZoom() || 0
  props.map?.getView().setZoom(currentZoom - 1)
}
</script>
<template>
  <div class="button zoom-icon" @click="zoomIn">
    <MagnifyingGlassPlusIcon />
  </div>
  <div class="button zoom-icon" @click="zoomOut">
    <MagnifyingGlassMinusIcon />
  </div>
</template>

<style scoped>
.zoom-icon {
  width: 20px;
  height: 20px;
}
</style>
