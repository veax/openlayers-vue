<template>
  <div
    class="button icon"
    :class="{ selected: isTranslateActive }"
    @click="toggleMoveFeature"
  >
    <HandRaisedIcon />
  </div>
</template>

<script setup lang="ts">
import { HandRaisedIcon } from "@heroicons/vue/20/solid"
import { Collection, Feature, Map } from "ol"
import { Translate } from "ol/interaction"
import { computed, onMounted, ref } from "vue"

// props
const props = defineProps<{
  map: Map
  features: Collection<Feature>
}>()

// reactive data
let translate = ref<Translate>(
  new Translate({
    features: props.features,
  })
)
// hooks
onMounted(() => {
  translate.value.setActive(false)
  props.map.addInteraction(translate.value as Translate)
})

// functions
const toggleMoveFeature = () => {
  const isTranslateActive = translate.value.getActive()
  translate.value.setActive(!isTranslateActive)
}

// computed
const isTranslateActive = computed(() => {
  return translate.value.getActive()
})
</script>
