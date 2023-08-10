import { onMounted, ref } from "vue"
import { MousePosition } from "ol/control"
import { Coordinate, format } from "ol/coordinate"
import { Units } from "ol/proj/Units"

export function useMousePosition() {
  let mousePosition = ref<MousePosition>(new MousePosition({}))

  const metricCoordsTemplate = "Cursor x: {x} y : {y}" // cartesian
  const geographicCoordsTemplate = "Latitude {y} Longitude : {x}" // lat lon coordinates

  const mouseTemplate = (projectionUnits: Units | undefined) => {
    return projectionUnits === "m"
      ? metricCoordsTemplate
      : geographicCoordsTemplate
  }

  onMounted(() => {
    mousePosition.value.setCoordinateFormat((coords) => {
      const mapProjection = mousePosition?.value
        ?.getMap()
        ?.getView()
        .getProjection()
      const template = mouseTemplate(mapProjection?.getUnits())
      return format(coords as Coordinate, template, 4)
    })
  })

  const setTargetRef = (targetRef: HTMLElement | undefined) => {
    if (targetRef) {
      mousePosition.value.setTarget(targetRef)
    }
  }

  // expose managed state as return value
  const mouse = mousePosition.value
  return { mouse, setTargetRef }
}
