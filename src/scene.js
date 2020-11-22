'use strict'

import * as THREE from '../node_modules/three/build/three.module.js'

import Lens from './lens.js'

let Scene = (function() {
  const scene = new THREE.Scene()

  const ambient_light = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5)
  scene.add(ambient_light)

  const top_light = new THREE.DirectionalLight(0xffffff, 0.5)
  top_light.castShadow = true
  top_light.position.set(0, 20, 0)
  scene.add(top_light)

  scene.add(top_light.target)

  const plane_mesh = new THREE.PlaneBufferGeometry(10000, 10000)
  const plane_mat = new THREE.MeshStandardMaterial({color: 0x608040,
                                                    side: THREE.DoubleSide})
  const plane = new THREE.Mesh(plane_mesh, plane_mat)
  plane.rotation.x += Math.PI / 2
  plane.position.y -= 3
  plane.receiveShadow = true
  scene.add(plane)

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1, 1000)

  const renderer = new THREE.WebGLRenderer()
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

export default Scene
