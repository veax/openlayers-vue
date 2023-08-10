<script setup lang="ts">
import { Map } from "ol"
import { computed, onMounted, ref } from "vue"
import { getResolutions } from "../../application/defaults"
import { DEFAULT_DPI } from "../../application/consts"

// props
const props = defineProps<{
  map: Map
}>()

// data
let resolution = ref(0)

// hooks
onMounted(() => {
  const mapResolution = props.map.getView().getResolution()!
  resolution.value = mapResolution

  // view object reference is changed if projection change -> callback should be reinitialized on view change
  props.map.getView().on("change:resolution", () => {
    updateResolution()
  })
  props.map.on("change:view", () => {
    updateResolution()
    props.map.getView().on("change:resolution", () => {
      updateResolution()
    })
  })
})

// functions
const updateResolution = () => {
  resolution.value = props.map.getView().getResolution()!
}

// computed
const selectedResolution = computed({
  get() {
    return resolution.value
  },
  set(newResolution) {
    resolution.value = newResolution
    props.map.getView().setResolution(newResolution)
  },
})

// apply formula from intro to GIS Part 2 but in human-readable (only part R in 1 / R)
const resolutionToScale = (resolution: number) => {
  const MPU = props.map?.getView().getProjection().getMetersPerUnit() || 1
  // metric formula scale = (0.0254/(resolution * dpi)) * MPU
  // 1/scale = ((resolution * dpi) / 0.0254) * MPU
  const invertedScale = ((resolution * DEFAULT_DPI) / 0.0254) * MPU
  // round
  return Math.round(invertedScale / 10) * 10
}
</script>
<template>
  <select v-model="selectedResolution" class="select">
    <option
      v-for="res in getResolutions(
        props.map?.getView().getProjection().getCode()
      )"
      :key="res"
      :value="res"
    >
      1/{{ resolutionToScale(res) }}
    </option>
  </select>
</template>
