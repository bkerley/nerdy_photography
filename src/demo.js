'use strict'

import { Scene,
         HemisphereLight, DirectionalLight,
         PlaneBufferGeometry,
         MeshStandardMaterial,
         Mesh,
         PerspectiveCamera,
         WebGLRenderer,
         DoubleSide } from '../node_modules/three/build/three.module.js'

// import{ Scene } from '../node_modules/three/src/scenes/Scene.js'
// import { HemisphereLight } from '../node_modules/three/src/lights/HemisphereLight.js'
// import { DirectionalLight } from '../node_modules/three/src/lights/DirectionalLight.js'
// import { PlaneBufferGeometry } from '../node_modules/three/src/geometries/PlaneBufferGeometry.js'
// import { MeshStandardMaterial } from '../node_modules/three/src/materials/MeshStandardMaterial.js'
// import { Mesh } from '../node_modules/three/src/objects/Mesh.js'
// import { PerspectiveCamera } from '../node_modules/three/src/cameras/PerspectiveCamera.js'
// import { WebGLRenderer } from '../node_modules/three/src/renderers/WebGLRenderer.js'
// import { DoubleSide } from '../node_modules/three/src/constants.js'

import Lens from './lens.js'

let Demo = (function() {
  const scene = new Scene()

  const ambient_light = new HemisphereLight(0xffffbb, 0x080820, 0.5)
  scene.add(ambient_light)

  const top_light = new DirectionalLight(0xffffff, 0.5)
  top_light.castShadow = true
  top_light.position.set(0, 20, 0)
  scene.add(top_light)

  scene.add(top_light.target)

  const plane_mesh = new PlaneBufferGeometry(10000, 10000)
  const plane_mat = new MeshStandardMaterial({color: 0x608040,
                                                    side: DoubleSide})
  const plane = new Mesh(plane_mesh, plane_mat)
  plane.rotation.x += Math.PI / 2
  plane.position.y -= 3
  plane.receiveShadow = true
  scene.add(plane)

  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1, 1000)

  const renderer = new WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  document.body.appendChild(renderer.domElement)

  const lens = new Lens(scene, renderer)
  lens.add()
  lens.update_environment_map()

  camera.position.z = 5
  camera.lookAt(0, 0, 0)

  let prev

  let animate = function(timestamp) {
    if (prev === undefined) {
      prev = timestamp
    }
    const elapsed = timestamp - prev //ms

    lens.update(timestamp)

    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  let schedule = function() {
    requestAnimationFrame(animate)
  }

  return {
    animate: animate,
    schedule: schedule
  }
})()

export default Demo
