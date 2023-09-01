import { View } from "ol"
import { fromLonLat } from "ol/proj"
import {
  DEFAULT_PROJECTION,
  LAMBERT_PROJECTION,
  LAYER_ID,
  RESOLUTIONS_GRID_METERS,
  RESOLUTION_GRID_DEGREES,
  SECOND_VECTOR_LAYER,
  VECTOR_LAYER,
  VIEW_CENTER,
  WGS84_PROJECTION,
} from "./consts"
import { Coordinate } from "ol/coordinate"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import GeoJSON from "ol/format/GeoJSON.js"
import { vectorDataLayer1 } from "../mocks/vectorDataLayer1"
import { vectorDataLayer2 } from "../mocks/vectorDataLayer2"
import Style from "ol/style/Style"
import Fill from "ol/style/Fill"
import Stroke from "ol/style/Stroke"
import { Map } from "ol"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"

interface ProjectionConfig {
  [key: string]: {
    center: Coordinate
    resolutions: number[]
  }
}

const getProjectionConfig = (): ProjectionConfig => {
  return {
    [DEFAULT_PROJECTION]: {
      center: fromLonLat(VIEW_CENTER),
      resolutions: RESOLUTIONS_GRID_METERS,
    },
    [WGS84_PROJECTION]: {
      center: VIEW_CENTER,
      resolutions: RESOLUTION_GRID_DEGREES,
    },
    [LAMBERT_PROJECTION]: {
      center: fromLonLat(VIEW_CENTER, LAMBERT_PROJECTION),
      resolutions: RESOLUTIONS_GRID_METERS,
    },
  }
}

export const getResolutions = (projection: string) => {
  const config = getProjectionConfig()
  const settings = config[projection] || config[DEFAULT_PROJECTION]
  return settings.resolutions
}

// init View
export const initView = (projection: string = DEFAULT_PROJECTION) => {
  const config = getProjectionConfig()
  const settings = config[projection] || config[DEFAULT_PROJECTION]

  return new View({
    center: settings.center,
    zoom: 5,
    resolutions: settings.resolutions,
    constrainResolution: true,
    projection,
  })
}

export const getMapLayers = (projection = DEFAULT_PROJECTION) => {
  return [
    new TileLayer({
      source: new OSM(),
    }),
    initVectorLayer(projection),
    initSecondVectorLayer(projection),
  ]
}

// init Vector Layer
export const initVectorLayer = (
  projection = DEFAULT_PROJECTION
): VectorLayer<VectorSource> => {
  const features = new GeoJSON({ featureProjection: projection }).readFeatures(
    vectorDataLayer1
  )
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features,
    }),
    style: new Style({
      stroke: new Stroke({
        color: "rgba(255, 255, 0, 1)",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(255, 255, 0, 0.3)",
      }),
    }),
  })
  vectorLayer.set(LAYER_ID, VECTOR_LAYER)
  return vectorLayer
}

export const initSecondVectorLayer = (
  projection = DEFAULT_PROJECTION
): VectorLayer<VectorSource> => {
  const features = new GeoJSON({ featureProjection: projection }).readFeatures(
    vectorDataLayer2
  )
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features,
    }),
    style: new Style({
      stroke: new Stroke({
        color: "rgba(133, 239, 133, 1)",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(133, 239, 133, 0.3)",
      }),
    }),
  })
  vectorLayer.set(LAYER_ID, SECOND_VECTOR_LAYER)
  return vectorLayer
}

// reset map after projection change
export const resetMapToNewProjection = (map: Map, newProjection: string) => {
  const updatedView = initView(newProjection)

  map.setLayers(getMapLayers(newProjection))
  map.setView(updatedView)
}
