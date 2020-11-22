'use strict'

import * as THREE from '../node_modules/three/build/three.module.js'

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


  const half_lens_geometry = new THREE.SphereBufferGeometry(2, 32, 16,
                                                            0, Math.PI * 2,
                                                            0, 0.5)
  half_lens_geometry.translate(0, -1.5, 0)

  const other_half_geometry = half_lens_geometry.clone()
  other_half_geometry.rotateX(Math.PI)
  other_half_geometry.translate(0, 0.51, 0)

  const lens_geometry = BufferGeometryUtils.mergeBufferGeometries([
    half_lens_geometry, other_half_geometry])

  const material = new THREE.MeshStandardMaterial({color: 0xaaccff})
  material.side = THREE.DoubleSide
  const lens = new THREE.Mesh(lens_geometry, material)
  lens.castShadow = true

  scene.add(lens)

  camera.position.z = 5
  camera.lookAt(0, 0, 0)

  const helper = new THREE.CameraHelper(top_light.shadow.camera)
  scene.add(helper)

  let animate = function() {
      lens.rotation.x += 0.01
      lens.rotation.y += 0.01

      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

  return {
    animate: animate
  }
})()

export default Scene
