<script setup lang="ts">
import { Map } from "ol"
import { computed } from "vue"
import { initView } from "../../application/defaults"
import { PROJECTIONS } from "../../application/consts"

// props
const props = defineProps<{
  map: Map
}>()

const selectedProjection = computed({
  get() {
    return props.map.getView().getProjection().getCode()
  },
  set(newProjection) {
    const view = initView(newProjection)
    props.map?.setView(view)
  },
})
</script>
<template>
  <select v-model="selectedProjection" class="select">
    <option v-for="proj in PROJECTIONS" :key="proj" :value="proj">
      {{ proj }}
    </option>
  </select>
</template>
