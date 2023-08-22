import { View } from "ol"
import { fromLonLat } from "ol/proj"
import {
  DEFAULT_PROJECTION,
  LAMBERT_PROJECTION,
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
    zoom: 2,
    resolutions: settings.resolutions,
    constrainResolution: true,
    projection,
  })
}
