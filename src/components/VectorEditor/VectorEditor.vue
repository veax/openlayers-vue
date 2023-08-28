<template>
  <div id="vector-editor">
    <div class="button icon" @click="toggleFeature">
      <SparklesIcon />
    </div>
    <!-- feature info  -->
    <div v-if="selectedFeature" class="feature-info">
      <p class="text">feature name : {{ getFeatureName }}</p>
      <p class="text">property1 : {{ getFeatureProperty }}</p>
    </div>
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
} from "../../application/consts"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"

// props
const props = defineProps<{
  map: Map
}>()

// reactive data
let features = ref<Collection<Feature>>(new Collection(undefined))
let select = ref<Select>(
  new Select({
    multi: false,
    layers: (layer) => {
      return layer.get(LAYER_ID) === VECTOR_LAYER
    },
    features: features.value as Collection<Feature>,
  })
)

// data
let featureLayer = findLayerById(
  props.map,
  VECTOR_LAYER
) as VectorLayer<VectorSource> | null

// computed
const selectedFeature = computed(() => {
  return features.value.getArray()[0] ?? null
})

const getFeatureName = computed(() => {
  return selectedFeature.value?.getProperties().name
})

const getFeatureProperty = computed(() => {
  return selectedFeature.value?.getProperties().property1
})

// hooks
onMounted(() => {
  props.map.addInteraction(select.value as Select)
})

// functions
const toggleFeature = () => {
  if (features.value.getLength() > 0) {
    features.value.clear()
    return
  }
  const feature = getFeatureById(featureLayer, SELECT_FEATURE_ID)
  if (!feature) return
  features.value.push(feature)
}
</script>

<style scoped>
#vector-editor {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px 50px;
  background-color: rgb(255, 255, 255, 0.6);
  border-radius: 5px;
}

.icon {
  width: 20px;
  height: 20px;
}

.feature-info {
  text-align: left;
}

.text {
  font-size: 0.9rem;
}
</style>
