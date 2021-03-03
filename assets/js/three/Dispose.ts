const disposeMaterial = (material) => {
  if (material.map) {
    material.map.dispose()
    material.map = null
  }
  material.dispose()
  material = null
}

export const DisposeThreeObj = (obj) => {
  if (obj.geometry) {
    obj.geometry.dispose()
    obj.geometry = null
  }
  if (!!obj.material && Array.isArray(obj.material)) {
    obj.material.forEach((material) => disposeMaterial(material))
  } else if (obj.material) {
    disposeMaterial(obj.material)
  }
}
