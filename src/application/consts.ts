export const RESOLUTIONS_GRID_METERS = [
  //  res             level  scale @96.0 DPI
  264.5838625010584, // 0:  1000000.00000000
  132.2919312505292, // 1:  500000.00000000
  66.1459656252646, // 2:  250000.00000000
  26.458386250105836, // 3:  100000.00000000
  13.229193125052918, // 4:  50000.00000000
  5.291677250021167, // 5:  20000.00000000
  3.9687579375158752, // 6:  15000.00000000
  2.6458386250105836, // 7:  10000.00000000
  1.3229193125052918, // 8:  5000.00000000
  0.9260435187537043, // 9:  3500.00000000
  0.5291677250021167, // 10: 2000.00000000
]

export const METER_PER_DEGREE = 111319.49079327358 // from OpenLayers epsg:4326 getProjection().getMetersPerUnit()

export const RESOLUTION_GRID_DEGREES = RESOLUTIONS_GRID_METERS.map(
  (res) => res / METER_PER_DEGREE
)

export const DEFAULT_DPI = 96
export const LAMBERT_PROJECTION = "EPSG:2154"
export const DEFAULT_PROJECTION = "EPSG:3857"
export const WGS84_PROJECTION = "EPSG:4326"
export const PROJECTIONS = [
  LAMBERT_PROJECTION,
  DEFAULT_PROJECTION,
  WGS84_PROJECTION,
] as const
export type ProjectionType = (typeof PROJECTIONS)[number]
export const VIEW_CENTER = [-1.553621, 47.218371]

// definitions
export const LAMBERT_PROJECTION_DEFINITION =
  "+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"

// layers config
export const LAYER_ID = "layer-id"
export const VECTOR_LAYER = "vector-circle-features"
export const SECOND_VECTOR_LAYER = "second-vector-circle-features"
export const SELECT_FEATURE_ID = "feat-1"
export const SELECT_INNER_FEATURE_ID = "feat-2-inner"
