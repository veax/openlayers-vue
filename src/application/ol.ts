import { Map } from "ol"
import { LAYER_ID } from "./consts"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"

export const findLayerById = (map: Map, layerId: string) => {
  const vectorLayer = map
    .getLayers()
    .getArray()
    .find((l) => l.get(LAYER_ID) === layerId)
  return vectorLayer ?? null
}

export const getVectorLayerFeatures = (
  vectorLayer: VectorLayer<VectorSource>
) => {
  return vectorLayer.getSource()?.getFeatures() ?? []
}

export const getFeatureById = (
  vectorLayer: VectorLayer<VectorSource>,
  featureId: string
) => {
  if (!vectorLayer || !featureId) return
  const vectorLayerFeatures = getVectorLayerFeatures(vectorLayer)
  const feature = vectorLayerFeatures.find(
    (feature) =>
      feature.getId() === featureId || feature.getProperties().id === featureId
  )
  return feature
}
