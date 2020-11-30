'use strict'

import { Mesh,
         SphereBufferGeometry,
         MeshStandardMaterial,
         WebGLCubeRenderTarget,
         RGBFormat, LinearMipmapLinearFilter,
         CubeCamera } from '../node_modules/three/build/three.module.js'

export default class Element {
  constructor(scene, renderer) {
    this.scene = scene
    this.renderer = renderer

    this.prev = 0
    this.last_env_update = 0
  }

  add() {
    this.scene.add(this.mesh())
  }

  mesh() {
    if (this._mesh) return this._mesh

    const mesh = new Mesh(this.geometry(), this.material())
    mesh.castShadow = true

    return this._mesh = mesh
  }

  environment_map_target() {
    if (this._environment_map_target) return this._environment_map_target

    return this._environment_map_target = new WebGLCubeRenderTarget(128, {
      format: RGBFormat,
      generateMipmaps: true,
      minFilter: LinearMipmapLinearFilter
    })
  }

  environment_map_camera() {
    if (this._environment_map_camera) return this._environment_map_camera

    const cam = new CubeCamera(1, 10000, this.environment_map_target())
    this.scene.add(cam)

    return this._environment_map_camera = cam
  }

  environment_map() {
    if (this._environment_map) return this._environment_map

    return this.environment_map = this.environment_map_target().texture
  }

  update(timestamp) {
    this.maybe_update_environment_map(timestamp)
  }

  update_environment_map() {
    const cam = this.environment_map_camera()
    const mesh = this.mesh()
    cam.position.copy(this.mesh().position)
    mesh.visible = false
    cam.update(this.renderer, this.scene)
    mesh.visible = true
  }

  maybe_update_environment_map(timestamp) {
    if ((0 == this.last_env_update) ||
        (this.last_env_update + 100 < timestamp)) {
      this.update_environment_map()
      this.last_env_update = timestamp
      return
    }
  }
}
