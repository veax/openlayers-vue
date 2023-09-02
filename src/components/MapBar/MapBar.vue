<script setup lang="ts">
import { Map } from "ol"
import { ref } from "vue"
import ZoomControls from "./ZoomControls.vue"
import ScaleSelect from "./ScaleSelect.vue"
import ProjectionSelect from "./ProjectionSelect.vue"

// props
const props = defineProps<{
  map: Map | null
}>()

// ref
const mousePositionRef = ref<HTMLElement | undefined>(undefined)

// expose component data for external ref
defineExpose({
  mousePositionRef,
})
</script>

<template>
  <div id="map-bar">
    <div id="map-controls" v-if="props.map">
      <!-- zoom buttons -->
      <ZoomControls :map="props.map" />
      <!-- scale select -->
      <ScaleSelect :map="props.map" />
    </div>
    <!-- mouse position -->
    <div class="mouse-position" ref="mousePositionRef"></div>
    <!-- select projection -->
    <ProjectionSelect v-if="props.map" :map="props.map" />
  </div>
</template>

<style>
#map-bar {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px 50px;
  background-color: rgb(255, 255, 255, 0.6);
  border-radius: 5px;
}

#map-controls {
  display: flex;
  gap: 20px;
}

.select {
  border: none;
  border-right: 16px solid transparent;
}

.mouse-position {
  width: 250px;
  font-size: 14px;
}
</style>
