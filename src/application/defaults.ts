import { View } from "ol"
import { fromLonLat } from "ol/proj"
import {
  DEFAULT_PROJECTION,
  RESOLUTIONS_GRID_METERS,
  RESOLUTION_GRID_DEGREES,
  VIEW_CENTER,
  WGS84_PROJECTION,
} from "./consts"
import { Coordinate } from "ol/coordinate"

interface ProjectionConfig {
  [key: string]: {
    center: Coordinate
    resolutions: number[]
  }
}

const PROJECTION_CONFIG: ProjectionConfig = {
  [DEFAULT_PROJECTION]: {
    center: fromLonLat(VIEW_CENTER),
    resolutions: RESOLUTIONS_GRID_METERS,
  },
  [WGS84_PROJECTION]: {
    center: VIEW_CENTER,
    resolutions: RESOLUTION_GRID_DEGREES,
  },
}

export const getResolutions = (projection: string) => {
  const settings =
    PROJECTION_CONFIG[projection] || PROJECTION_CONFIG[DEFAULT_PROJECTION]
  console.log("settings.resolutions : ", settings.resolutions)
  return settings.resolutions
}

// init View
export const initView = (projection: string = DEFAULT_PROJECTION) => {
  const settings =
    PROJECTION_CONFIG[projection] || PROJECTION_CONFIG[DEFAULT_PROJECTION]

  return new View({
    center: settings.center,
    zoom: 2,
    resolutions: settings.resolutions,
    constrainResolution: true,
    projection,
  })
}
