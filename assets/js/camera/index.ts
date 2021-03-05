import * as THREE from 'three'
import { DisposeThreeObj } from '@/assets/js/three/Dispose'
import { gsap } from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export class Camera {
  private scene: THREE.Scene
  private renderer: THREE.WebGLRenderer
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  private canvas: HTMLCanvasElement | null
  private frameId: number
  private cursor: { x: number; y: number }
  private sizes: { width: number; height: number }
  private mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>
  private clock: THREE.Clock

  constructor() {
    // Canvas
    this.canvas = document.querySelector<HTMLCanvasElement>('canvas.webgl')
    if (this.canvas === null) throw new Error('canvas null')

    // Sizes
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    // Cursor
    this.cursor = {
      x: 0,
      y: 0,
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
    this.mesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mesh)

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100,
    )
    // const aspectRatio = sizes.width / sizes.height
    // const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
    this.camera.position.z = 5
    this.scene.add(this.camera)

    // Controls
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping = true
    this.controls.target.y = 2

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.render(this.scene, this.camera)

    this.onMousemove = this.onMousemove.bind(this)
    window.addEventListener('mousemove', this.onMousemove)

    /**
     * Animate
     */
    gsap.to(this.mesh.position, {
      duration: 1,
      delay: 1,
      x: 3,
      yoyo: true,
      repeat: -1,
      repeatDelay: 1,
      ease: 'power2.inOut',
    })

    this.clock = new THREE.Clock()

    this.frameId = 0

    this.tick = this.tick.bind(this)
    this.tick()
  }

  onMousemove(event: MouseEvent) {
    // -0.5 ~ 0.5
    this.cursor.x = event.clientX / this.sizes.width - 0.5
    this.cursor.y = -(event.clientY / this.sizes.height - 0.5)
  }

  tick() {
    // Update controls
    this.controls.update()

    const elapsedTime = this.clock.getElapsedTime()
    this.mesh.rotation.y = elapsedTime

    // camera circle move
    // this.camera.position.x = Math.sin(this.cursor.x * Math.PI * 2) * 2
    // this.camera.position.z = Math.cos(this.cursor.x * Math.PI * 2) * 2
    // this.camera.position.y = this.cursor.y * 3
    // this.camera.lookAt(this.mesh.position)

    // this.camera.position.x = this.cursor.x
    // this.camera.position.y = this.cursor.y

    // Render
    this.renderer.render(this.scene, this.camera)

    // Call tick again on the next frame
    this.frameId = window.requestAnimationFrame(this.tick)
  }

  finish() {
    if (this.canvas === null) throw new Error('canvas null')

    window.cancelAnimationFrame(this.frameId)
    window.removeEventListener('mousemove', this.onMousemove)

    this.scene.children.forEach((obj) => {
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
