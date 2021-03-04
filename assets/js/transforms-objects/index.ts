import * as THREE from 'three'
import { DisposeThreeObj } from '@/assets/js/three/Dispose'

export class TransformsObjects {
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

    /**
     * Axes Helper
     */
    const axesHelper = new THREE.AxesHelper(5)
    this.scene.add(axesHelper)

    /**
     * Objects
     */
    const group = new THREE.Group()
    group.scale.y = 2
    group.rotation.y = 0.2
    this.scene.add(group)

    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xee0000 }),
    )
    cube1.position.x = -1.5
    group.add(cube1)

    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ee00 }),
    )
    cube2.position.x = 0
    group.add(cube2)

    const cube3 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x0000ee }),
    )
    cube3.position.x = 1.5
    group.add(cube3)

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.z = 5
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
