import * as THREE from 'three'
import { DisposeThreeObj } from '@/assets/js/three/Dispose'
import { gsap } from 'gsap'

export class FirstAnimations {
  private scene: THREE.Scene | undefined
  private renderer: THREE.WebGLRenderer | undefined
  private camera: THREE.PerspectiveCamera | undefined
  private canvas: HTMLCanvasElement | null
  private frameId: number

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
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const mesh = new THREE.Mesh(geometry, material)
    this.scene.add(mesh)

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    this.camera.position.z = 3
    this.scene.add(this.camera)

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    })
    this.renderer.setSize(sizes.width, sizes.height)
    this.renderer.render(this.scene, this.camera)

    /**
     * Animate
     */
    gsap.to(mesh.position, {
      duration: 1,
      delay: 1,
      x: 3,
      yoyo: true,
      repeat: -1,
      repeatDelay: 1,
      ease: 'power2.inOut',
    })

    this.frameId = 0

    this.tick = this.tick.bind(this)
    this.tick()
  }

  tick() {
    if (
      this.camera === undefined ||
      this.scene === undefined ||
      this.renderer === undefined
    )
      throw new Error('canvas null')

    // Render
    this.renderer.render(this.scene, this.camera)

    // Call tick again on the next frame
    this.frameId = window.requestAnimationFrame(this.tick)
  }

  finish() {
    if (
      this.canvas === null ||
      this.scene === undefined ||
      this.renderer === undefined
    )
      throw new Error('canvas null')

    window.cancelAnimationFrame(this.frameId)

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
