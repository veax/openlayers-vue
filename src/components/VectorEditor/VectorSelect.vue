<template>
  <div class="button icon" @click="toggleFeature">
    <SparklesIcon />
  </div>
  <!-- feature info  -->
  <div v-if="selectedFeature" class="feature-info">
    <p class="text">feature name : {{ getFeatureName }}</p>
    <p class="text">property1 : {{ getFeatureProperty }}</p>
  </div>
</template>

<script setup lang="ts">
import { SparklesIcon } from "@heroicons/vue/20/solid"
import { Collection, Feature, Map } from "ol"
import { computed, onMounted, ref } from "vue"
import { Select } from "ol/interaction"
import { findLayerById, getFeatureById } from "../../application/ol"
import {
  LAYER_ID,
  SELECT_FEATURE_ID,
  VECTOR_LAYER,
  SECOND_VECTOR_LAYER,
} from "../../application/consts"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"

// props
const props = defineProps<{
  map: Map
  select: Select
  features: Collection<Feature>
}>()

// reactive data
let select2 = ref<Select>(
  new Select({
    multi: false,
    layers: (layer) => {
      return layer.get(LAYER_ID) === SECOND_VECTOR_LAYER
    },
  })
)

// data
let featureLayer = findLayerById(
  props.map,
  VECTOR_LAYER
) as VectorLayer<VectorSource>

// computed
const selectedFeature = computed(() => {
  return props.features.getArray()[0] ?? null
})

const getFeatureName = computed(() => {
  return selectedFeature.value?.getProperties().name
})

const getFeatureProperty = computed(() => {
  return selectedFeature.value?.getProperties().property1
})

// hooks
onMounted(() => {
  props.map.addInteraction(props.select as Select)
  props.map.addInteraction(select2.value as Select)
})

// functions
const toggleFeature = () => {
  if (props.features.getLength() > 0) {
    props.features.clear()
    return
  }
  const feature = getFeatureById(featureLayer, SELECT_FEATURE_ID)
  if (!feature) return
  props.features.push(feature)
}
</script>
<style scoped>
.feature-info {
  text-align: left;
}
</style>
