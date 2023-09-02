<template>
  <div id="vector-editor">
    <VectorSelect
      :map="props.map"
      :select="(select as Select)"
      :features="(features as Collection<Feature>)"
    />
    <VectorMoveTool
      v-if="selectedFeature"
      :map="props.map"
      :features="(features as Collection<Feature>)"
    />
  </div>
</template>

<script setup lang="ts">
import VectorSelect from "./VectorSelect.vue"
import VectorMoveTool from "./VectorMoveTool.vue"
import { Collection, Feature, Map } from "ol"
import { computed, ref } from "vue"
import { Select } from "ol/interaction"
import {
  LAYER_ID,
  VECTOR_LAYER,
  SECOND_VECTOR_LAYER,
} from "../../application/consts"

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
    condition: (e) => {
      if (e.type === "click") {
        const pixel = e.pixel
        let shouldHandleClick = true
        props.map.forEachFeatureAtPixel(pixel, (feature, layer) => {
          if (layer.get(LAYER_ID) === SECOND_VECTOR_LAYER) {
            shouldHandleClick = false
            return
          }
        })
        return shouldHandleClick
      }
      return false
    },
  })
)

// computed
const selectedFeature = computed(() => {
  return features.value.getArray()[0] ?? null
})
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
</style>
