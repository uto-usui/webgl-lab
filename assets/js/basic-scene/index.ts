import * as THREE from 'three'
import { DisposeThreeObj } from '@/assets/js/three/Dispose'

export class BasicScene {
  private scene: THREE.Scene | undefined
  private renderer: THREE.WebGLRenderer | undefined
  private canvas: HTMLCanvasElement | null

  constructor() {
    // Canvas
    this.canvas = document.querySelector<HTMLCanvasElement>('canvas.webgl')
    if (this.canvas === null) throw new Error('canvas null')

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    // Scene
    this.scene = new THREE.Scene()

    // Object
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: '#ee0000',
    })
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
    this.scene.add(cubeMesh)

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.z = 3
    this.scene.add(camera)

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    })
    this.renderer.setSize(sizes.width, sizes.height)
    this.renderer.render(this.scene, camera)
  }

  finish() {
    if (
      this.canvas === null ||
      this.scene === undefined ||
      this.renderer === undefined
    )
      throw new Error('canvas null')

    this.scene.children.forEach((obj) => {
      if (this.scene === undefined) return

      obj.traverse((obj3D) => DisposeThreeObj(obj3D))
      this.scene.remove(obj)
    })

    this.renderer.dispose()
    this.renderer.forceContextLoss()
    this.canvas.width = 1 // resize canvas
    this.canvas.height = 1 // resize canvas

    console.log('🔚 end basic scene')
  }
}
