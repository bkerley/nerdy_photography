'use strict'

import * as THREE from '../node_modules/three/build/three.module.js'
import { BufferGeometryUtils } from
  '../node_modules/three/examples/jsm/utils/BufferGeometryUtils.js'

export default class Lens {
  constructor(scene, renderer) {
    this.scene = scene
    this.renderer = renderer

    this.prev = 0
  }

  add() {
    this.scene.add(this.mesh())
  }

  mesh() {
    if (this._mesh) return this._mesh

    const mesh = new THREE.Mesh(this.geometry(), this.material())
    mesh.castShadow = true

    return this._mesh = mesh
  }

  geometry() {
    if (this._geometry) return this._geometry

    const top_half = new THREE.SphereBufferGeometry(2, 32, 16,
                                                    0, Math.PI * 2,
                                                    0, 0.5)
    top_half.translate(0, -1.5, 0)

    const bottom_half = top_half.clone()
    bottom_half.rotateX(Math.PI)
    bottom_half.translate(0, 0.52, 0)

    const geom = BufferGeometryUtils.
      mergeBufferGeometries([top_half, bottom_half])

    return this._geometry = geom
  }

  material() {
    if (this._material) return this._material

    const mat = new THREE.MeshStandardMaterial({
      color: 0xccccff,
      envMap: this.environment_map(),
      opacity: 0.95,
      roughness: 0.0,
      transparent: true
    })

    return this._material = mat
  }

  environment_map_target() {
    if (this._environment_map_target) return this._environment_map_target

    return this._environment_map_target = new THREE.WebGLCubeRenderTarget(128, {
      format: THREE.RGBFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter
    })
  }

  environment_map_camera() {
    if (this._environment_map_camera) return this._environment_map_camera

    const cam = new THREE.CubeCamera(1, 10000, this.environment_map_target())
    this.scene.add(cam)

    return this._environment_map_camera = cam
  }

  environment_map() {
    if (this._environment_map) return this._environment_map

    return this.environment_map = this.environment_map_target().texture
  }

  update(timestamp) {
    if (0 == this.prev) this.prev = timestamp

    let elapsed = timestamp - this.prev
    this.prev = timestamp

    this.mesh().rotation.x += 0.001 * elapsed
    this.mesh().rotation.z += 0.001 * elapsed
  }

  update_environment_map() {
    const cam = this.environment_map_camera()
    const mesh = this.mesh()
    cam.position.copy(this.mesh().position)
    mesh.visible = false
    cam.update(this.renderer, this.scene)
    mesh.visible = true
  }
}

const half_lens = new THREE.SphereBufferGeometry(15, 32, 16,
                                                 0, Math.PI * 2,
                                                 0, 0.5)
